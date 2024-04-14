import { Diary } from 'src/types/diary.type';
import { PaginationParams } from 'src/types/pagination-params.type';
import { DiaryStatisticRequest, DiaryStatisticResponse } from 'src/types/statistic.type';
import http from 'src/utils/http';

const URL_DIARIES = 'diaries';

const diaryApi = {
  getDiaries(params: PaginationParams) {
    return http.get<Diary[]>(`${URL_DIARIES}`, { params });
  },
  createDiary(data: Diary) {
    return http.post<unknown>(`${URL_DIARIES}/save`, data);
  },
  searchDiariesByStatistics(body: DiaryStatisticRequest) {
    return http.post<DiaryStatisticResponse[]>(`${URL_DIARIES}/statistical`, body);
  },
};

export default diaryApi;
