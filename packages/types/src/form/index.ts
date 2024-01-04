export type LezzformAttributes = {
  action: LezzformAction;
};

export type LezzformAction = LezzformApiAction | LezzformManualAction;

export type LezzformApiAction = {
  type: "api";
  url: string;
  headers: {
    key: string;
    value: string;
  }[];
  method: HTTPMethod;
};

export type LezzformManualAction = {
  type: "manual";
};

type HTTPMethod = "get" | "post" | "patch" | "put" | "delete";
