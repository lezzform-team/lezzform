import { GeneralRules, GeneralRulesType } from ".";

export type IntegerRule = {
  type: "integer";
  schema: IntegerRuleSchema;
  values: GeneralRulesType & Record<string, unknown>;
};

export type IntegerRuleType = GeneralRulesType & {
  maximum?: number;
  minimum?: number;
};

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
