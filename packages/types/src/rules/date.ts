import { GeneralRules, GeneralRulesType } from ".";

export type DateRule = {
  type: "date";
  schema: DateRuleSchema;
  values: Record<string, unknown>;
};

export type DateRuleType = GeneralRulesType & {};

type DateRuleSchema = GeneralRules & {};
