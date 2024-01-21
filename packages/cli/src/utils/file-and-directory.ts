import fsPromises, { constants } from "fs/promises";
import path from "path";
import { Logger } from "./logger";

export class FileAndDirectoryUtility {
  private isDebugMode?: boolean = false;
  private logger: Logger;

  constructor(isDebugMode?: boolean) {
    this.isDebugMode = isDebugMode;
    this.logger = new Logger("FileAndDirectoryUtility", this.isDebugMode);
  }

  async create(
    {
      directory,
      fileName,
    }: {
      directory?: string;
      fileName: string;
    },
    content: string,
    recursive = true,
  ): Promise<boolean> {
    try {
      const filePath = path.normalize(path.join(directory ?? "", fileName));
      if (recursive) {
        const directoryPath = path.normalize(
          filePath.substring(0, filePath.lastIndexOf(path.sep)),
        );
        await fsPromises.mkdir(directoryPath, { recursive: true });
      }

      await fsPromises.writeFile(filePath, content);
      if (this.isDebugMode)
        this.logger.system(`File created/updated successfully: ${filePath}`);

      return true;
    } catch (err) {
      if (this.isDebugMode) this.logger.error("Error creating file:", err);

      return false;
    }
  }

  async delete({
    directory,
    fileName,
  }: {
    directory?: string;
    fileName: string;
  }): Promise<boolean> {
    try {
      const filePath = path.normalize(path.join(directory ?? "", fileName));
      await fsPromises.unlink(filePath);
      if (this.isDebugMode)
        this.logger.system(`File deleted successfully: ${filePath}`);

      return true;
    } catch (err) {
      if (this.isDebugMode) this.logger.error("Error deleting file:", err);

      return false;
    }
  }

  async update(
    { directory, fileName }: { directory?: string; fileName: string },
    content: string,
  ): Promise<boolean> {
    try {
      const filePath = path.normalize(path.join(directory ?? "", fileName));
      await fsPromises.writeFile(filePath, content);
      if (this.isDebugMode)
        this.logger.system(`File content updated successfully: ${filePath}`);

      return true;
    } catch (err) {
      if (this.isDebugMode) console.error("Error updating file content:", err);
      return false;
    }
  }

  async rename({
    directory,
    files,
  }: {
    directory: string;
    files: { fileNameBefore: string; fileNameAfter: string };
  }): Promise<boolean> {
    const sourceFilePath = path.normalize(
      path.join(directory, files.fileNameBefore),
    );
    const destinationFilePath = path.normalize(
      path.join(directory, files.fileNameAfter),
    );

    try {
      await fsPromises.rename(sourceFilePath, destinationFilePath);
      if (this.isDebugMode)
        this.logger.system(
          `File renamed successfully: ${files.fileNameBefore} -> ${files.fileNameAfter} at ${directory}`,
        );

      return true;
    } catch (err) {
      if (this.isDebugMode) this.logger.error("Error renaming file:", err);

      return false;
    }
  }

  async find({
    directory,
    fileName,
  }: {
    directory?: string;
    fileName: string;
  }): Promise<boolean> {
    try {
      const filePath = path.normalize(path.join(directory ?? "", fileName));
      await fsPromises.access(filePath, constants.F_OK);
      return true;
    } catch (err) {
      return false;
    }
  }

  async read({
    directory,
    fileName,
  }: {
    directory?: string;
    fileName: string;
  }): Promise<string> {
    try {
      const filePath = path.normalize(path.join(directory ?? "", fileName));
      const content = await fsPromises.readFile(filePath, "utf-8");
      return content;
    } catch (err) {
      if (this.isDebugMode) this.logger.error("Error reading file:", err);
      return "";
    }
  }
}
