import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { StringRule } from "../../rules";
import { GeneralStyleMetadata } from "../../styles";

export type AttachmentType = GenericLezzformElement<
  GenericFieldAttributes & AttachmentAttributesType,
  AttachmentInputStyleType
> & {
  type: "Attachment";
  category: LezzformElementCategory.Field;
  rule: AttachmentRuleType;
};

export type AttachmentAttributesType = AttachmentAttributesApiType & {
  variant: AttachmentVariant;
};

export type AttachmentInputStyleType =
  GeneralStyleMetadata<AttachmentInputStyleMetadataValuesType>;

export type AttachmentInputStyleMetadataValuesType = {
  beforeUpload: Partial<{
    container: Record<string, unknown>;
    titleText: Record<string, unknown>;
    subText: Record<string, unknown>;
  }>;
  uploading: AttachmentInputStyleMetadataValuesType["beforeUpload"];
  afterUpload: Partial<{
    container: Record<string, unknown>;
    valueText: Record<string, unknown>;
  }>;
};

export type AttachmentVariant =
  | AttachmentDefaultVariantType
  | AttachmentInputVariantType;

export type AttachmentDefaultVariantType = {
  type: "Default";
};

export type AttachmentInputVariantType = {
  type: "Input";
};

export type AttachmentAttributesApiType = {
  url: string;
  path: {
    body?: string;
    value: string;
  };
  settings: {
    maxSize: number;
    acceptedFormats: string[];
  };
  headers: { key: string; value: string }[];
};

export type AttachmentRuleType = StringRule;
