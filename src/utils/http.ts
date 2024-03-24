import axios, { AxiosError, type AxiosInstance } from 'axios';
import { URL_LOGIN, URL_REGISTER } from 'src/api/auth.api';
import config from 'src/constants/config.constant';
import { getAccessTokenFromLocalStorage, setAccessTokenToLS, setProfileToLS } from './auth';

export class Http {
  instance: AxiosInstance;
  private token: string;

  constructor() {
    this.token = getAccessTokenFromLocalStorage();
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10 * 1000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.token && config.headers) {
          config.headers.authorization = `Bearer ${this.token}`;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === URL_LOGIN || url === URL_REGISTER) {
          this.token = response.data.token;
          setAccessTokenToLS(this.token);
          setProfileToLS(response.data);
        }
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;
export default http;
