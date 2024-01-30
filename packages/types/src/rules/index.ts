import { DateRule } from "./date";
import { IntegerRule } from "./integer";
import { StringRule } from "./string";

export * from "./integer";
export * from "./string";
export * from "./date";
export * from "./array";

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

export type PrimitiveRule = StringRule | IntegerRule | DateRule;
