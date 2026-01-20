import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-D-y9ETYx.js";import{u as a}from"./useErrorModal-Dc-YCxKO.js";import"./iframe-DZjf7UMt.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BgbQFApT.js";import"./index-D9l13YAH.js";import"./index-BAB8lXp-.js";import"./Combination-D3nE0ONH.js";import"./index-DDUmX3yk.js";import"./index-CtxxnvYy.js";import"./x-Bk0LUWnj.js";import"./createLucideIcon-RAB8abvx.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
