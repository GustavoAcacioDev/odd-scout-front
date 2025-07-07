export type TLoginUserBody = {
  email: string
  password: string
}

export type TLoginUserResponse = {
  accessToken: string;
  expiresIn: number;
  expiresInDate: Date;
  decodedToken: TJwtPayload;
  roles: TRoles[];
  isHeadquartersAdmin: boolean;
};