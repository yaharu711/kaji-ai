import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-24HARjMb.js";import{u as a}from"./useErrorModal-QbZRJ3ia.js";import"./iframe-Cb-SkDV4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BtCai76y.js";import"./index-jLTPr6cb.js";import"./index-BKJSiE1y.js";import"./Combination-yRFr98uK.js";import"./index-DDGXdEE0.js";import"./index-BbHZ9j1j.js";import"./x-CTIx35C6.js";import"./createLucideIcon-JTP2FxnL.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
