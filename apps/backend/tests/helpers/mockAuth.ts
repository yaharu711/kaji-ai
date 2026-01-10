import type { AuthConfig } from "@auth/core";
import { vi } from "vitest";

/**
 * 環境変数を読む util をテスト用にスタブ。
 * - テスト内で process.env をセットしていればそれを優先
 * - 未設定なら一律で `test-${key.toLowerCase()}` を返す
 * 新しい環境変数が増えてもここを触らなくて済むようにする。
 */
const fallbackEnvValue = (key: string) => `test-${key.toLowerCase()}`;

vi.mock("../../src/util/env", () => ({
  __esModule: true,
  default: (key: string) => process.env[key] ?? fallbackEnvValue(key),
  env: (key: string) => process.env[key] ?? fallbackEnvValue(key),
}));

/**
 * 認証ミドルウェアの verifyAuth をモックして常に通過させる。
 * 他のエクスポートは実装そのままを利用する。
 */
export const AUTH_USER = {
  id: "test-user",
  name: "Test User",
} as const;

vi.mock("@hono/auth-js", async () => {
  const actual = await vi.importActual<typeof import("@hono/auth-js")>("@hono/auth-js");

  return {
    ...actual,
    verifyAuth: () => (c, next) => {
      c.set("authUser", {
        session: { user: AUTH_USER },
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
  basePath: "/api/auth",
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
