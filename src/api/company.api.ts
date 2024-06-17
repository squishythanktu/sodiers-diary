import { Position } from 'src/types/position.type';
import http from 'src/utils/http';

const URL_COMPANIES = 'companies';
const URL_SUB_COMPANIES = 'sub-companies';
const URL_DEPARTMENT_COMPANIES = 'department-companies';

const companiesApi = {
  getCompanies() {
    return http.get<Position[]>(`${URL_COMPANIES}`);
  },
  getSubCompanies() {
    return http.get<Position[]>(`${URL_SUB_COMPANIES}`);
  },
  getDepartmentCompanies() {
    return http.get<Position[]>(`${URL_DEPARTMENT_COMPANIES}`);
  },
};

export default companiesApi;
