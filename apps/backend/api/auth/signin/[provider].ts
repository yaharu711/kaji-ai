// /api/auth/signin/:provider を Edge Runtime で entry.edge に委譲するブリッジ
export const config = { runtime: "edge" };
export { default } from "../../../src/entry.edge";
