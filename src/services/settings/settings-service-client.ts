import { fetchAuthClient } from "@/lib/fetchWrapperClient/fetch-auth-client";
import { ApiResponse } from "../../../global";

type TChangePasswordBody = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function changePassword(data: TChangePasswordBody) {
  const fetch = fetchAuthClient();

  const res = fetch.post<TChangePasswordBody, ApiResponse<null>>(
    "/auth/change-password",
    data,
  );

  return res;
}
