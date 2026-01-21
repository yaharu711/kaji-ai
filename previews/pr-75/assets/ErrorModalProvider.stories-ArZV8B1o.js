import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-CxM2BMeA.js";import{u as a}from"./useErrorModal-Cab9BzkM.js";import"./iframe-CPHJn06c.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DGt8TxmG.js";import"./index-DTlO3yFP.js";import"./index-CBACer3n.js";import"./Combination-CT6mbxoi.js";import"./index-CTzzCg8u.js";import"./index-CHYCHUyr.js";import"./x-Dmh88zpU.js";import"./createLucideIcon-HukRUT_g.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
