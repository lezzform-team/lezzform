import { GeneralRules, GeneralRulesMessageType, GeneralRulesType } from ".";

export type StringRule = {
  type: "string";
  schema: StringRuleSchema;
  values: GeneralRulesType & Record<string, unknown>;
  messages?: StringRuleMessageType;
};

export type StringRuleType = GeneralRulesType & {
  format?: string;
  minimum?: number;
  maximum?: number;
};

export type StringRuleMessageType = GeneralRulesMessageType &
  Partial<Record<keyof StringRuleSchema, string>>;

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
