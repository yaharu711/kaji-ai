import { useQuery } from "@tanstack/react-query";

import { GROUPS_QUERY_KEY } from "./queryKeys";
import { fetchGroups } from "../../../api/groups";

export const useGroupsQuery = () =>
  useQuery({
    queryKey: GROUPS_QUERY_KEY,
    queryFn: fetchGroups,
  });
