import { promises as fsPromises } from "fs";

export async function checkFileAvailability(
  filePath: string,
): Promise<boolean> {
  try {
    await fsPromises.access(filePath, fsPromises.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

export function toKebabCase(input: string): string {
  return input
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Convert camelCase to kebab-case
    .toLowerCase(); // Convert the entire string to lowercase
}
