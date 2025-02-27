export const ID_KEY: string = "id";
export const NAME_KEY: string = "name";
export const ROLE_KEY: string = "role";

export const DATE_FORMAT: string = "dd/MM/yyyy";
export const DATE_TIME_FORMAT: string = "dd/MM/yyyy, HH:mm:ss";

export const NAV_LINKS = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Request WFH", link: "/wfhRequestForm" },
  { name: "Approvals", link: "/approval" },
]

export enum RoleOptions {
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
  ADMIN = "ADMIN",
}

export enum WfhType {
  UWFH = "UWFH",
  PWFH = "PWFH",
}

export enum WfhRequestStatus {
  PENDING_APPROVAL = "PENDING_APPROVAL",
  INSUFFICIENT_WFH = "INSUFFICIENT_WFH",
  DUPLICATE_REQUEST = "DUPLICATE_REQUEST",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  INVALID_REQUEST = "INVALID_USER",
  FAILED = "FAILED",
}

export enum LoginStatus {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  INCORRECT_PASSWORD = "INCORRECT_PASSWORD",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILED = "LOGIN_FAILED",
}

export enum EmployeeStatus {
  ACTIVE = "ACTIVE",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  INACTIVE = "INACTIVE",
}