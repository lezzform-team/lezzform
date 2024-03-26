export type LezzformConfiguration = {
  action: LezzformAction;
  errorMessage: LezzformErrorMessageType;
  validateMode?: LezzformValidateMode;
};

export type LezzformValidateMode =
  | "onSubmit"
  | "onChange"
  | "onBlur"
  | "onTouched"
  | "all";

export type LezzformErrorMessageType =
  | ErrorMessageFlashMessageType
  | ErrorMessageTextType;

export type ErrorMessageFlashMessageType = {
  type: "flash-message";
  attributes: {
    title?: string;
    description?: string;
  };
};

export type ErrorMessageTextType = {
  type: "text";
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
