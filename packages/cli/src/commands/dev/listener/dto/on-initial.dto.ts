import { LezzformElement } from "@lezzform/types";

export class OnInitialDto {
  name: string;
  code: string;
  elements: LezzformElement[];

  constructor({
    name,
    code,
    elements,
  }: {
    name: string;
    code: string;
    elements: LezzformElement[];
  }) {
    this.name = name;
    this.code = code;
    this.elements = elements;
  }
}
