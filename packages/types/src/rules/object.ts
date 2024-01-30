import {
  GeneralRules,
  GeneralRulesMessageType,
  GeneralRulesType,
  PrimitiveRule,
} from ".";

export type ObjectRule = {
  type: "object";
  schema: ObjectRuleSchema;
  values: GeneralRulesType & Record<string, unknown>;
};

export type ObjectRuleType = GeneralRulesType;

export type ObjectRuleMessageType = GeneralRulesMessageType &
  Partial<Record<keyof ObjectRuleSchema, string>>;

type ObjectRuleSchema = GeneralRules;
