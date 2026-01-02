import type { GetGroupsResponse } from "../../../../backend/src/routing/schemas/responses/getGroupsResponse";
import { honoClient } from "../client";

const groupsApi = honoClient.api.groups;

export const fetchGroups = async (): Promise<GetGroupsResponse> => {
  const res = await groupsApi.$get();

  if (!res.ok) {
    throw new Error("グループ一覧の取得に失敗しました");
  }

  return res.json();
};
