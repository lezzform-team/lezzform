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
