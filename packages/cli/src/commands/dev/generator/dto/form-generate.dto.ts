import { LezzformElement } from "@lezzform/types";

export class FormGenerateDto {
  name: string;
  code: string;

  constructor({ name, code }: { name: string; code: string }) {
    this.name = name;
    this.code = code;
  }
}
