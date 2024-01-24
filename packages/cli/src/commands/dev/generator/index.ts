import fs from "fs";
import path from "path";
import * as prettier from "prettier";

import { FormGenerateDto } from "./dto";
import { FileAndDirectoryUtility } from "@/utils";
import { GeneratorConfiguration } from "./types";
import { build } from "@/bundler";

export class Generator {
  private isDebugMode?: boolean = false;
  private fileAndDirectoryUtility: FileAndDirectoryUtility;

  private rootDirectory: string = path.join(process.cwd(), "lezzform");
  private generatedDirectory: string = path.join(
    this.rootDirectory,
    "_generated",
  );

  constructor(config: GeneratorConfiguration) {
    this.isDebugMode = config.isDebugMode;
    this.fileAndDirectoryUtility = new FileAndDirectoryUtility(
      this.isDebugMode,
    );

    fs.mkdirSync(this.rootDirectory, { recursive: true });
    fs.mkdirSync(this.generatedDirectory, { recursive: true });
  }

  async form(dto: FormGenerateDto): Promise<boolean> {
    const fileName = `${dto.fileName}.tsx`;
    const formatted = await prettier.format(dto.code, { parser: "babel-ts" });

    const create = await this.fileAndDirectoryUtility.create(
      {
        directory: this.generatedDirectory,
        fileName,
      },
      formatted,
    );

    await build({
      fileName: dto.fileName,
      directory: this.generatedDirectory,
    });

    if (!this.isDebugMode) {
      await this.fileAndDirectoryUtility.delete({
        directory: this.generatedDirectory,
        fileName,
      });
    }

    return create;
  }

  async rename(
    fileNameBefore: string,
    fileNameAfter: string,
  ): Promise<boolean> {
    const jsRename = this.fileAndDirectoryUtility.rename({
      directory: this.generatedDirectory,
      files: {
        fileNameAfter: `${fileNameAfter}.js`,
        fileNameBefore: `${fileNameBefore}.js`,
      },
    });

    const dTsRename = this.fileAndDirectoryUtility.rename({
      directory: this.generatedDirectory,
      files: {
        fileNameAfter: `${fileNameAfter}.d.ts`,
        fileNameBefore: `${fileNameBefore}.d.ts`,
      },
    });

    const promiseAll = await Promise.all(await [jsRename, dTsRename]);

    return !promiseAll.includes(false);
  }
}
