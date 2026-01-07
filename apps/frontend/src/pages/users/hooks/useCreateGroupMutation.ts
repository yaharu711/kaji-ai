import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createGroup } from "../../../api/groups";
import { GROUPS_QUERY_KEY } from "./queryKeys";

export const useCreateGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createGroup({ name }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: GROUPS_QUERY_KEY });
    },
  });
};
