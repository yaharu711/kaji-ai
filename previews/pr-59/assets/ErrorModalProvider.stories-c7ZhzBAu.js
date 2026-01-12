import{j as e}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as o}from"./index-lnMGvGHH.js";import{u as a}from"./useErrorModal-cBnxXNnl.js";import"./iframe-Dwao1LqP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-P96D7PSG.js";import"./index-B7j-lm3b.js";import"./index-Byk9iE5e.js";import"./index-BX6r50yy.js";import"./x-U98CniBk.js";import"./createLucideIcon-GYo17pSQ.js";const n="_helper_13cpv_1",i={helper:n};function m(){const{showError:t}=a();return e.jsx("div",{className:i.helper,children:e.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const _={title:"components/ErrorModalProvider",component:o,parameters:{layout:"centered"}},r={args:{children:null},render:()=>e.jsx(o,{children:e.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const g=["Default"];export{r as Default,g as __namedExportsOrder,_ as default};
