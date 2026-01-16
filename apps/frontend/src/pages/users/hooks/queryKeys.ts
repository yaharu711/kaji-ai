export const GROUPS_QUERY_KEY = ["groups"] as const;
export const GROUP_USERS_QUERY_KEY = (groupId: string) => ["groups", groupId, "users"] as const;
