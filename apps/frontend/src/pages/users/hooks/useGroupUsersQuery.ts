import { useQuery } from "@tanstack/react-query";

import { GROUP_USERS_QUERY_KEY } from "./queryKeys";
import { fetchGroupUsers } from "../../../api/groups";

export const useGroupUsersQuery = (groupId: string) =>
  useQuery({
    queryKey: GROUP_USERS_QUERY_KEY(groupId),
    queryFn: () => fetchGroupUsers({ groupId }),
  });
