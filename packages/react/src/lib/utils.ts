import axios, { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import lodashGet from "lodash.get";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitUrlAndFilename(url?: string): {
  baseUrl: string;
  filename: string;
} {
  if (!url) return { baseUrl: "", filename: "" };
  // Create a URL object
  const parsedUrl = new URL(url);

  // Get the base URL
  const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`;

  // Extract the filename from the path
  const pathSegments = parsedUrl.pathname.split("/");
  const filename = pathSegments[pathSegments.length - 1];

  return { baseUrl, filename };
}

export function uploadFile({
  path,
  url,
  headers: rawHeaders,
}: {
  url: string;
  path: { body?: string; value: string };
  headers: { key: string; value: string }[];
}) {
  return async (
    files: File[],
  ): Promise<{ error: string | null; data: string | null }> => {
    try {
      const file = files[0];
      let body: File | Record<string, File> = file;
      if (path.body) {
        body = {
          [path.body]: file,
        };
      }

      const headers = rawHeaders?.reduce((acc, curr) => {
        return { ...acc, [curr.key]: curr.value };
      }, {});

      const { data } = await axios.post(
        url,
        body as File | Record<string, File>,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (!lodashGet(data, path.value)) throw new Error("Path unavailable");

      return { data: lodashGet(data, path.value) as string, error: null };
    } catch (err) {
      const error = err as AxiosError;
      return { error: error.message, data: null };
    }
  };
}
