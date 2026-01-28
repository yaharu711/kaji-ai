import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-CWBWZVaD.js";import{u as a}from"./useErrorModal-BudLgZJ7.js";import"./iframe-BLeop2BN.js";import"./preload-helper-PPVm8Dsz.js";import"./index-zRU9B44r.js";import"./index-Bmy1V-2l.js";import"./index-DZ9YoGCn.js";import"./Combination-DPgk9jB4.js";import"./index-DPQhbLKF.js";import"./index-BLbVwHrn.js";import"./x-B0TNDQ89.js";import"./createLucideIcon-BnfNbNvM.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
