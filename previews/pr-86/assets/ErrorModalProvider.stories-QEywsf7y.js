import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-CbJwY2mU.js";import{u as a}from"./useErrorModal-Cm8aiKH9.js";import"./iframe-BLFO1RRu.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BX8-j23t.js";import"./index-BBnUwgBs.js";import"./index-CaCDB5sZ.js";import"./Combination-COcXce3b.js";import"./index-ByQ9Aye9.js";import"./index-CIUX_j9b.js";import"./x-SBTB_AQl.js";import"./createLucideIcon-DclISKwn.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
