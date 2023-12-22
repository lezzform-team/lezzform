import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { StringRule } from "../../rules";

export type AttachmentType = GenericLezzformElement<
  GenericFieldAttributes & AttachmentAttributesType
> & {
  type: "Attachment";
  category: LezzformElementCategory.Field;
  rule: AttachmentRuleType;
};

export type AttachmentAttributesType = AttachmentAttributesApiType;

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
  headers: Record<string, string>;
};

export type AttachmentRuleType = StringRule;
