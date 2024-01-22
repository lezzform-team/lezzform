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

export function hexToRGBA(hex: string, alpha: number = 1): string {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  const bigint = parseInt(hex, 16);

  // Extract the RGB components
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Ensure the alpha value is within the valid range
  alpha = Math.min(1, Math.max(0, alpha));

  // Create the RGBA string
  const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;

  return rgba;
}
