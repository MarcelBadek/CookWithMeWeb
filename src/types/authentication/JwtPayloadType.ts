export interface JwtPayloadType {
  firstName: string;
  lastName: string;
  role: [{ authority: string }];
  id: string;
  email: string;
  sub: string;
  iat: number;
  exp: number;
}
