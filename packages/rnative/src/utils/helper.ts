import URL from 'url-parse';

export const rem = (strings: TemplateStringsArray): number => {
  const rootFontSize = 16;
  const remValue = parseFloat(strings[0]); // Extract the value from the template literal
  return remValue * rootFontSize;
};

export function splitUrlAndFilename(url?: string): {
  baseUrl: string;
  filename: string;
} {
  if (!url) return {baseUrl: '', filename: ''};
  // Create a URL object
  const parsedUrl = new URL(url);

  // Get the base URL
  const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`;

  // Extract the filename from the path
  const pathSegments = parsedUrl.pathname.split('/');
  const filename = pathSegments[pathSegments.length - 1];

  return {baseUrl, filename};
}
