export const GROUP_CHORES_QUERY_KEY = (groupId: string) => ["groups", groupId, "chores"] as const;
export const GROUP_BEATINGS_QUERY_KEY = (groupId: string, date: string) =>
  ["groups", groupId, "beatings", date] as const;
