import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const JST_TIMEZONE = "Asia/Tokyo";

export const nowJst = () => dayjs().tz(JST_TIMEZONE);

// 時刻の運用的にJST固定のため、DBから取得したタイムスタンプ文字列をJSTとして解釈する
// kaiji-ai/.codex/skills/datetime-handling/SKILL.md
export const fromDbTimestampJst = (value: string) => {
  try {
    return dayjs.tz(value, JST_TIMEZONE);
  } catch {
    return null;
  }
};

export const toIsoJst = (value: dayjs.Dayjs) => value.tz(JST_TIMEZONE).format();
