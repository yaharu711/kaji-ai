import type { ChoreIconCode } from "../../../constants/chores";

export interface BeatingMessage {
  id: string;
  userName: string;
  userImageUrl?: string | null;
  mainMessage: string;
  describeMessage?: string;
  isMyBeating?: boolean;
}

export interface BeatingLog {
  id: string;
  beatingId: number;
  groupId: string;
  date: string;
  choreIconCode: ChoreIconCode;
  choreName: string;
  userName: string;
  userImageUrl?: string | null;
  likeCount?: number;
  likedByMe?: boolean;
  messagedByMe?: boolean;
  commentCount?: number;
  userRoleLabel?: string;
  isMyBeating?: boolean;
  messages?: readonly BeatingMessage[];
}

export interface BeatingGroup {
  timeLabel: string;
  items: readonly BeatingLog[];
}
