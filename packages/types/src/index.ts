import { AttachmentType } from "./elements/attachment";
import { DatePickerType } from "./elements/datePicker";
import { DropdownType } from "./elements/dropdown";
import { InputType } from "./elements/input";
import { TextAreaType } from "./elements/textArea";
import { ThreeColumnType } from "./elements/threeColumn";
import { TwoColumnType } from "./elements/twoColumn";
import { DateRule, IntegerRule, StringRule } from "./rules";

export type GenericLezzformElement<T = Record<string, unknown>> = {
  id: string;
  name: string;
  attributes: GeneralAttributes & T;
};

export type GenericFieldAttributes = {
  validator: string;
};

export type GeneralAttributes = {
  label?: string;
};

export enum LezzformElementCategory {
  Field = "Field",
  Layout = "Layout",
  Iterate = "Iterate",
}

export type LezzformElementType = LezzformElement["type"];
export type LezzformElement =
  | InputType
  | TextAreaType
  | DropdownType
  | DatePickerType
  | AttachmentType
  | TwoColumnType
  | ThreeColumnType;

export type LezzformElementRule = StringRule | IntegerRule | DateRule;

export * from "./rules";
