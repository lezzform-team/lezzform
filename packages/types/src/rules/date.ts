import { GeneralRules, GeneralRulesMessageType, GeneralRulesType } from ".";

export type DateRule = {
  type: "date";
  schema: DateRuleSchema;
  values: GeneralRulesType & Record<string, unknown>;
  messages?: DateRuleMessageType;
};

export type DateRuleType = GeneralRulesType & {};

export type DateRuleMessageType = GeneralRulesMessageType &
  Partial<Record<keyof DateRuleSchema, string>>;

type DateRuleSchema = GeneralRules & {};
