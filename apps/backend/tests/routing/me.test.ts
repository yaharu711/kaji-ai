import { describe, expect, it } from "vitest";
import { testClient } from "hono/testing";

import { AUTH_USER } from "../helpers/mockAuth";
import app, { RoutingApp } from "../../src/routing/index";

describe("ログイン中ユーザーの情報取得ができること", () => {
  const client = testClient<RoutingApp>(app);

  it("returns authenticated user", async () => {
    const res = await client.api.me.$get();

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      user: {
        id: AUTH_USER.id,
        name: AUTH_USER.name,
      },
    });
  });
});
