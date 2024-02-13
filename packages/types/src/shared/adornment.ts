import { InputIconType, InputImageType } from "../elements/input";
import { TextType } from "../elements/text";

export type ElementAdornmentType = {
  icon: InputIconType | InputImageType;
  text: Omit<TextType, "id">;
};

export type ElementAttributesType = {
  adornment?: {
    type?: "prefix" | "suffix";
    prefix?: Partial<ElementAdornmentType>;
    suffix?: Partial<ElementAdornmentType>;
  };
};
