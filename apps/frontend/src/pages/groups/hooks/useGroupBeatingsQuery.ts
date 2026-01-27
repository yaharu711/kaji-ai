import { useQuery } from "@tanstack/react-query";

import { fetchGroupBeatings } from "../../../api/groups";
import type { GetGroupBeatingsResponse } from "@kaiji-ai/backend/contracts";
import type { BeatingGroup } from "../types/beatings";
import type { ChoreIconCode } from "../../../constants/chores";
import { getJstDateString, nowJst } from "../../../util/datetime";
import { GROUP_BEATINGS_QUERY_KEY } from "./queryKey";

const formatUserName = (name: string | null) => {
  const trimmed = name?.trim() ?? "";
  return trimmed || "名前";
};

const mapBeatingGroups = (
  timeline: GetGroupBeatingsResponse,
  groupId: string,
  date: string,
): BeatingGroup[] => {
  return timeline.map((group) => ({
    timeLabel: group.hour,
    items: group.items.map((item) => {
      const messages = item.messages.map((message) => ({
        id: String(message.id),
        userName: formatUserName(message.user_name),
        userImageUrl: message.img_url,
        mainMessage: message.main_message,
        describeMessage: message.description_message ?? undefined,
      }));
      return {
        id: String(item.beating_id),
        beatingId: item.beating_id,
        groupId,
        date,
        choreIconCode: item.icon_code as ChoreIconCode,
        choreName: item.chore_name,
        userName: formatUserName(item.user_name),
        userImageUrl: item.img_url,
        likeCount: item.thanks_count,
        likedByMe: item.liked_by_me,
        messagedByMe: item.messaged_by_me,
        commentCount: messages.length,
        messages,
      };
    }),
  }));
};

export const useGroupBeatingsQuery = (groupId?: string, date?: string) => {
  const resolvedGroupId = groupId ?? "";
  const resolvedDate = date ?? getJstDateString(nowJst());

  return useQuery({
    queryKey: GROUP_BEATINGS_QUERY_KEY(resolvedGroupId, resolvedDate),
    queryFn: () => fetchGroupBeatings({ groupId: resolvedGroupId, date: resolvedDate }),
    select: (timeline) => mapBeatingGroups(timeline, resolvedGroupId, resolvedDate),
    enabled: Boolean(groupId),
  });
};
