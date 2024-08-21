export interface Authenticator {
  login(...args: any[]): Promise<AuthInfo>
  logout?(): void | Promise<void>
}

export type AuthInfo = {
  userId: string
}
