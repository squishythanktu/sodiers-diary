import { UserReq } from 'src/types/user.type';
import http from 'src/utils/http';

export const URL_LOGIN = 'auth';
export const URL_REGISTER = 'users/register';

const authApi = {
  login(body: UserReq) {
    return http.post<any>(URL_LOGIN, body);
  },
  register(body: UserReq) {
    return http.post<any>(URL_REGISTER, body);
  },
};

export default authApi;
