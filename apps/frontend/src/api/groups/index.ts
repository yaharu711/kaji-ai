import type {
  CreateGroupRequest,
  CreateGroupResponse,
  GetGroupsResponse,
} from "@kaiji-ai/backend/contracts";
import { honoClient } from "../client";

const groupsApi = honoClient.api.groups;

export const fetchGroups = async (): Promise<GetGroupsResponse> => {
  const res = await groupsApi.$get();

  if (!res.ok) {
    throw new Error("グループ一覧の取得に失敗しました");
  }

  return res.json();
};

export const createGroup = async ({ name }: CreateGroupRequest): Promise<CreateGroupResponse> => {
  const res = await groupsApi.$post({
    json: { name },
  });

  if (!res.ok) {
    throw new Error("グループの作成に失敗しました");
  }

  return res.json();
};
