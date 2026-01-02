import { hc } from "hono/client";

import type { RoutingApp } from "../../../../backend/src/routing";
import type { GetGroupsResponse } from "../../../../backend/src/routing/schemas/responses/getGroupsResponse";

const backendOrigin = import.meta.env.VITE_BACKEND_ORIGIN.trim();

const client = hc<RoutingApp>(backendOrigin, {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: "include",
    }),
});

const groupsApi = client.api.groups;

export const fetchGroups = async (): Promise<GetGroupsResponse> => {
  const res = await groupsApi.$get();

  if (!res.ok) {
    throw new Error("グループ一覧の取得に失敗しました");
  }

  return res.json();
};
