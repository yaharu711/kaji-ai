import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-D5F3wSSw.js";import{u as a}from"./useErrorModal-DbChiJ0R.js";import"./iframe-DDVx_-k4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DojLltUI.js";import"./index-CI-Rboc4.js";import"./index-CvlzSviq.js";import"./Combination-CqIPJpmR.js";import"./index-Do906N4c.js";import"./index-D_oct1RB.js";import"./x-Bv0QHQGS.js";import"./createLucideIcon-jz6_SdES.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
