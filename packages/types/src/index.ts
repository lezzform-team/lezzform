import { DropdownType } from "./elements/dropdown";
import { InputType } from "./elements/input";
import { TextAreaType } from "./elements/textArea";
import { ThreeColumnType } from "./elements/threeColumn";
import { TwoColumnType } from "./elements/twoColumn";

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
}

export type LezzformElementType = LezzformElement["type"];
export type LezzformElement =
  | InputType
  | TextAreaType
  | DropdownType
  | TwoColumnType
  | ThreeColumnType;
