import {
  GeneralRules,
  GeneralRulesMessageType,
  GeneralRulesType,
  ObjectRule,
  PrimitiveRule,
} from ".";

export type ArrayRule = {
  type: "array";
  items: PrimitiveRule | ObjectRule;
  schema: ArrayRuleSchema;
  values: GeneralRulesType & Record<string, unknown>;
  messages?: ArrayRuleMessageType;
};

export type ArrayRuleType = GeneralRulesType & {
  minimum?: number;
  maximum?: number;
};

export type ArrayRuleMessageType = GeneralRulesMessageType &
  Partial<Record<keyof ArrayRuleSchema, string>>;

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
