import { GeneralRules, GeneralRulesMessageType, GeneralRulesType } from ".";
import { LezzformElementRule } from "..";

export type ObjectRule = {
  type: "object";
  schema: ObjectRuleSchema;
  properties?: Record<string, LezzformElementRule>;
  values: GeneralRulesType & Record<string, unknown>;
  messages?: ObjectRuleMessageType;
};

export type ObjectRuleType = GeneralRulesType;

export type ObjectRuleMessageType = GeneralRulesMessageType &
  Partial<Record<keyof ObjectRuleSchema, string>>;

type ObjectRuleSchema = GeneralRules;
