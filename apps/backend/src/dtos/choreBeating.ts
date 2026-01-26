export type BeatingTimelineMessageDto = {
  id: number;
  userId: string;
  userName: string | null;
  imgUrl: string | null;
  mainMessage: string;
  descriptionMessage: string | null;
};

export type BeatingTimelineItemDto = {
  beatingId: number;
  beatedAt: Date;
  choreId: number;
  choreName: string;
  iconCode: string;
  thanksCount: number;
  likedByMe: boolean;
  messages: BeatingTimelineMessageDto[];
  userId: string;
  userName: string | null;
  imgUrl: string | null;
};

export type BeatingTimelineGroupDto = {
  hour: string;
  items: BeatingTimelineItemDto[];
};
