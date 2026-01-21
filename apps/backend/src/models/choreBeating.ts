export type ChoreBeatingModel = {
  id: number;
  groupId: string;
  choreId: number;
  userId: string;
  likeCount: number;
  beatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type NewChoreBeatingModel = Omit<ChoreBeatingModel, "id">;
