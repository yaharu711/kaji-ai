export type GroupWithMemberCountDto = {
  id: string;
  name: string;
  image: string | null;
  memberCount: number;
};

export type BelongingDto = {
  groupId: string;
  userId: string;
  createdAt: Date;
  acceptedAt: Date | null;
};
