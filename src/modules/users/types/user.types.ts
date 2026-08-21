import { BaseResponse } from "@/shared/types/api.types";
import { UserStatus } from "../constants/user.constants";

export interface UserListItem {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: UserStatus;
  roleId: number | null;
  roleName: string | null;
  createdAt: string;
}

export interface UserListResult {
  items: UserListItem[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface UserListResponse extends BaseResponse {
  data: UserListResult;
}

export interface UserDetail {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: UserStatus;
  roleId: number | null;
}

export interface UserDetailResponse extends BaseResponse {
  data: UserDetail;
}
