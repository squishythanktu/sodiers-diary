import { PaginationParams } from 'src/types/pagination-params.type';
import { User, UserReq } from 'src/types/user.type';
import http from 'src/utils/http';

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
};

export default userApi;
