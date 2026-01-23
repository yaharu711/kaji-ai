import { describe, expect, it } from "vitest";

import {
  fromDbTimestampJst,
  fromDbTimestampUtc,
  fromIsoJst,
  nowJst,
  toIsoJst,
  toIsoJstFromDate,
  toUtcDayRangeFromIsoJstDate,
} from "../../src/util/datetime";

describe("nowJst", () => {
  it("JSTの現在時刻を返す", () => {
    const now = nowJst();
    expect(now).toBeInstanceOf(Date);
    expect(Number.isNaN(now.getTime())).toBe(false);
  });
});

describe("fromDbTimestampJst", () => {
  it("タイムスタンプ文字列をJSTとして解釈する", () => {
    const value = "2026-01-21 12:34:56";
    const dt = fromDbTimestampJst(value);

    expect(dt?.format("YYYY-MM-DD HH:mm:ss")).toBe("2026-01-21 12:34:56");
    expect(dt?.format("Z")).toBe("+09:00");
  });

  it("不正な日付文字列の場合は null を返す", () => {
    const dt = fromDbTimestampJst("invalid-date");
    expect(dt).toBeNull();
  });
});

describe("fromDbTimestampUtc", () => {
  it("タイムスタンプ文字列をUTCとして解釈する", () => {
    const value = "2026-01-21 12:34:56";
    const dt = fromDbTimestampUtc(value);

    expect(dt?.format("YYYY-MM-DD HH:mm:ss")).toBe("2026-01-21 12:34:56");
    expect(dt?.format("Z")).toBe("+00:00");
  });

  it("不正な日付文字列の場合は null を返す", () => {
    const dt = fromDbTimestampUtc("invalid-date");
    expect(dt).toBeNull();
  });
});

describe("toIsoJst", () => {
  it("JSTオフセット付きのISO8601を返す", () => {
    const dt = fromDbTimestampJst("2026-01-21 08:00:00");
    if (!dt) throw new Error("Invalid test date");
    const iso = toIsoJst(dt);

    expect(iso).toBe("2026-01-21T08:00:00+09:00");
  });
});

describe("toIsoJstFromDate", () => {
  it("DateをJSTオフセット付きのISO8601に変換する", () => {
    const iso = toIsoJstFromDate(new Date("2026-01-21T00:00:00Z"));
    expect(iso).toBe("2026-01-21T09:00:00+09:00");
  });
});

describe("fromIsoJst", () => {
  it("ISO8601の日時をDayjsに変換する", () => {
    const dt = fromIsoJst("2026-01-21T08:00:00+09:00");
    expect(dt?.format("YYYY-MM-DD HH:mm:ss")).toBe("2026-01-21 08:00:00");
    expect(dt?.format("Z")).toBe("+09:00");
  });

  it("不正な文字列の場合は null を返す", () => {
    const dt = fromIsoJst("invalid-date");
    expect(dt).toBeNull();
  });
});

describe("toUtcDayRangeFromIsoJstDate", () => {
  it("JST日付からUTCの開始/終了日時を返す", () => {
    const range = toUtcDayRangeFromIsoJstDate("2026-01-21T12:00:00+09:00");
    if (!range) throw new Error("Invalid test date");
    expect(range.startUtc.toISOString()).toBe("2026-01-20T15:00:00.000Z");
    expect(range.endUtc.toISOString()).toBe("2026-01-21T15:00:00.000Z");
  });

  it("不正な文字列の場合は null を返す", () => {
    const range = toUtcDayRangeFromIsoJstDate("invalid-date");
    expect(range).toBeNull();
  });
});
