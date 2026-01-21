import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-Xd5tOYHG.js";import{u as a}from"./useErrorModal-CrTqqVkP.js";import"./iframe-DxGbP0-9.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Bd97GU_v.js";import"./index-BzAMpDWK.js";import"./index-CAFPQBOE.js";import"./Combination-CR-jTGjv.js";import"./index-Rb89O4Qn.js";import"./index-B_8gQvYz.js";import"./x-DxJV4PI0.js";import"./createLucideIcon-CgzfMX5A.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
