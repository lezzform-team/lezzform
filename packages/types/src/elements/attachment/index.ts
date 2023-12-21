import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { GeneralRules } from "../../rules";

export type AttachmentType = GenericLezzformElement<
  GenericFieldAttributes & AttachmentAttributesType
> & {
  type: "attachment";
  category: LezzformElementCategory.Field;
  rule: AttachmentRuleType;
};

export type AttachmentAttributesType = {
  url: string;
  path: {
    value: string;
  };
};

export type AttachmentRuleType = GeneralRules;
