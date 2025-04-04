export enum NODE_ENV {
  DEVELOPMENT = "development",
  TEST = "test",
  PRODUCTION = "production",
}

export enum OAUTH_GRANT_TYPE {
  PASSWORD = "password",
  REFRESH_TOKEN = "refresh_token",
}

export enum AUTH_STRATEGY {
  TOKEN = "token",
  REFRESH_TOKEN = "refresh_token",
}

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 20;

export enum DEFAULT_ACTIONS {
  FILTER = "filter",
  SHOW = "show",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export enum UserTypeCode {
  General = 1,
  Admin = 2,
}

export enum UserRegistrationStatusCode {
  Unregistered = 1,
  Registered = 2,
  Unapproved = 3,
}

export enum ResetPasswordStatusCode {
  NotImplemented = 1,
  Completed = 2,
}

export const RESET_PASSWORD_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export enum TwoFactorAuthStatusCode {
  Unauthenticated = 1,
  Authenticated = 2,
}

export enum UserAction {
  Add = "add",
  Edit = "edit",
  Delete = "delete",
  View = "view",
}

export const MAX_SESSION = 10;
export const MAX_LOGIN_TRY = 10;
export const LOGIN_SESSION_TIMEOUT = 86400; // 1 day in seconds

export const AUTH_CODE_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds
export const TWO_FACTOR_AUTH_TRUST_PERIOD = 30 * 24 * 60 * 60 * 1000; // 30 day in milliseconds
export const INVITATION_CODE_EXPIRATION_DAY = 7;

export const S3_PRESIGNED_URL_EXPIRATION = 60 * 60; // URL expiration time in seconds
export const S3_PRESIGNED_URL_DOWNLOAD_EXPIRATION = 60 * 60; // URL expiration time in seconds

export const DEEP_LINK_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 1 week in miliseconds

export const ContentTypeMap: { [key: string]: string } = {
  // Text Files
  txt: "text/plain",
  html: "text/html",
  css: "text/css",
  csv: "text/csv",
  xml: "application/xml",

  // Image Files
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  bmp: "image/bmp",
  svg: "image/svg+xml",

  // Audio Files
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",

  // Video Files
  mp4: "video/mp4",
  avi: "video/x-msvideo",
  mov: "video/quicktime",
  wmv: "video/x-ms-wmv",

  // Application Files
  json: "application/json",
  pdf: "application/pdf",
  zip: "application/zip",
  gzip: "application/gzip",
  exe: "application/octet-stream",

  // Microsoft Office Files
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};

export const PUBLIC_API_TOKEN_EXPIRATIONS_IN_MINUES = 10;
export const S3_LIMITED_FILE_SIZE = 314572800; // Limit size to 300 MB
export const TOTAL_FILE_SIZE_LIMIT = 2 * 1024 * 1024 * 1024; // Limit size to 2 GB
export const TOTAL_FILE_QUANTITY_LIMIT = 20; // Maximum number of files

export * from "./user";
