import { ElementEntity } from "../../../../types";
import { OnInitialDto } from "./on-initial.dto";

export class OnChangesDto {
  code: string;
  element: ElementEntity;

  constructor({ code, element }: { code: string; element: ElementEntity }) {
    this.code = code;
    this.element = element;
  }
}
