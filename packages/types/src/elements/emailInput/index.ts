import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { StringRule } from "../../rules";

export type EmailInputType = GenericLezzformElement<GenericFieldAttributes> & {
  type: "EmailInput";
  category: LezzformElementCategory.Field;
  rule: EmailInputRuleType;
};

export type EmailInputRuleType = StringRule;
