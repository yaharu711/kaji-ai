import type {
  CreateGroupRequest,
  CreateGroupResponse,
  CreateChoreBeatingRequest,
  CreateChoreBeatingResponse,
  GetGroupChoresResponse,
  GetGroupBeatingsRequest,
  GetGroupBeatingsResponse,
  GetGroupsResponse,
  GetGroupUsersResponse,
  InviteGroupRequest,
  InviteGroupResponse,
  NoContentResponse,
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

export const fetchGroupChores = async ({
  groupId,
}: {
  groupId: string;
}): Promise<GetGroupChoresResponse> => {
  const res = await groupsApi[":groupId"].chores.$get({
    param: { groupId },
  });
  const response = res as Response;

  if (!response.ok) {
    throw new ApiError(response.status, "家事一覧の取得に失敗しました");
  }

  return response.json() as Promise<GetGroupChoresResponse>;
};

export const fetchGroupBeatings = async ({
  groupId,
  date,
}: {
  groupId: string;
  date: GetGroupBeatingsRequest["date"];
}): Promise<GetGroupBeatingsResponse> => {
  const res = await groupsApi[":groupId"].beatings.$get({
    param: { groupId },
    query: { date },
  });

  if (res.status === 422) {
    const body = (await res.json()) as UnprocessableEntityResponse;
    const message = body.errors
      .map((error) => error.message)
      .filter(Boolean)
      .join(" / ");
    throw new ApiError(422, message || "入力内容を確認してください");
  }

  if (!res.ok) {
    throw new ApiError(res.status, "討伐ログの取得に失敗しました");
  }

  return res.json() as Promise<GetGroupBeatingsResponse>;
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

export const fetchGroupUsers = async ({
  groupId,
}: {
  groupId: string;
}): Promise<GetGroupUsersResponse> => {
  const res = await groupsApi[":groupId"].users.$get({
    param: { groupId },
  });
  const response = res as Response;

  if (!response.ok) {
    throw new ApiError(response.status, "グループメンバーの取得に失敗しました");
  }

  return response.json() as Promise<GetGroupUsersResponse>;
};

export const createChoreBeating = async ({
  groupId,
  chore_id,
  beated_at,
}: CreateChoreBeatingRequest & { groupId: string }): Promise<CreateChoreBeatingResponse> => {
  const res = await groupsApi[":groupId"].beatings.$post({
    param: { groupId },
    json: { chore_id, beated_at },
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
    throw new ApiError(response.status, "討伐記録の作成に失敗しました");
  }

  return response.json() as Promise<CreateChoreBeatingResponse>;
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

export const acceptGroupInvitation = async ({
  groupId,
}: {
  groupId: string;
}): Promise<NoContentResponse> => {
  const res = await groupsApi[":groupId"].invitations.accept.$post({
    param: { groupId },
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
    throw new ApiError(response.status, "招待の承認に失敗しました");
  }

  return undefined;
};

export const denyGroupInvitation = async ({
  groupId,
}: {
  groupId: string;
}): Promise<NoContentResponse> => {
  const res = await groupsApi[":groupId"].invitations.deny.$post({
    param: { groupId },
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
    throw new ApiError(response.status, "招待の拒否に失敗しました");
  }

  return undefined;
};
