import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-B4A9-jNh.js";import{u as a}from"./useErrorModal-CAX1NKQm.js";import"./iframe-EaA_ffCS.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DaAkbIYL.js";import"./index-Cjt3dBMB.js";import"./index-FwC8WnoZ.js";import"./index-DE9sEHyg.js";import"./index-CW7T4woV.js";import"./x-CZ2eib4q.js";import"./createLucideIcon-D4okK89h.js";const n="_helper_13cpv_1",i={helper:n};function m(){const{showError:t}=a();return o.jsx("div",{className:i.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const g={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const D=["Default"];export{r as Default,D as __namedExportsOrder,g as default};
