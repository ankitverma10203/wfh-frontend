import { NavLink } from "./Types";

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

export const WfhTypeDescription = {
  UWFH: "Unplanned WFH",
  PWFH: "Planned WFH",
};

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

export enum NAV_LINK_NAME {
  DASHBOARD="Dashboard",
  APPROVALS="Approvals",
  EMPLOYEE_DETAILS="Employee Details",
  WFH_ALLOCATION="WFH Allocation"
}

export const NAV_LINKS: NavLink[] = [
  {
    name: NAV_LINK_NAME.DASHBOARD,
    link: "/dashboard",
    roles: [RoleOptions.ADMIN, RoleOptions.EMPLOYEE, RoleOptions.MANAGER],
  },
  {
    name: NAV_LINK_NAME.APPROVALS,
    link: "/approval",
    roles: [RoleOptions.ADMIN, RoleOptions.MANAGER],
  },
  {
    name: NAV_LINK_NAME.EMPLOYEE_DETAILS,
    link: "/employeeDetails",
    roles: [RoleOptions.ADMIN],
  },
  {
    name: NAV_LINK_NAME.WFH_ALLOCATION,
    link: "/wfhAllocation",
    roles: [RoleOptions.ADMIN],
  },
];

export const APPROVAL_NOTIFICATION_EVENT_NAME = "approval-notification-event";
export const WFH_REQUEST_EVENT_NAME = "wfh-request-event";