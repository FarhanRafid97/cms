import 'next-auth';
import { UserLoged } from './globals';

declare module 'next-auth/jwt' {
  export interface JWT {
    user: UserLoged;
  }
}

declare module 'next-auth' {
  export type User = UserLoged;
}

declare module 'next-auth' {
  export interface Session {
    user: UserLoged;
  }
}
