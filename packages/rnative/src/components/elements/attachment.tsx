import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {hexToRGBA, rem, splitUrlAndFilename} from '../../utils/helper';
import {colors} from '../../themes/colors';
import {spacing} from '../../themes/spacing';
import DocumentPicker from 'react-native-document-picker';
import axios, {AxiosError} from 'axios';
import lodashGet from 'lodash.get';
import {textSize} from '../../themes/textSize';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

  const handleUpload = useCallback(async () => {
    try {
      const document = await DocumentPicker.pickSingle({
        type: acceptedFormats,
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

      setIsUploading(true);

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
  const sizeInMB = Math.round(maxSize / 1024);

  const disabledWrapperStyle = useMemo<ViewStyle>(() => {
    let additionalStyle: ViewStyle = {};

    if (disabled) {
      additionalStyle = {...additionalStyle, backgroundColor: colors.muted};
    }

    return additionalStyle;
  }, [disabled]);

  const disabledTextStyle = useMemo<TextStyle>(() => {
    let additionalStyle: TextStyle = {};

    if (disabled) {
      additionalStyle = {...additionalStyle, color: colors.mutedForeground};
    }

    return additionalStyle;
  }, [disabled]);

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
    <Pressable
      disabled={disabled}
      style={{...style.Attachment, ...disabledWrapperStyle}}
      android_ripple={{color: colors.muted}}
      onPress={handleUpload}>
      {isShowEmpty && (
        <View style={{...style.Pending, ...disabledWrapperStyle}}>
          <View style={style.PendingIconWrapper}>
            <Icon
              color={colors.foreground}
              size={rem`1.25`}
              name="file-present"
            />
          </View>
          <Text style={{...style.Title, ...disabledTextStyle}}>
            {!placeholder ? 'Upload your file here' : placeholder}
          </Text>
          <Text style={{...style.SubTitle, ...disabledTextStyle}}>
            {sizeInMB}MB max file size
          </Text>
        </View>
      )}
      {isUploading && (
        <View style={{...style.Pending, ...disabledWrapperStyle}}>
          <View style={style.PendingIconWrapper}>
            <Icon
              color={colors.foreground}
              size={rem`1.25`}
              name="arrow-upward"
            />
          </View>
          <Text style={{...style.Title, ...disabledTextStyle}}>
            Uploading...
          </Text>
          <Text style={{...style.SubTitle, ...disabledTextStyle}}>
            Your file is being uploaded
          </Text>
        </View>
      )}
      {isShowValue && (
        <View style={{...style.Input, ...disabledWrapperStyle}}>
          <View style={style.InputLeftContent}>
            <Icon color={colors.foreground} size={rem`1`} name="file-present" />
            <Text
              numberOfLines={1}
              ellipsizeMode="middle"
              style={{...style.InputLabelText, ...disabledTextStyle}}>
              {splitUrlAndFilename(value).filename}
            </Text>
          </View>
          <Pressable
            style={style.InputLabelExternalWrapper}
            onPress={() => Linking.openURL(value)}>
            <Icon color={colors.foreground} size={rem`1.25`} name="link" />
          </Pressable>
        </View>
      )}
    </Pressable>
  );
};
Attachment.displayName = 'Attachment';

const style = StyleSheet.create({
  Attachment: {
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
  Text: {
    fontSize: textSize.sm,
    color: colors.mutedForeground,
  },
  Pending: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: rem`0.25`,
    padding: rem`1`,
    backgroundColor: hexToRGBA(colors.muted, 0.5),
  },
  PendingIconWrapper: {
    height: rem`2.5`,
    width: rem`2.5`,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  Title: {
    color: colors.foreground,
    fontWeight: '500',
    fontSize: textSize.base,
  },
  SubTitle: {
    color: colors.mutedForeground,
    fontSize: textSize.sm,
  },
  Input: {
    width: '100%',
    height: rem`2.5`,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: rem`0.5`,
    paddingHorizontal: rem`1`,
  },
  InputLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rem`0.5`,
  },
  InputLabelText: {
    fontSize: textSize.sm,
    color: colors.foreground,
    width: rem`10`,
  },
  InputLabelExternalWrapper: {
    padding: rem`0.5`,
    marginRight: rem`-0.5`,
    marginLeft: rem`1`,
  },
});

export {Attachment};
