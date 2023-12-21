import { GeneralRules, GeneralRulesType } from ".";

export type StringRule = {
  type: "string";
  schema: StringRuleSchema;
  values: GeneralRulesType & Record<string, unknown>;
};

export type StringRuleType = GeneralRulesType & {
  format?: string;
  minimum?: number;
  maximum?: number;
};

type StringRuleSchema = GeneralRules & {
  format?: {
    title: "Format";
    type: "string";
  };
  minimum?: {
    title: "Minimum Length";
    type: "integer";
  };
  maximum?: {
    title: "Maximum Length";
    type: "integer";
  };
};
