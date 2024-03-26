import { IconType } from "../elements/icon";
import { ImageType } from "../elements/image";
import { TextType } from "../elements/text";

export type AdornmentIconType = Pick<IconType, "type" | "attributes">;
export type AdornmentImageType = Pick<ImageType, "type" | "attributes">;

export type ElementAdornmentType = {
  icon: AdornmentIconType | AdornmentImageType;
  text: Omit<TextType, "id">;
};

export type ElementAdornmentAttributesType = {
  adornment?: {
    type?: "prefix" | "suffix";
    prefix?: Partial<ElementAdornmentType>;
    suffix?: Partial<ElementAdornmentType>;
  };
};
