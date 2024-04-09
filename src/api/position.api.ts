import { Position } from 'src/types/position.type';
import http from 'src/utils/http';

const URL_POSITIONS = 'positions';

const positionApi = {
  getPositions() {
    return http.get<Position[]>(`${URL_POSITIONS}`);
  },
};

export default positionApi;
