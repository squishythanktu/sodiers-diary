import { PaginationParams } from 'src/types/pagination-params.type';
import { User, UserReq } from 'src/types/user.type';
import http from 'src/utils/http';

type ProfileFormData = Omit<User, 'id' | 'userName'>;

const URL_USERS = 'users';

const userApi = {
  register(body: UserReq) {
    return http.post<{ message: string }>(`${URL_USERS}/register`, body);
  },
  getUsers(params: PaginationParams) {
    return http.get<User[]>(`${URL_USERS}`, { params });
  },
  deleteUser(id: number) {
    return http.delete<{ message: string }>(`${URL_USERS}/user/delete/${id}`);
  },
  getUserProfile(id: number) {
    return http.get<User>(`${URL_USERS}/user/${id}`);
  },
  updateUserProfile(id: number, data: ProfileFormData) {
    return http.put<User>(`${URL_USERS}/user/${id}`, data);
  },
  changePassword(userId: number, newPassword: string) {
    return http.patch<{ message: string }>(`${URL_USERS}/user/changepassword/${userId}`, { newPassword });
  },
};

export default userApi;
