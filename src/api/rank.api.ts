import { Position } from 'src/types/position.type';
import http from 'src/utils/http';

const URL_RANKS = 'ranks';

const rankApi = {
  getRanks() {
    return http.get<Position[]>(`${URL_RANKS}`);
  },
};

export default rankApi;
