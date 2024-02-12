import { AttachmentType } from "./elements/attachment";
import { ButtonType } from "./elements/button";
import { CustomLayoutType } from "./elements/customLayout";
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
import { TypographyType } from "./elements/typography";
import { ArrayRule, ObjectRule, PrimitiveRule } from "./rules";
import { GeneralStyleMetadata } from "./styles";

export type GenericLezzformElement<
  Attributes = Record<string, unknown>,
  StyleMetadata = GeneralStyleMetadata,
> = {
  id: string;
  name: string;
  attributes: GeneralAttributes & Attributes;
  style: StyleMetadata;
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
  Typography = "Typography",
  Action = "Action",
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
  | CustomLayoutType
  | RepeaterGroupType
  | TypographyType
  | ButtonType;

export type LezzformElementRule = PrimitiveRule | ObjectRule | ArrayRule;

export * from "./rules";
export * from "./form";
