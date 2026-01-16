import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-DswZbPTG.js";import{u as a}from"./useErrorModal-Cziy9Epk.js";import"./iframe-CQAHswoE.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DiuGybjS.js";import"./index-Bk3KrenO.js";import"./index-oZ7tAS0B.js";import"./index-BkoKhjv2.js";import"./index-BLoDi4PE.js";import"./x-Bs3Zz3Bs.js";import"./createLucideIcon-DepvThTw.js";const n="_helper_13cpv_1",i={helper:n};function m(){const{showError:t}=a();return o.jsx("div",{className:i.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const g={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const D=["Default"];export{r as Default,D as __namedExportsOrder,g as default};
