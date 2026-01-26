import type { Context } from "hono";

import { getDb } from "../db/client";
import { requireGroupMember } from "./authorization";
import { ChoreRepository } from "../repositories/chore.repository";
import { ChoreBeatingsRepository } from "../repositories/choreBeatings.repository";
import { ChoreBeatingLikesRepository } from "../repositories/choreBeatingLikes.repository";
import { GroupRepository } from "../repositories/group.repository";
import { UserRepository } from "../repositories/user.repository";
import { createChoreBeatingSuccessSchema } from "../routing/schemas/responses/createChoreBeatingResponse";
import { createChoreBeatingLikeSuccessSchema } from "../routing/schemas/responses/createChoreBeatingLikeResponse";
import { createGroupSuccessSchema } from "../routing/schemas/responses/createGroupResponse";
import { getGroupBeatingsSuccessSchema } from "../routing/schemas/responses/getGroupBeatingsResponse";
import { getGroupChoresSuccessSchema } from "../routing/schemas/responses/getGroupChoresResponse";
import { getGroupUsersSuccessSchema } from "../routing/schemas/responses/getGroupUsersResponse";
import { getGroupsSuccessSchema } from "../routing/schemas/responses/getGroupsResponse";
import { inviteGroupSuccessSchema } from "../routing/schemas/responses/inviteGroupResponse";
import { searchUsersSuccessSchema } from "../routing/schemas/responses/searchUsersResponse";
import { unprocessableEntitySchema } from "../routing/schemas/responses/common";
import { nowJst, toIsoJstFromDate, toUtcDayRangeFromJstDateString } from "../util/datetime";

const db = getDb();
const groupRepository = new GroupRepository(db);
const choreRepository = new ChoreRepository(db);
const choreBeatingsRepository = new ChoreBeatingsRepository(db);
const choreBeatingLikesRepository = new ChoreBeatingLikesRepository(db);
const userRepository = new UserRepository(db);

export const getGroupsController = async (c: Context, requesterId: string) => {
  const groups = await groupRepository.findAllWithMemberCount(requesterId);

  const response = getGroupsSuccessSchema.parse({
    groups: groups.map((group) => ({
      id: group.id,
      name: group.name,
      image: group.image,
      member_count: group.memberCount,
      invited_count: group.invitedCount,
      is_invited: group.isInvited,
    })),
  });

  return c.json(response, 200);
};

export const getGroupChoresController = async (c: Context, groupId: string) => {
  const chores = await choreRepository.findByGroupId(groupId);

  const response = getGroupChoresSuccessSchema.parse(
    chores.map((chore) => ({
      id: chore.id,
      name: chore.name,
      icon_code: chore.iconCode,
    })),
  );

  return c.json(response, 200);
};

export const getGroupUsersController = async (c: Context, requesterId: string, groupId: string) => {
  const auth = await requireGroupMember(c, groupRepository, requesterId, groupId);
  if (!auth.ok) return auth.response;
  const users = auth.members;

  const response = getGroupUsersSuccessSchema.parse(
    users.map((user) => ({
      id: user.id,
      name: user.name ?? null,
      image_url: user.image ?? null,
      is_owner: user.isOwner,
      is_invited: user.acceptedAt === null,
    })),
  );

  return c.json(response, 200);
};

export const getGroupBeatingsController = async (
  c: Context,
  requesterId: string,
  groupId: string,
  date: string,
) => {
  const auth = await requireGroupMember(c, groupRepository, requesterId, groupId);
  if (!auth.ok) return auth.response;

  const dateRange = toUtcDayRangeFromJstDateString(date);
  if (!dateRange) {
    const body = unprocessableEntitySchema.parse({
      status: 422,
      errors: [
        { field: "date", message: "date は YYYY-MM-DD または YYYY/MM/DD 形式で指定してください" },
      ],
    });
    return c.json(body, 422);
  }

  const groups = await choreBeatingsRepository.findTimelineByGroupIdAndUtcRange(groupId, {
    startUtc: dateRange.startUtc,
    endUtc: dateRange.endUtc,
  });

  const response = getGroupBeatingsSuccessSchema.parse(
    groups.map((group) => ({
      hour: group.hour,
      items: group.items.map((item) => ({
        beating_id: item.beatingId,
        beated_at: toIsoJstFromDate(item.beatedAt),
        chore_id: item.choreId,
        chore_name: item.choreName,
        icon_code: item.iconCode,
        thanks_count: item.thanksCount,
        messages: item.messages.map((message) => ({
          id: message.id,
          user_id: message.userId,
          user_name: message.userName ?? null,
          img_url: message.imgUrl ?? null,
          main_message: message.mainMessage,
          description_message: message.descriptionMessage ?? null,
        })),
        user_id: item.userId,
        user_name: item.userName ?? null,
        img_url: item.imgUrl ?? null,
      })),
    })),
  );
  console.log(response);

  return c.json(response, 200);
};

export const searchUsersController = async (c: Context, groupId: string, email: string) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const body = searchUsersSuccessSchema.parse({ users: [] });
    return c.json(body, 200);
  }

  const belongings = await groupRepository.findUsersByGroupId(groupId);
  const belonging = belongings.find((member) => member.id === user.id);
  const isInvited = belonging !== undefined && belonging.acceptedAt === null;

  const body = searchUsersSuccessSchema.parse({
    users: [
      {
        id: user.id,
        name: user.name ?? null,
        email: user.email ?? null,
        image_url: user.image ?? null,
        is_invited_or_belonging: isInvited || belonging !== undefined,
      },
    ],
  });

  return c.json(body, 200);
};

export const inviteGroupController = async (
  c: Context,
  requesterId: string,
  groupId: string,
  userId: string,
) => {
  const now = nowJst();
  // 招待リクエスト送信者がグループ所属者であることを確認(承諾済みのみ)
  const auth = await requireGroupMember(c, groupRepository, requesterId, groupId);
  if (!auth.ok) return auth.response;
  const belongings = auth.members;
  const belonging = belongings.find((member) => member.id === userId);
  if (belonging) {
    const body = unprocessableEntitySchema.parse({
      status: 422,
      errors: [{ field: "user_id", message: "既に加入または招待しています" }],
    });
    return c.json(body, 422);
  }

  await groupRepository.addBelonging({
    groupId,
    userId,
    createdAt: now,
    acceptedAt: null,
  });

  const response = inviteGroupSuccessSchema.parse({ status: 201 });
  return c.json(response, 201);
};

export const acceptGroupInvitationController = async (
  c: Context,
  userId: string,
  groupId: string,
) => {
  const now = nowJst();
  const belongings = await groupRepository.findUsersByGroupId(groupId);
  const belonging = belongings.find((member) => member.id === userId);
  // 他のユーザーがリクエストしてきている場合でも422を返す仕様（手抜き）
  if (!belonging || belonging.acceptedAt !== null) {
    const body = unprocessableEntitySchema.parse({
      status: 422,
      errors: [{ field: "group_id", message: "招待が存在しません" }],
    });
    return c.json(body, 422);
  }

  await groupRepository.updateBelonging({
    groupId,
    userId,
    createdAt: now,
    acceptedAt: now,
  });

  return c.body(null, 204);
};

export const denyGroupInvitationController = async (
  c: Context,
  userId: string,
  groupId: string,
) => {
  const belongings = await groupRepository.findUsersByGroupId(groupId);
  const belonging = belongings.find((member) => member.id === userId);
  if (!belonging || belonging.acceptedAt !== null) {
    const body = unprocessableEntitySchema.parse({
      status: 422,
      errors: [{ field: "group_id", message: "招待が存在しません" }],
    });
    return c.json(body, 422);
  }

  await groupRepository.deleteBelonging(userId, groupId);

  return c.body(null, 204);
};

export const createGroupController = async (c: Context, requesterId: string, name: string) => {
  const now = nowJst();

  const groupId = crypto.randomUUID();
  const group = {
    id: groupId,
    name,
    ownerId: requesterId,
    image: null,
    createdAt: now,
    updatedAt: now,
  };
  // 作成者なので所属済みとして登録するためのデータ
  const belonging = {
    groupId,
    userId: requesterId,
    createdAt: now,
    acceptedAt: now,
  };

  try {
    await groupRepository.create(group);
    // 作成者を所属済みとして登録
    await groupRepository.addBelonging(belonging);
  } catch (error) {
    // neon-http ドライバはトランザクション非対応のため、失敗時は手動で作成済みグループを削除して整合性を保つ
    await groupRepository.deleteById(group.id).catch(() => {
      // 二次的な削除失敗はログだけにとどめる（ここでは throw せず元のエラーを優先）
      console.error("Failed to rollback group creation", group.id);
    });
    throw error;
  }
  // master_chores を元に初期家事を作成（グループ作成のトランザクションと同じとは言えないので、try-catchの外に書いている）
  await choreRepository.addGroupChoresFromMaster(groupId);

  // POST 成功のみを伝える。ステータスを明示したレスポンスを返す。
  const response = createGroupSuccessSchema.parse({ status: 201 });
  return c.json(response, 201);
};

export const createChoreBeatingController = async (
  c: Context,
  requesterId: string,
  groupId: string,
  choreId: number,
  beatedAt: Date,
) => {
  const auth = await requireGroupMember(c, groupRepository, requesterId, groupId);
  if (!auth.ok) return auth.response;

  const now = nowJst();
  await choreBeatingsRepository.create({
    groupId,
    choreId,
    userId: requesterId,
    likeCount: 0,
    beatedAt,
    createdAt: now,
    updatedAt: now,
  });

  const response = createChoreBeatingSuccessSchema.parse({ status: 201 });
  return c.json(response, 201);
};

export const createChoreBeatingLikeController = async (
  c: Context,
  requesterId: string,
  groupId: string,
  beatingId: number,
) => {
  const auth = await requireGroupMember(c, groupRepository, requesterId, groupId);
  if (!auth.ok) return auth.response;

  const now = nowJst();
  await choreBeatingLikesRepository.addLikeAndIncrementCount(
    groupId,
    requesterId,
    beatingId,
    now,
    now,
  );

  const response = createChoreBeatingLikeSuccessSchema.parse({ status: 201 });
  return c.json(response, 201);
};
