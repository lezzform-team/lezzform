import { GeneralRules, GeneralRulesMessageType, GeneralRulesType } from ".";

export type IntegerRule = {
  type: "integer";
  schema: IntegerRuleSchema;
  values: GeneralRulesType & Record<string, unknown>;
  messages?: IntegerRuleMessageType;
};

export type IntegerRuleType = GeneralRulesType & {
  maximum?: number;
  minimum?: number;
};

export type IntegerRuleMessageType = GeneralRulesMessageType &
  Partial<Record<keyof IntegerRuleSchema, string>>;

type IntegerRuleSchema = GeneralRules & {
  maximum?: {
    title: "Maximum";
    type: "integer";
  };
  minimum?: {
    title: "Minimum";
    type: "integer";
  };
};
