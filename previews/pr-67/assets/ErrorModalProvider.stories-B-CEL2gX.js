import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-CmEe2cen.js";import{u as a}from"./useErrorModal-Jk2fYsde.js";import"./iframe-JA4SRQ-V.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BQB_X3u-.js";import"./index-BpGqIsr1.js";import"./index-DCic_CJD.js";import"./index-D9FM-h19.js";import"./index-CQb76jQm.js";import"./x-CIVLDCgJ.js";import"./createLucideIcon-BvVe0lss.js";const n="_helper_13cpv_1",i={helper:n};function m(){const{showError:t}=a();return o.jsx("div",{className:i.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const g={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const D=["Default"];export{r as Default,D as __namedExportsOrder,g as default};
