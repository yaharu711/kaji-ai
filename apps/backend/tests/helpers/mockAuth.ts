import type { AuthConfig } from "@auth/core";
import { vi } from "vitest";

/**
 * 認証ミドルウェアの verifyAuth をモックして常に通過させる。
 * 他のエクスポートは実装そのままを利用する。
 */
vi.mock("@hono/auth-js", async () => {
  const actual = await vi.importActual<typeof import("@hono/auth-js")>(
    "@hono/auth-js",
  );

  return {
    ...actual,
    verifyAuth: () => (c, next) => {
      c.set("authUser", {
        session: { user: { id: "test-user", name: "Test User" } },
      });
      return next();
    },
  };
});

/**
 * ルーティングで参照している auth.config.ts は環境変数を読むため、
 * CI など .env が無い環境でもテストできるようスタブ構成を注入する。
 */
const mockAuthConfig: AuthConfig = {
  adapter: undefined,
  secret: "test-secret",
  basePath: "/auth",
  providers: [],
  session: {
    strategy: "jwt",
    maxAge: 60,
  },
  callbacks: {},
};

vi.mock("../../src/auth.config", () => ({
  __esModule: true,
  default: mockAuthConfig,
  authConfig: mockAuthConfig,
}));

// テストごとに副作用インポートするだけでモックを適用できるようにする。
export {};
