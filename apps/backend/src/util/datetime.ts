import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import type { DateRangeUtcDto } from "../dtos/dateRangeUtc";

dayjs.extend(utc);
dayjs.extend(timezone);

const JST_TIMEZONE = "Asia/Tokyo";

export const nowJst = () => dayjs().tz(JST_TIMEZONE).toDate();

// 時刻の運用的にJST固定のため、DBから取得したタイムスタンプ文字列をJSTとして解釈する
// kaiji-ai/.codex/skills/datetime-handling/SKILL.md
export const fromDbTimestampJst = (value: string) => {
  try {
    return dayjs.tz(value, JST_TIMEZONE);
  } catch {
    return null;
  }
};

export const fromDbTimestampUtc = (value: string) => {
  try {
    const parsed = dayjs.utc(value);
    if (!parsed.isValid()) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const toIsoJst = (value: dayjs.Dayjs) => value.tz(JST_TIMEZONE).format();

export const toIsoJstFromDate = (value: Date) => toIsoJst(dayjs(value));

export const fromIsoJst = (value: string) => {
  const parsed = dayjs(value);
  if (!parsed.isValid()) return null;
  return parsed.tz(JST_TIMEZONE);
};

const dateOnlyWithDashRegex = /^\d{4}-\d{2}-\d{2}$/;
const dateOnlyWithSlashRegex = /^\d{4}\/\d{2}\/\d{2}$/;

const toJstDateOnly = (value: string) => {
  if (dateOnlyWithDashRegex.test(value)) {
    return dayjs.tz(value, "YYYY-MM-DD", JST_TIMEZONE);
  }
  if (dateOnlyWithSlashRegex.test(value)) {
    return dayjs.tz(value, "YYYY/MM/DD", JST_TIMEZONE);
  }
  return null;
};

// YYYY-MM-DD または YYYY/MM/DD 形式の日付文字列（一応ISO対応）を JST として解釈し、その日の UTC 範囲を返す
export const toUtcDayRangeFromJstDateString = (value: string): DateRangeUtcDto | null => {
  const baseDate = toJstDateOnly(value) ?? fromIsoJst(value);
  if (!baseDate) return null;
  const startJst = baseDate.startOf("day");
  const endJst = startJst.add(1, "day");
  return {
    startUtc: startJst.utc().toDate(),
    endUtc: endJst.utc().toDate(),
  };
};
