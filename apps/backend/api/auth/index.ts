// /api/auth 直下用のブリッジ。Edge Runtime で共通エントリを参照させる。
export const config = { runtime: "edge" };
export { default } from "../../src/entry.edge";
