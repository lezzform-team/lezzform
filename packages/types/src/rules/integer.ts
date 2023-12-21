import { GeneralRules, GeneralRulesType } from ".";

export type IntegerRule = {
  type: "integer";
  schema: IntegerRuleSchema;
  values: Record<string, unknown>;
};

export type IntegerRuleType = GeneralRulesType & {
  maximum?: number;
  minimum?: string;
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
