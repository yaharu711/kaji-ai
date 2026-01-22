import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-dFNQfvre.js";import{u as a}from"./useErrorModal-Bzm-8-Mb.js";import"./iframe-BIXnsUXP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B6h3hAw4.js";import"./index-Bo5DH6qP.js";import"./index-CYyxrB1u.js";import"./Combination-BJpR8FrY.js";import"./index-BGLzJx0P.js";import"./index--eHAZ_1U.js";import"./x-DS45SXvA.js";import"./createLucideIcon-DloSRleo.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
