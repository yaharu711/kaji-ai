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

// テストごとに副作用インポートするだけでモックを適用できるようにする。
export {}; 
