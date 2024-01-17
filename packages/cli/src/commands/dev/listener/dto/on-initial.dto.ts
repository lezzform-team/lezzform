import { LezzformElement } from "@lezzform/types";

export class OnInitialDto {
  name: string;
  code: { web: string; mobile: string };
  elements: LezzformElement[];

  constructor({
    name,
    code,
    elements,
  }: {
    name: string;
    code: { web: string; mobile: string };
    elements: LezzformElement[];
  }) {
    this.name = name;
    this.code = code;
    this.elements = elements;
  }
}
