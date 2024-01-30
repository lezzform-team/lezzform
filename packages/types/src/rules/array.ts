import { GeneralRules, GeneralRulesType, ObjectRule, PrimitiveRule } from ".";

export type ArrayRule = {
  type: "array";
  items: PrimitiveRule | ObjectRule;
  schema: ArrayRuleSchema;
  values: GeneralRulesType & Record<string, unknown>;
};

export type ArrayRuleType = GeneralRulesType & {
  minimum?: number;
  maximum?: number;
};

type ArrayRuleSchema = GeneralRules & {
  minimum?: {
    title: "Minimum Length";
    type: "integer";
  };
  maximum?: {
    title: "Maximum Length";
    type: "integer";
  };
};
