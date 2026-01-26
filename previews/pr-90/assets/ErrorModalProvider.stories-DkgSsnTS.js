import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-NrDsVHuu.js";import{u as a}from"./useErrorModal-DhrqD3Yq.js";import"./iframe-BHN6nb68.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CaJN3g9p.js";import"./index-o31PsOQI.js";import"./index-31ngtbbm.js";import"./Combination-D33rEpeJ.js";import"./index-2sN9dEEK.js";import"./index-D2_grBih.js";import"./x-C6v3R3BQ.js";import"./createLucideIcon-Dgh9IdpN.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
