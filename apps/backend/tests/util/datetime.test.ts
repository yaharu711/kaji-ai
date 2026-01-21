import { describe, expect, it } from "vitest";

import { fromDbTimestampJst, nowJst, toIsoJst } from "../../src/util/datetime";

describe("datetime utils", () => {
  it("nowJst はJSTの現在時刻を返す", () => {
    const now = nowJst();
    expect(now.format("Z")).toBe("+09:00");
  });

  it("fromDbTimestampJst はタイムスタンプ文字列をJSTとして解釈する", () => {
    const value = "2026-01-21 12:34:56";
    const dt = fromDbTimestampJst(value);

    expect(dt?.format("YYYY-MM-DD HH:mm:ss")).toBe("2026-01-21 12:34:56");
    expect(dt?.format("Z")).toBe("+09:00");
  });

  it("fromDbTimestampJst は不正な日付文字列の場合は null を返す", () => {
    const dt = fromDbTimestampJst("invalid-date");
    expect(dt).toBeNull();
  });

  it("toIsoJst はJSTオフセット付きのISO8601を返す", () => {
    const dt = fromDbTimestampJst("2026-01-21 08:00:00");
    if (!dt) throw new Error("Invalid test date");
    const iso = toIsoJst(dt);

    expect(iso).toBe("2026-01-21T08:00:00+09:00");
  });
});
