import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { cn, splitUrlAndFilename, uploadFile } from "@/lib/utils";
import { FileIcon, ExternalLinkIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { AttachmentInput } from "./input";

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
        "border border-dashed border-lfui-border rounded-md text-center hover:bg-lfui-muted cursor-pointer",
        (readonly || disabled) && "cursor-not-allowed",
        disabled && "bg-lfui-border text-black",
      )}
    >
      <input {...getInputProps()} />

      {isShowEmpty && (
        <div className="h-full w-full bg-lfui-muted/50 flex flex-col justify-center items-center gap-1 p-4">
          <div className="h-10 w-10 bg-lfui-background rounded-full shadow-sm flex items-center justify-center">
            <FileIcon className="h-5 w-5" />
          </div>
          <p className="text-lfui-foreground font-medium">
            {!placeholder ? "Upload your file here" : placeholder}
          </p>
          <small className="text-sm text-lfui-muted-foreground">
            {sizeInMB}MB max file size
          </small>
        </div>
      )}

      {isUploading && (
        <div className="h-full w-full bg-lfui-muted/50 flex flex-col justify-center items-center gap-1 p-4">
          <div className="h-10 w-10 bg-lfui-background rounded-full shadow-sm flex items-center justify-center animate-bounce">
            <ArrowUpIcon className="h-5 w-5" />
          </div>
          <p className="text-lfui-foreground font-medium">Uploading...</p>
          <small className="text-sm text-lfui-muted-foreground">
            Your file is being uploaded
          </small>
        </div>
      )}

      {isShowValue && (
        <div className="w-full h-10 flex justify-between gap-2 items-center px-4">
          <div className="flex items-center gap-2">
            <FileIcon className="h-4 w-4" />

            <p className="text-sm text-lfui-foreground break-words max-w-full">
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
            <ExternalLinkIcon className="text-lfui-muted-foreground h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

Attachment.Input = AttachmentInput;
