import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-DQGJEeBx.js";import{u as a}from"./useErrorModal-BMMVX3A6.js";import"./iframe-Bbt4Wxma.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BhQYd7LM.js";import"./index-vbJ725iN.js";import"./index-BYjVP3_d.js";import"./Combination-B_N3T7D5.js";import"./index-CDlpSLqt.js";import"./index-DD0GCNWP.js";import"./x-bvU88YLp.js";import"./createLucideIcon-B6OQNWfi.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
