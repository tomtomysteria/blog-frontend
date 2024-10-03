import { jwtDecode } from 'jwt-decode';

export function checkIfTokenExpired(token: string): boolean {
  const decodedToken = jwtDecode<{ exp: number }>(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
}
