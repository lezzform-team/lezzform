export type LezzformAttributes = {
  actions: LezzformAction[];
  defaultAction: string;
};

export type LezzformAction = LezzformApiAction;

export type LezzformApiAction = {
  name: string;
  type: "api";
  url: string;
  headers: {
    key: string;
    value: string;
  }[];
  method: HTTPMethod;
};

type HTTPMethod = "get" | "post" | "patch" | "put" | "delete";
