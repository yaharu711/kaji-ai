export type GroupWithMemberCountDto = {
  id: string;
  name: string;
  image: string | null;
  memberCount: number;
  invitedCount: number;
  isInvited: boolean;
};

export type BelongingDto = {
  groupId: string;
  userId: string;
  createdAt: Date;
  acceptedAt: Date | null;
};

export type GroupUserDto = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  acceptedAt: Date | null;
};
