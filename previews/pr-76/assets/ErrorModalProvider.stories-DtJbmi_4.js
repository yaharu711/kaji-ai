import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-CUeGpqXW.js";import{u as a}from"./useErrorModal-ZFFJB5uO.js";import"./iframe-BFpUt2Ft.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BHt2brhR.js";import"./index-rUXEnWgN.js";import"./index-CwYQVRRj.js";import"./Combination-BBmQK547.js";import"./index-DgJt2n1s.js";import"./index-D7NNeRh7.js";import"./x-MIf2ZtXp.js";import"./createLucideIcon-Bv2i0X2G.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
