export const groupChoreIconCodes = [
  "dish-wash",
  "cleaning",
  "laundry",
  "cooking",
  "trash",
  "shopping",
  "bath-cleaning",
  "toilet-cleaning",
] as const;

export type GroupChoreIconCode = (typeof groupChoreIconCodes)[number];

const groupChoreIconCodeSet = new Set<string>(groupChoreIconCodes);

export const isGroupChoreIconCode = (value: string): value is GroupChoreIconCode => {
  return groupChoreIconCodeSet.has(value);
};
