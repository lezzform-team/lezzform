import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
