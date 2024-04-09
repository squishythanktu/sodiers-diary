import { Position } from 'src/types/position.type';
import http from 'src/utils/http';

const URL_COMPANIES = 'companies';

const companiesApi = {
  getCompanies() {
    return http.get<Position[]>(`${URL_COMPANIES}`);
  },
};

export default companiesApi;
