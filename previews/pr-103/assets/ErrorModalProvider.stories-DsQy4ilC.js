import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-D6Islurq.js";import{u as a}from"./useErrorModal-BOeZL9JD.js";import"./iframe-CzEKuu6w.js";import"./preload-helper-PPVm8Dsz.js";import"./index-akRasNDz.js";import"./index-DCWUsKyp.js";import"./index-B_5dDG7n.js";import"./Combination-Dy89-SZy.js";import"./index-DosEVVwU.js";import"./index-CTZRCsn1.js";import"./x-B_fH8ztz.js";import"./createLucideIcon-DNRbNCS8.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
