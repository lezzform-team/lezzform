import fs from "fs";
import path from "path";

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
      path.join(this.generatedDirectory, `${dto.name.replace(" ", "-")}.tsx`),
      dto.code,
    );
  }
}
