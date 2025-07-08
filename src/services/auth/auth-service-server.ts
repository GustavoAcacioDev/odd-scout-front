import { fetchAnonServer } from '@/lib/fetchWrapperServer/fetch-anon-server'
import { TLoginUserBody, TLoginUserResponse } from '@/types/auth'

import { ApiResponse } from '../../../global'

export async function loginUserServer(data: TLoginUserBody) {
  const fetch = fetchAnonServer()

  const res = await fetch.post<TLoginUserBody, ApiResponse<TLoginUserResponse>>(
    '/auth/signin',
    data,
  )

  console.log(`service`, res)

  return res
}
