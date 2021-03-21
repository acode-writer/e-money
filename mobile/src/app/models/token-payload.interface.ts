export interface TokenPayloadInterface {
  iat: number;
  exp: number;
  roles: [string];
  username: string;
  id: number;
  phone: string;
}
