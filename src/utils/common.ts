export const makeAuthorizationHeader = (token: any): string | undefined =>
  token ? `Bearer ${token}` : undefined;
