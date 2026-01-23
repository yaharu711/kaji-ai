import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-CsLX-6Kt.js";import{u as a}from"./useErrorModal-CLurXXCg.js";import"./iframe-DGhW5j6I.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Chw0XhmN.js";import"./index-btNIw1YH.js";import"./index-BlPICMQo.js";import"./Combination-BmnC0FQM.js";import"./index-Bq3FzM8x.js";import"./index-Cn1zjjBx.js";import"./x-Cu-K5Hx_.js";import"./createLucideIcon-Vgy4EW_V.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
