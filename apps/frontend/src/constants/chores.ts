import type { GetGroupChoresResponse } from "@kaiji-ai/backend/contracts";

// [number]によりGetGroupChoresResponseが配列型なので要素の型を取得し、そこからicon_codeプロパティの型を取得している
type BackendChoreIconCode = GetGroupChoresResponse[number]["icon_code"];

export const CHORE_ICON_MAP = {
  "dish-wash": "🍽️",
  cleaning: "🧹",
  laundry: "👕",
  cooking: "🍳",
  trash: "🗑️",
  shopping: "🛒",
  "bath-cleaning": "🛁",
  "toilet-cleaning": "🚽",
} as const satisfies Record<BackendChoreIconCode, string>;

export type ChoreIconCode = keyof typeof CHORE_ICON_MAP;

export const getChoreIcon = (iconCode: ChoreIconCode): string => {
  return CHORE_ICON_MAP[iconCode];
};
