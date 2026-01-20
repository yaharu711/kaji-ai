import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-CEy3-5Z5.js";import{u as a}from"./useErrorModal-_BHlwwEQ.js";import"./iframe-CVTC7NmS.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BGEEP2ch.js";import"./index-a584p7Rz.js";import"./index-D0M3MBX6.js";import"./index-DpCzjvgm.js";import"./index-moVwi2Uc.js";import"./index-BbZF7t0Y.js";import"./x-BrP4-5PG.js";import"./createLucideIcon-BAFFFu14.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
