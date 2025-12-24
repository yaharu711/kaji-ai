import { describe, expect, it } from "vitest";
import { testClient } from "hono/testing";

import "../helpers/mockAuth";
import app, { RoutingApp } from "../../src/routing/index";

describe("helloメッセージが取得できること", () => {
  // <RoutingApp>の部分でルーティングアプリケーションの型を指定することで、型補完が効く
  const client = testClient<RoutingApp>(app);

  it("GET /api/", async () => {
    // ちゃんとルーティングファイルでnew Hono().get("/", ...)とチェインして(RPC)定義しないと、
    // 型補完が効かなかったので注意→https://hono.dev/docs/guides/best-practices#if-you-want-to-use-rpc-features
    const res = await client.api.$get();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: "Hello World" });
  });
});

// 以下の書き方もできるけど、パスとかリクエストメソッドなど直に書くため、リファクタリング耐性が少し落ちる
// また、どのようなパスのテストかの型補完も効くため、上記の方が望ましいかな

// import hello from "../src/routing/hello";
// describe("GET /hello", () => {
//   it("returns hello message", async () => {
//     const response = await hello.request("/", {
//       method: "GET",
//     });
//     expect(response.status).toBe(200);

//     const body = await response.json();
//     expect(body).toEqual({ message: "Hello World" });
//   });
// });
