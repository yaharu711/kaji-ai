import type {
  CreateGroupRequest,
  CreateGroupResponse,
  GetGroupsResponse,
  InviteGroupRequest,
  InviteGroupResponse,
  SearchUsersResponse,
  UnprocessableEntityResponse,
} from "@kaiji-ai/backend/contracts";
import { honoClient } from "../client";
import { ApiError } from "../errors";

const groupsApi = honoClient.api.groups;

export const fetchGroups = async (): Promise<GetGroupsResponse> => {
  const res = await groupsApi.$get();
  const response = res as Response;

  if (!response.ok) {
    throw new Error("グループ一覧の取得に失敗しました");
  }

  return response.json() as Promise<GetGroupsResponse>;
};

export const searchGroupUsers = async ({
  groupId,
  email,
}: {
  groupId: string;
  email: string;
}): Promise<SearchUsersResponse> => {
  const res = await groupsApi[":groupId"].search.users.$get({
    param: { groupId },
    query: { email },
  });
  const response = res as Response;

  if (response.status === 422) {
    const body = (await response.json()) as UnprocessableEntityResponse;
    const message = body.errors
      .map((error) => error.message)
      .filter(Boolean)
      .join(" / ");
    throw new ApiError(422, message || "入力内容を確認してください");
  }

  if (!response.ok) {
    throw new ApiError(response.status, "ユーザー検索に失敗しました");
  }

  return response.json() as Promise<SearchUsersResponse>;
};

export const createGroup = async ({ name }: CreateGroupRequest): Promise<CreateGroupResponse> => {
  const res = await groupsApi.$post({
    json: { name },
  });
  const response = res as Response;

  if (!response.ok) {
    throw new Error("グループの作成に失敗しました");
  }

  return response.json() as Promise<CreateGroupResponse>;
};

export const inviteGroupUser = async ({
  groupId,
  user_id,
}: InviteGroupRequest & { groupId: string }): Promise<InviteGroupResponse> => {
  const res = await groupsApi[":groupId"].invitations.$post({
    param: { groupId },
    json: { user_id },
  });
  const response = res as Response;

  if (response.status === 422) {
    const body = (await response.json()) as UnprocessableEntityResponse;
    const message = body.errors
      .map((error) => error.message)
      .filter(Boolean)
      .join(" / ");
    throw new ApiError(422, message || "入力内容を確認してください");
  }

  if (!response.ok) {
    throw new ApiError(response.status, "ユーザー招待に失敗しました");
  }

  return response.json() as Promise<InviteGroupResponse>;
};
