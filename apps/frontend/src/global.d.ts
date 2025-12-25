// Storybook (tsconfig.node.json 参照) で CSS を直接 import した際に
// 「型宣言がない」と TS2307 が出るため、CSS / CSS Modules の型をここで宣言している。
// 先に .module.css を定義しておくことで、モジュール CSS の default export が string にならないようにする。

declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.css" {
  const css: string;
  export default css;
}
