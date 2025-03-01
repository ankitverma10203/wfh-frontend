export const ID_KEY: string = "id";
export const NAME_KEY: string = "name";
export const ROLE_KEY: string = "role";

export const DATE_FORMAT: string = "dd/MM/yyyy";
export const DATE_TIME_FORMAT: string = "dd/MM/yyyy, HH:mm:ss";

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

export const NAV_LINKS = [
  {
    name: "Dashboard",
    link: "/dashboard",
    roles: [RoleOptions.ADMIN, RoleOptions.EMPLOYEE, RoleOptions.MANAGER],
  },
  {
    name: "Request WFH",
    link: "/wfhRequestForm",
    roles: [RoleOptions.ADMIN, RoleOptions.EMPLOYEE, RoleOptions.MANAGER],
  },
  {
    name: "Approvals",
    link: "/approval",
    roles: [RoleOptions.ADMIN, RoleOptions.MANAGER],
  },
];
