import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import axios, { AxiosError } from "axios";
import lodashGet from "lodash.get";
import { cn, splitUrlAndFilename } from "@/lib/utils";

interface AttachmentProps {
  name?: string;
  label?: string;
  isRequired?: boolean;
  onChange?: (fileUrl: string) => unknown;
  onError?: (message: string) => unknown;
  acceptedFormats: string[];
  maxSize: number;
  url: string;
  headers?: Record<string, string>;
  path: { body?: string; value: string };
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
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
}: AttachmentProps): React.JSX.Element {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onErrorRef = useRef<AttachmentProps["onError"]>();
  const onChangeRef = useRef<AttachmentProps["onChange"]>();
  const headersRef = useRef<AttachmentProps["headers"]>({});

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

  const handleUpload = useCallback(
    async (files: File[]) => {
      if (!files.length) return;

      setIsUploading(true);

      try {
        const file = files[0];
        let body: File | Record<string, File> = file;
        if (path.body) {
          body = {
            [path.body]: file,
          };
        }

        const { data } = await axios.post(
          url,
          body as File | Record<string, File>,
          {
            headers: {
              ...headersRef.current,
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (!lodashGet(data, path.value)) throw new Error("Path unavailable");

        onChangeRef.current &&
          onChangeRef.current(lodashGet(data, path.value) as string);
      } catch (err) {
        const error = err as AxiosError;
        onErrorRef.current && onErrorRef.current(error.message as string);
      } finally {
        setIsUploading(false);
      }
    },
    [path.body, path.value, url],
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
        "p-4 border border-dashed border-lfui-border rounded-md text-center  hover:bg-lfui-muted cursor-pointer",
        (readonly || disabled) && "cursor-not-allowed",
        disabled && "bg-lfui-border text-black",
      )}
    >
      <input {...getInputProps()} />

      {isShowEmpty && (
        <p className="text-sm text-lfui-muted-foreground">
          {placeholder ?? "Upload your file here"}
        </p>
      )}

      {isUploading && (
        <p className="text-sm text-lfui-muted-foreground">Uploading...</p>
      )}

      {isShowValue && (
        <div className="flex flex-col gap-2 items-center">
          <p className="text-sm text-lfui-muted-foreground break-words max-w-full">
            {splitUrlAndFilename(value).filename}
          </p>
          <button
            className="text-blue-500 underline text-xs px-4 w-fit"
            onClick={(e) => {
              e.stopPropagation();
              window.open(value);
            }}
          >
            Open file
          </button>
        </div>
      )}
    </div>
  );
}
