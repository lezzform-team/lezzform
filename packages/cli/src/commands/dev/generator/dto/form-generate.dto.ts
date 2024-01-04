import { LezzformElement } from "@lezzform/types";

export class FormGenerateDto {
  fileName: string;
  code: string;

  constructor({ fileName, code }: { fileName: string; code: string }) {
    this.fileName = fileName;
    this.code = code;
  }
}
