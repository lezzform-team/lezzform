import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';
import {rem, splitUrlAndFilename} from '../../utils/helper';
import {colors} from '../../themes/colors';
import {spacing} from '../../themes/spacing';
import DocumentPicker from 'react-native-document-picker';
import axios, {AxiosError} from 'axios';
import lodashGet from 'lodash.get';
import {textSize} from '../../themes/textSize';

interface AttachmentProps {
  name?: string;
  label?: string;
  isRequired?: boolean;
  onChange?: (fileUrl: string) => unknown;
  onError?: (message: string, err: unknown) => unknown;
  acceptedFormats: string[];
  maxSize: number;
  url: string;
  headers?: {key: string; value: string}[];
  path: {body?: string; value: string};
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
}

const style = StyleSheet.create({
  Attachment: {
    padding: rem`1`,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: spacing.radius - 2,
    width: '100%',
  },
  ShowValue: {
    gap: rem`0.5`,
    alignItems: 'center',
  },
  ShowValueText: {
    fontSize: textSize.sm,
    color: colors.mutedForeground,
  },
});

const Attachment = ({
  acceptedFormats,
  maxSize,
  onChange,
  onError,
  url,
  headers,
  path,
  value,
  placeholder,
  disabled,
}: AttachmentProps) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onErrorRef = useRef<AttachmentProps['onError']>();
  const onChangeRef = useRef<AttachmentProps['onChange']>();
  const headersRef = useRef<AttachmentProps['headers']>([]);

  //   const {getInputProps, getRootProps, acceptedFiles, fileRejections} =
  //     useDropzone({
  //       accept,
  //       maxFiles: 1,
  //       maxSize: maxSize * 1024,
  //       disabled,
  //     });

  const handleUpload = useCallback(async () => {
    try {
      setIsUploading(true);
      const document = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.images,
      });

      if ((document.size as number) / 1024 > maxSize) {
        throw new Error('File size is too big');
      }

      if (!acceptedFormats.includes(document.type as string)) {
        throw new Error('Invalid format');
      }

      if (!document) {
        throw new Error('No file selected');
      }

      // const file = new File([document.uri], document.name as string, {
      //   type: document.type as string,
      //   lastModified: Date.now(),
      // });

      // let body: File | Record<string, File> = file;
      // if (path.body) {
      //   body = {
      //     [path.body]: file,
      //   };
      // }

      const formData = new FormData();

      if (path.body) {
        formData.append(path.body, {
          uri: document.uri,
          type: document.type,
          name: document.name,
        });
      } else {
        formData.append('', {
          uri: document.uri,
          type: document.type,
          name: document.name,
        });
      }

      const customHeaders = headersRef.current?.reduce((acc, curr) => {
        return {...acc, [curr.key]: curr.value};
      }, {});

      const {data} = await axios.post(url, formData, {
        headers: {
          ...customHeaders,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!lodashGet(data, path.value)) {
        throw new Error('Path unavailable');
      }
      onChangeRef.current &&
        onChangeRef.current(lodashGet(data, path.value) as string);
    } catch (err) {
      if (typeof err === 'string') {
        return onErrorRef.current && onErrorRef.current(err, err);
      }
      const error = err as AxiosError;
      onErrorRef.current && onErrorRef.current(error.message as string, err);
    } finally {
      setIsUploading(false);
    }
  }, [acceptedFormats, maxSize, path.body, path.value, url]);

  const isShowEmpty = !value && !isUploading;
  const isShowValue = value && !isUploading;

  const customStyle: PressableProps['style'] = {
    ...style.Attachment,
    backgroundColor: disabled ? colors.border : undefined,
  };

  useEffect(() => {
    if (!onError) {
      return;
    }

    onErrorRef.current = onError;
  }, [onError, onErrorRef]);

  useEffect(() => {
    if (!onChange) {
      return;
    }

    onChangeRef.current = onChange;
  }, [onChange, onChangeRef]);

  useEffect(() => {
    if (!headers) {
      return;
    }

    headersRef.current = headers;
  }, [headers, headersRef]);

  return (
    <Pressable style={customStyle} onPress={handleUpload}>
      {isShowEmpty && (
        <Text style={{fontSize: textSize.sm, color: colors.mutedForeground}}>
          {placeholder ?? 'Upload your file here'}
        </Text>
      )}
      {isUploading && (
        <Text style={{fontSize: textSize.sm, color: colors.mutedForeground}}>
          Uploading...
        </Text>
      )}
      {isShowValue && (
        <View style={style.ShowValue}>
          <Text style={style.ShowValueText}>
            {splitUrlAndFilename(value).filename}
          </Text>
        </View>
      )}
    </Pressable>
  );
};
Attachment.displayName = 'Attachment';

export {Attachment};
