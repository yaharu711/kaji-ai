import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-DFlShcHf.js";import{u as a}from"./useErrorModal-BBVU1GB_.js";import"./iframe-CrfA4v1k.js";import"./preload-helper-PPVm8Dsz.js";import"./index-7bW83pQ7.js";import"./index-B696WGki.js";import"./index-D4r5PqD7.js";import"./Combination-CdK6pkce.js";import"./index-DQltsLOr.js";import"./index-CnIBQnPr.js";import"./x-Cf1Qzys0.js";import"./createLucideIcon-B96bngSF.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
