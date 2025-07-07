export type TLoginUserBody = {
  email: string
  password: string
}

export type TSignUpUserBody = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type TLoginUserResponse = {
  accessToken: string;
  expiresIn: number;
  expiresInDate: Date;
  decodedToken: TJwtPayload;
  roles: TRoles[];
  isHeadquartersAdmin: boolean;
};