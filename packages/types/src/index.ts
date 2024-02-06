import { AttachmentType } from "./elements/attachment";
import { DatePickerType } from "./elements/datePicker";
import { DateRangePickerType } from "./elements/dateRangePicker";
import { DropdownType } from "./elements/dropdown";
import { EmailInputType } from "./elements/emailInput";
import { InputType } from "./elements/input";
import { MultiSelectType } from "./elements/multiSelect";
import { NumberInputType } from "./elements/numberInput";
import { PhoneNumberInputType } from "./elements/phoneNumberInput";
import { RepeaterGroupType } from "./elements/repeaterGroup";
import { TextAreaType } from "./elements/textArea";
import { ThreeColumnType } from "./elements/threeColumn";
import { TwoColumnType } from "./elements/twoColumn";
import { ArrayRule, ObjectRule, PrimitiveRule } from "./rules";

export type GenericLezzformElement<T = Record<string, unknown>> = {
  id: string;
  name: string;
  attributes: GeneralAttributes & T;
  parentId?: string;
};

export type GenericLezzformVariant<T = Record<string, unknown>> = {
  attributes: T;
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
  Repeater = "Repeater",
}

export type LezzformElementType = LezzformElement["type"];
export type LezzformElement =
  | InputType
  | EmailInputType
  | NumberInputType
  | PhoneNumberInputType
  | TextAreaType
  | DropdownType
  | DatePickerType
  | DateRangePickerType
  | AttachmentType
  | MultiSelectType
  | TwoColumnType
  | ThreeColumnType
  | RepeaterGroupType;

export type LezzformElementRule = PrimitiveRule | ObjectRule | ArrayRule;

export * from "./rules";
export * from "./form";
