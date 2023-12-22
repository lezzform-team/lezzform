import { FormLabel, FormMessage } from "@/components/shared";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import axios, { AxiosError } from "axios";
import lodashGet from "lodash.get";
import { splitUrlAndFilename } from "@/lib/utils";

interface AttachmentProps {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
  isRequired?: boolean;
  onChange: (fileUrl: string) => unknown;
  onError: (message: string) => unknown;
  acceptedFormats: string[];
  maxSize: number;
  url: string;
  headers?: Record<string, string>;
  path: { body?: string; value: string };
  value?: string;
  placeholder?: string;
}

export function Attachment({
  label,
  id,
  isRequired,
  acceptedFormats,
  maxSize,
  onChange,
  onError,
  url,
  error,
  headers,
  path,
  value,
  placeholder,
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
      //   noClick: variant !== "main",
      //   noKeyboard: variant !== "main",
      maxFiles: 1,
      maxSize: maxSize * 1024,
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
    <div className="flex flex-col gap-2">
      <FormLabel htmlFor={id} isRequired={isRequired}>
        {label}
      </FormLabel>

      <div
        {...getRootProps()}
        className="p-4 border border-dashed border-lfui-border rounded-md text-center cursor-pointer hover:bg-lfui-muted"
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

      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
}
