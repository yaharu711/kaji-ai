import { useQuery } from "@tanstack/react-query";

import { GROUP_USERS_QUERY_KEY } from "../../users/hooks/queryKeys";
import { fetchGroupUsers } from "../../../api/groups";

export const useGroupUsersQuery = (groupId?: string) => {
  const resolvedGroupId = groupId ?? "";

  return useQuery({
    queryKey: GROUP_USERS_QUERY_KEY(resolvedGroupId),
    queryFn: () => fetchGroupUsers({ groupId: resolvedGroupId }),
    enabled: Boolean(groupId),
  });
};
