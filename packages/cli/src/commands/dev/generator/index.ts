import fs from "fs";
import path from "path";
import chalk from "chalk";

import { FormGenerateDto } from "./dto";

export class Generator {
  rootDirectory: string = path.join(process.cwd(), "lezzform");
  generatedDirectory: string = path.join(this.rootDirectory, "_generated");

  constructor() {
    fs.mkdirSync(this.rootDirectory, { recursive: true });
    fs.mkdirSync(this.generatedDirectory, { recursive: true });
  }

  form(dto: FormGenerateDto) {
    fs.writeFileSync(
      path.join(this.generatedDirectory, `${dto.fileName}.tsx`),
      dto.code
    );
  }

  delete(fileName: string) {
    const filePath = path.join(this.generatedDirectory, `${fileName}.tsx`);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error removing file: ${err.message}`);
      } else {
        chalk.gray(`File ${fileName} has been successfully removed.`);
      }
    });
  }

  rename(fileNameBefore: string, fileNameAfter: string) {
    const sourceFilePath = path.join(
      this.generatedDirectory,
      `${fileNameBefore}.tsx`
    );
    const destinationFilePath = path.join(
      this.generatedDirectory,
      `${fileNameAfter}.tsx`
    );

    fs.rename(sourceFilePath, destinationFilePath, (err) => {
      if (err) {
        console.error(`Error moving file: ${err.message}`);
      } else {
        console.log(
          chalk.gray(`-- Form renamed: ${fileNameBefore} -> ${fileNameAfter}`)
        );
      }
    });
  }
}
