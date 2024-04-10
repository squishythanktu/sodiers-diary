export interface User {
  id: number;
  userName: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  roleId?: number;
  rankId: number | null;
  positionId: number | null;
  companiesId: number | null;
}

export type UserReq = {
  roleId?: string;
  username: string;
  password: string;
};
