export type Section = unknown;
export type Field = unknown;
export type Page = unknown;
export type Definition = unknown;
export type Metadata = unknown;
export type Validation = unknown;
export type Journey = unknown;
export type Footer = unknown;
export type Operator = "EQUAL" | "NOT_EQUAL" | "LESS_THAN" | "GREATER_THAN" | "NOT_NULL" | "NULL";
export type ResponseType = "Success" | "Error" | "Info" | "Warning" | "Default";

export interface User {
    id: string;
    loginCredentials: string;
    authType: string;
}

export interface ErrorMessage {
    message: string;
}

export interface Navigate {
    url: string;
    isTargetSelf: boolean;
    isIntrinsic: boolean;
}

export interface LinkDetail extends ErrorMessage {
    detail: Link;
}

export interface Link {
    journey: Journey;
    id: string;
    definitionVersionId: string;
    userId: string;
    user: User;
    expiry: string;
}

export type RequestDetails = unknown;
export type ResponseData = unknown;

export interface APIResponse {
  accessor: string;
  operator: Operator;
  value: unknown;
  type: ResponseType;
  message: string;
  disableFields: string[];
  isToastEnabled?: boolean;
  saveResponse?: boolean;
  showErrorOn?: string[];
  toastDuration?: number;
  filter?: unknown;
  dependsOn?: unknown;
}

export interface Theme {
    errorColor: string;
    primaryColor: string;
    primaryColorBright: string;
    primaryColorDark: string;
    secondaryColor: string;
}

export type Mapping = Record<string, { key: string }>;
export type ASYNC_REQUEST_TYPE = "ASYNC";
export type SYNC_REQUEST_TYPE = "SYNC";

export type RequestType = ASYNC_REQUEST_TYPE | SYNC_REQUEST_TYPE;

export type Any = unknown;

export type Request = unknown;
export type Response = unknown;

export interface ErrorFieldsObjectType {
    name: string;
    message: string;
}
