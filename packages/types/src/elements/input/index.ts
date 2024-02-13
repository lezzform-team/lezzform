import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { StringRule } from "../../rules";
import { ElementAdornmentAttributesType } from "../../shared";
import { GeneralStyleMetadata } from "../../styles";
import { IconType } from "../icon";
import { ImageType } from "../image";

export type InputType = GenericLezzformElement<
  GenericFieldAttributes & ElementAdornmentAttributesType,
  InputStyleType
> & {
  type: "Input";
  category: LezzformElementCategory.Field;
  rule: InputRuleType;
};

export type InputIconType = Pick<IconType, "type" | "attributes">;
export type InputImageType = Pick<ImageType, "type" | "attributes">;

export type InputStyleType = GeneralStyleMetadata<InputStyleMetadataValuesType>;

export type InputStyleMetadataValuesType = {
  input: Record<string, unknown>;
  prefixAdornment: {
    icon?: Record<string, unknown>;
    text?: Record<string, unknown>;
  };
  suffixAdornment: {
    icon?: Record<string, unknown>;
    text?: Record<string, unknown>;
  };
};

export type InputRuleType = StringRule;
