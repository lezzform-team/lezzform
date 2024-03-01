import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { cn, splitUrlAndFilename, uploadFile } from "@/lib/utils";
import { AttachmentInput } from "./input";
import { ArrowUpIcon, ExternalLinkIcon, FileIcon } from "lucide-react";

export interface AttachmentPropsStyles {
  root: React.CSSProperties;
  beforeUpload: Partial<{
    container: React.CSSProperties;
    titleText: React.CSSProperties;
    subText: React.CSSProperties;
  }>;
  uploading: AttachmentPropsStyles["beforeUpload"];
  afterUpload: Partial<{
    container: React.CSSProperties;
    valueText: React.CSSProperties;
  }>;
}

export interface AttachmentPropsClassNames {
  root: string;
  beforeUpload: Partial<{
    container: string;
    titleText: string;
    subText: string;
  }>;
  uploading: AttachmentPropsStyles["beforeUpload"];
  afterUpload: Partial<{
    container: string;
    valueText: string;
  }>;
}

export interface AttachmentProps {
  name?: string;
  label?: string;
  isRequired?: boolean;
  onChange?: (fileUrl: string) => unknown;
  onError?: (message: string) => unknown;
  acceptedFormats: string[];
  maxSize: number;
  url: string;
  headers?: { key: string; value: string }[];
  path: { body?: string; value: string };
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  styles?: Partial<AttachmentPropsStyles>;
  classNames?: Partial<AttachmentPropsClassNames>;
}

export function Attachment({
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
  readonly,
  classNames,
  styles,
}: AttachmentProps): React.JSX.Element {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onErrorRef = useRef<AttachmentProps["onError"]>();
  const onChangeRef = useRef<AttachmentProps["onChange"]>();
  const headersRef = useRef<AttachmentProps["headers"]>([]);

  const accept = useMemo(
    () =>
      acceptedFormats.reduce((acc, curr) => {
        return { ...acc, [curr]: [] };
      }, {}),
    [acceptedFormats],
  );

  const { getInputProps, getRootProps, acceptedFiles, fileRejections } =
    useDropzone({
      accept,
      maxFiles: 1,
      maxSize: maxSize * 1024,
      disabled,
    });

  const sizeInMB = Math.round(maxSize / 1024);

  const handleUpload = useCallback(
    async (files: File[]) => {
      if (!files.length) return;

      setIsUploading(true);

      try {
        const { data, error } = await uploadFile({
          headers: headersRef.current ?? [],
          path: { value: path.value, body: path.body },
          url,
        })(files);

        if (error) return onErrorRef.current && onErrorRef.current(error);

        return data && onChangeRef.current && onChangeRef.current(data);
      } catch (err) {
        onErrorRef.current &&
          onErrorRef.current((err as Error).message as string);
      } finally {
        setIsUploading(false);
      }
    },
    [path?.body, path?.value, url],
  );

  const handleError = useCallback((files: FileRejection[]) => {
    if (!files.length) return;
    const file = files[0];

    if (!onErrorRef.current) return;
    if (!file.errors.length) return;

    onErrorRef.current(file.errors[0].message);
  }, []);

  const isShowEmpty = !value && !isUploading;
  const isShowValue = value && !isUploading;

  useEffect(() => {
    handleUpload(acceptedFiles);
  }, [acceptedFiles, handleUpload]);

  useEffect(() => {
    handleError(fileRejections);
  }, [fileRejections, handleError]);

  useEffect(() => {
    if (!onError) return;

    onErrorRef.current = onError;
  }, [onError, onErrorRef]);

  useEffect(() => {
    if (!onChange) return;

    onChangeRef.current = onChange;
  }, [onChange, onChangeRef]);

  useEffect(() => {
    if (!headers) return;

    headersRef.current = headers;
  }, [headers, headersRef]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "lf-border lf-border-dashed lf-border-border lf-rounded-md lf-text-center hover:lf-bg-muted lf-cursor-pointer",
        (readonly || disabled) && "lf-cursor-not-allowed",
        disabled && "lf-bg-border text-black",
        classNames?.root,
      )}
      style={styles?.root}
    >
      <input {...getInputProps()} />

      {isShowEmpty && (
        <div
          className={cn(
            "lf-h-full lf-w-full lf-bg-muted/50 lf-flex lf-flex-col lf-justify-center lf-items-center lf-gap-1 lf-p-4",
            classNames?.beforeUpload?.container,
          )}
          style={styles?.beforeUpload?.container}
        >
          <div className="h-10 lf-w-10 lf-bg-background lf-rounded-full lf-shadow-sm lf-flex lf-items-center lf-justify-center">
            <FileIcon className="lf-h-5 lf-w-5" />
          </div>
          <p
            className={cn(
              "lf-text-foreground lf-font-medium",
              classNames?.beforeUpload?.titleText,
            )}
            style={styles?.beforeUpload?.titleText}
          >
            {!placeholder ? "Upload your file here" : placeholder}
          </p>
          <small
            className={cn(
              "lf-text-sm lf-text-muted-foreground",
              classNames?.beforeUpload?.subText,
            )}
            style={styles?.beforeUpload?.subText}
          >
            {sizeInMB}MB max file size
          </small>
        </div>
      )}

      {isUploading && (
        <div
          className={cn(
            "lf-h-full lf-w-full lf-bg-muted/50 lf-flex lf-flex-col lf-justify-center lf-items-center lf-gap-1 lf-p-4",
            classNames?.uploading?.container,
          )}
          style={styles?.uploading?.container}
        >
          <div className="lf-h-10 lf-w-10 lf-bg-background lf-rounded-full lf-shadow-sm lf-flex lf-items-center lf-justify-center lf-animate-bounce">
            <ArrowUpIcon className="lf-h-5 lf-w-5" />
          </div>
          <p
            className={cn(
              "lf-text-foreground lf-font-medium",
              classNames?.uploading?.titleText,
            )}
            style={styles?.uploading?.titleText}
          >
            Uploading...
          </p>
          <small
            className={cn(
              "lf-text-sm lf-text-muted-foreground",
              classNames?.uploading?.subText,
            )}
            style={styles?.uploading?.subText}
          >
            Your file is being uploaded
          </small>
        </div>
      )}

      {isShowValue && (
        <div
          className={cn(
            "w-full h-10 flex justify-between gap-2 items-center px-4",
            classNames?.afterUpload?.container,
          )}
          style={styles?.afterUpload?.container}
        >
          <div className="flex items-center gap-2">
            <FileIcon className="h-4 w-4" />

            <p
              className={cn(
                "text-sm text-foreground break-words max-w-full",
                classNames?.afterUpload?.valueText,
              )}
              style={styles?.afterUpload?.valueText}
            >
              {splitUrlAndFilename(value).filename}
            </p>
          </div>
          <button
            className="p-2 w-fit -mr-2"
            onClick={(e) => {
              e.stopPropagation();
              window.open(value);
            }}
            type="button"
          >
            <ExternalLinkIcon className="text-muted-foreground h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

Attachment.Input = AttachmentInput;
