import "next-auth";
import  "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      firstname: string;
      lastname: string;
      avatar: string;
      access: string;
      refresh: string;
      exp: number;
      iat: number;
      jti: string;
    };
    expires: string;
    error?: string;
  }

  interface User {
    id: string;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    avatar: string;
    access: string;
    refresh: string;
    exp: number;
    iat: number;
    jti: string;
    user?: {
      id: string;
      email: string;
      username: string;
      firstname: string;
      lastname: string;
      avatar: string;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id?: string;
    email?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    avatar?: string;
    access?: string;
    refresh?: string;
    exp?: number;
    iat?: number;
    jti?: string;
    user?: {
      id: string;
      email: string;
      username: string;
      firstname: string;
      lastname: string;
      avatar: string;
    };
  }
}