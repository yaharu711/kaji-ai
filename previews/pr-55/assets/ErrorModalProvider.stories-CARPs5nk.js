import{j as e}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as o}from"./index-BN4TW_dm.js";import{u as a}from"./useErrorModal-DT8T8vOY.js";import"./iframe-C36v3DM9.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BNCSe_Jo.js";import"./index-TABnQwly.js";import"./index-Ctg3TE_s.js";import"./index-pl7ny82a.js";import"./x-D1mI7k4K.js";import"./createLucideIcon-cWtPBC3s.js";const n="_helper_13cpv_1",i={helper:n};function m(){const{showError:t}=a();return e.jsx("div",{className:i.helper,children:e.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const _={title:"components/ErrorModalProvider",component:o,parameters:{layout:"centered"}},r={args:{children:null},render:()=>e.jsx(o,{children:e.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const g=["Default"];export{r as Default,g as __namedExportsOrder,_ as default};
