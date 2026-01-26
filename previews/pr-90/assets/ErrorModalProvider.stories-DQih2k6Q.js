import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-VAy3DuGr.js";import{u as a}from"./useErrorModal-CtM1pis8.js";import"./iframe-CqmAOgwB.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DBnaVnGZ.js";import"./index-HVY9k4b5.js";import"./index-B8rmwyfO.js";import"./Combination-D4LCclsS.js";import"./index-2o8Hp5WQ.js";import"./index-BRSuJxM7.js";import"./x-BK8Sr4_3.js";import"./createLucideIcon-ap7CA1ry.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
