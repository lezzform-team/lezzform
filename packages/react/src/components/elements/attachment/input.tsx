import { AttachmentProps } from ".";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { cn, splitUrlAndFilename, uploadFile } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface AttachmentInputProps extends AttachmentProps {}

export function AttachmentInput({
  acceptedFormats,
  maxSize,
  path,
  url,
  disabled,
  headers,
  onChange,
  onError,
  placeholder,
  readonly,
  value,
  styles,
  classNames,
}: AttachmentInputProps): React.JSX.Element {
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
        "border border-solid border-lfui-input rounded-md text-center hover:bg-lfui-muted cursor-pointer",
        (readonly || disabled) && "cursor-not-allowed",
        disabled && "bg-lfui-border text-black",
        classNames?.root,
      )}
      style={styles?.root}
    >
      <input {...getInputProps()} />

      {isShowEmpty && (
        <div
          className={cn(
            "w-full h-10 flex justify-between gap-2 items-center px-3",
            classNames?.beforeUpload?.container,
          )}
          style={styles?.beforeUpload?.container}
        >
          <div className="flex items-center gap-2">
            <Button
              className="h-6 rounded px-3 bg-lfui-muted"
              variant="outline"
            >
              Browse...
            </Button>

            <p
              className={cn(
                "text-sm text-lfui-foreground break-words max-w-full",
                classNames?.beforeUpload?.titleText,
              )}
              style={styles?.beforeUpload?.titleText}
            >
              {!placeholder ? "Upload your file here" : placeholder} -{" "}
              <span
                className={cn(
                  "text-xs text-lfui-muted-foreground",
                  classNames?.beforeUpload?.subText,
                )}
                style={styles?.beforeUpload?.subText}
              >
                {sizeInMB}MB max
              </span>
            </p>
          </div>
        </div>
      )}

      {isUploading && (
        <div
          className={cn(
            "w-full h-10 flex justify-between gap-2 items-center px-3",
            classNames?.uploading?.container,
          )}
          style={styles?.uploading?.container}
        >
          <div className="flex items-center gap-2">
            <p
              className={cn(
                "text-sm text-lfui-foreground break-words max-w-full",
                classNames?.uploading?.titleText,
              )}
              style={styles?.uploading?.titleText}
            >
              Uploading...
            </p>
          </div>
        </div>
      )}

      {isShowValue && (
        <div
          className={cn(
            "w-full h-10 flex justify-between gap-2 items-center px-3",
            classNames?.afterUpload?.container,
          )}
          style={styles?.afterUpload?.container}
        >
          <div className="flex items-center gap-2">
            <Button
              className="h-6 rounded px-3 bg-lfui-muted"
              variant="outline"
            >
              Browse...
            </Button>

            <p
              className={cn(
                "text-sm text-lfui-foreground break-words max-w-full",
                classNames?.afterUpload?.valueText,
              )}
              style={styles?.afterUpload?.valueText}
            >
              {splitUrlAndFilename(value).filename}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
