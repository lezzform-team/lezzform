import { ElementEntity } from "../../../../types";
import { OnInitialDto } from "./on-initial.dto";

export class OnChangesDto {
  code: { web: string; mobile: string };
  element: ElementEntity;

  constructor({
    code,
    element,
  }: {
    code: { web: string; mobile: string };
    element: ElementEntity;
  }) {
    this.code = code;
    this.element = element;
  }
}
