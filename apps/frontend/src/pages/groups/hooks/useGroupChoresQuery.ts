import { useQuery } from "@tanstack/react-query";

import { fetchGroupChores } from "../../../api/groups";
import { GROUP_CHORES_QUERY_KEY } from "./queryKey";

export const useGroupChoresQuery = (groupId?: string) => {
  const resolvedGroupId = groupId ?? "";

  return useQuery({
    queryKey: GROUP_CHORES_QUERY_KEY(resolvedGroupId),
    queryFn: () => fetchGroupChores({ groupId: resolvedGroupId }),
    enabled: Boolean(groupId),
  });
};
