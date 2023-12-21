export * from "./integer";
export * from "./string";
export * from "./date";

export type GeneralRules = RequiredRule;
export type GeneralRulesType = {
  required: boolean;
};

type RequiredRule = {
  required: {
    title: "Required";
    type: "boolean";
  };
};
