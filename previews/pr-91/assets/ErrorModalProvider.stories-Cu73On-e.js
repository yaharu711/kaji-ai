import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-DlU45e9t.js";import{u as a}from"./useErrorModal-HVGVroYN.js";import"./iframe-DS2ubQzj.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DRgTK0Dz.js";import"./index-Bjlp2PT-.js";import"./index-Bs8G1nUV.js";import"./Combination-CXaePgN3.js";import"./index-Dfuz3Veq.js";import"./index-Bx29Ftz7.js";import"./x-BWDwh0mW.js";import"./createLucideIcon-BPQngdg8.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
