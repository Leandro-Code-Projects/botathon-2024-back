export interface User {
  id: string;
  name: string;
}

export type UserReq = Pick<User, "name">;
