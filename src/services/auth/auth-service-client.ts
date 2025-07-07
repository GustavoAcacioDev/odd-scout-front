import { fetchAnonClient } from "@/lib/fetchWrapperClient/fetch-anon-client";
import { TLoginUserBody, TLoginUserResponse } from "@/types/auth";

import { ApiResponse } from "../../../global";

export async function loginUserClient(data: TLoginUserBody) {
  const fetch = fetchAnonClient();

  const res = await fetch.post<TLoginUserBody, ApiResponse<TLoginUserResponse>>(
    "/auth/signin",
    data
  );

  return res;
}

export async function registerUserClient(data: TLoginUserBody) {
  const fetch = fetchAnonClient();

  const res = await fetch.post<TLoginUserBody, ApiResponse<TLoginUserResponse>>(
    "/auth/signup",
    data
  );

  return res;
}