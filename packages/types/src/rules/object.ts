import { GeneralRules, GeneralRulesType, PrimitiveRule } from ".";

export type ObjectRule = {
  type: "object";
  schema: ObjectRuleSchema;
  values: GeneralRulesType & Record<string, unknown>;
};

export type ObjectRuleType = GeneralRulesType;
type ObjectRuleSchema = GeneralRules;
