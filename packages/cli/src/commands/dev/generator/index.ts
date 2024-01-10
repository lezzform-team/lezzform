import fs from "fs";
import path from "path";

import { FormGenerateDto } from "./dto";
import { FileAndDirectoryUtility } from "@/utils";
import { GeneratorConfiguration } from "./types";

export class Generator {
  private isDebugMode?: boolean = false;
  private fileAndDirectoryUtility: FileAndDirectoryUtility;

  private rootDirectory: string = path.join(process.cwd(), "lezzform");
  private generatedDirectory: string = path.join(
    this.rootDirectory,
    "_generated"
  );

  constructor(config: GeneratorConfiguration) {
    this.isDebugMode = config.isDebugMode;
    this.fileAndDirectoryUtility = new FileAndDirectoryUtility(
      this.isDebugMode
    );

    fs.mkdirSync(this.rootDirectory, { recursive: true });
    fs.mkdirSync(this.generatedDirectory, { recursive: true });
  }

  async form(dto: FormGenerateDto): Promise<boolean> {
    return this.fileAndDirectoryUtility.create(
      {
        directory: this.generatedDirectory,
        fileName: `${dto.fileName}.tsx`,
      },
      dto.code
    );
  }

  async delete(fileName: string): Promise<boolean> {
    return this.fileAndDirectoryUtility.delete({
      directory: this.generatedDirectory,
      fileName: `${fileName}.tsx`,
    });
  }

  async rename(
    fileNameBefore: string,
    fileNameAfter: string
  ): Promise<boolean> {
    return this.fileAndDirectoryUtility.rename({
      directory: this.generatedDirectory,
      files: { fileNameAfter, fileNameBefore },
    });
  }
}
