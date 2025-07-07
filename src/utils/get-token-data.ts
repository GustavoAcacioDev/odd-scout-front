import { jwtDecode } from 'jwt-decode'

export type TRoles =
  | 'Customer'
  | 'Admin'
  | 'CashierTotal'
  | 'CashierPurchase'
  | 'CashierRedeem'
  | 'BackOffice'
  | 'Partner'

export type TJwtPayload = {
  unique_name: string
  role: string
  cltid: string
  cltfid: string
  ctmid: string
  cctmid: string
  cnedfp: string
  usrid: string
  headquarters: 'True' | 'False'
  nbf: number
  exp: number
  iat: number
  iss: string
}

export function getTokenData(token: string | undefined) {
  if (!token) return
  const decodedToken = jwtDecode<TJwtPayload>(token)
  const tokenRole = decodedToken.role || ''
  const roles: TRoles[] = tokenRole.split(',') as TRoles[]
  const isHeadquartersAdmin = decodedToken.headquarters === 'True'

  function isRoleAllowed(allowedRoles: TRoles[]) {
    return roles.some((r) => allowedRoles.includes(r))
  }

  return { decodedToken, roles, isHeadquartersAdmin, isRoleAllowed }
}
