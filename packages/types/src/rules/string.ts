import { GeneralRules, GeneralRulesType } from ".";

export type StringRule = {
  type: "string";
  schema: StringRuleSchema;
  values: Record<string, unknown>;
};

export type StringRuleType = GeneralRulesType & {
  format?: string;
  minLength?: string;
  maxLength?: string;
};

type StringRuleSchema = GeneralRules & {
  format?: {
    title: "Format";
    type: "string";
  };
  minLength?: {
    title: "Minimum Length";
    type: "integer";
  };
  maxLength?: {
    title: "Maximum Length";
    type: "integer";
  };
};
