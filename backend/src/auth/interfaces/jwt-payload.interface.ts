export interface JwtPayload {
  sub: number;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
}
