import type { GroupChoreIconCode } from "../constants/chores";

export type GroupChoreModel = {
  id: number;
  groupId: string;
  name: string;
  iconCode: GroupChoreIconCode;
  createdAt: Date;
  deletedAt: Date | null;
};
