import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-DDMJ_bAG.js";import{u as a}from"./useErrorModal-CyEPm0RV.js";import"./iframe-B61RhktP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DT_5JPia.js";import"./index-C3T5o2-u.js";import"./index-DQerE2E2.js";import"./Combination-FWGW_GM-.js";import"./index-B3M11CRv.js";import"./index-B2IWxOko.js";import"./x-Bh9KsW4z.js";import"./createLucideIcon-D_ImukJ4.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
