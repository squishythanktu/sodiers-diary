export interface User {
  id: string;
  userName: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  roleId: number;
  rankId: number;
  positionId: number;
  companiesId: number;
}

export type UserReq = {
  roleId?: string;
  username: string;
  password: string;
};
