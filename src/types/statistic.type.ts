export type DiaryStatisticRequest = {
  reactionId?: number;
  hashtag?: string;
  startDate?: string;
  endDate?: string;
};

export type DiaryStatisticResponse = {
  elementName: string;
  quantity: number;
  isReaction: boolean;
};
