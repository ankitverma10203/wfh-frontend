import {
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

export type LoginInput = {
  id: string;
  password: string;
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

export type WfhRequestViewProp = {
  setSnackbarProp: React.Dispatch<React.SetStateAction<SnackbarProp>>;
};

export type UserDashboardProp = {
  setSnackbarProp: React.Dispatch<React.SetStateAction<SnackbarProp>>;
};

export type WfhDetailTableProp = {
  setSnackbarProp: React.Dispatch<React.SetStateAction<SnackbarProp>>;
};

export type WfhDetailData = {
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
};

export type WfhRequest = {
  employeeId: Number;
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
};

export type WfhBalanceInfo = {
  pendingWfhQuantityMap: Map<WfhType, number>;
  availedWfhQuantityMap: Map<WfhType, number>;
  remainingWfhQuantityMap: Map<WfhType, number>;
};