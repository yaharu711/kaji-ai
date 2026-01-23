import type { Context } from "hono";

import type { GroupUserDto } from "../dtos/group";
import type { GroupRepository } from "../repositories/group.repository";
import { forbiddenSchema } from "../routing/schemas/responses/common";

type RequireGroupMemberOptions = {
  allowInvited?: boolean;
};

type RequireGroupMemberSuccess = {
  ok: true;
  members: GroupUserDto[];
  belonging: GroupUserDto;
};

type RequireGroupMemberFailure = {
  ok: false;
  response: Response;
};

export const requireGroupMember = async (
  c: Context,
  groupRepository: GroupRepository,
  requesterId: string,
  groupId: string,
  options: RequireGroupMemberOptions = {},
): Promise<RequireGroupMemberSuccess | RequireGroupMemberFailure> => {
  const members = await groupRepository.findUsersByGroupId(groupId);
  const belonging = members.find((member) => member.id === requesterId);
  const allowInvited = options.allowInvited ?? false;

  if (!belonging || (!allowInvited && belonging.acceptedAt === null)) {
    const body = forbiddenSchema.parse({ status: 403, message: "Forbidden" });
    return { ok: false, response: c.json(body, 403) };
  }

  return { ok: true, members, belonging };
};
