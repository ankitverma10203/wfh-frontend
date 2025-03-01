import {
  EmployeeStatus,
  LoginStatus,
  RoleOptions,
  WfhRequestStatus,
  WfhType,
} from "./Constants";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role: RoleOptions;
};

export type SnackbarProp = {
  open: boolean;
  message: string;
};

export type LoginFormProp = {
  setSnackbarProp: React.Dispatch<React.SetStateAction<SnackbarProp>>;
};

export type RegisterFormProp = {
  setSnackbarProp: React.Dispatch<React.SetStateAction<SnackbarProp>>;
};

export type UserDashboardProp = {
  setSnackbarProp: React.Dispatch<React.SetStateAction<SnackbarProp>>;
};

export type WfhDetailData = {
  id: number;
  wfhType: WfhType;
  requestedWfhDate: Date;
  status: WfhRequestStatus;
  createdTimestamp: Date;
  updatedTimestamp: Date;
};

export type LoginResponse = {
  id: Number;
  name: string;
  loginStatus: LoginStatus;
  role: RoleOptions;
  jwtToken: string;
};

export type WfhRequest = {
  wfhType: WfhType;
  requestedWfhDate: Date;
  requestedAt: Date;
};

export type WfhResponse = {
  successFlg: boolean;
  status: WfhRequestStatus;
};

export type NavLink = {
  name: string;
  link: string;
  roles: RoleOptions[];
};

export type WfhBalanceInfo = {
  pendingWfhQuantityMap: Map<WfhType, number>;
  availedWfhQuantityMap: Map<WfhType, number>;
  remainingWfhQuantityMap: Map<WfhType, number>;
};

export type EmployeeDetailData = {
  id: string;
  name: string;
  role: RoleOptions;
  email: string;
  managerId: string;
  employeeStatus: EmployeeStatus;
};

export type EmployeeWfhDetailData = {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  managerId: string;
  requestType: WfhType;
  requestDate: String;
  status: WfhRequestStatus;
};
