import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-De2_V-S8.js";import{u as a}from"./useErrorModal-CP7S3eTA.js";import"./iframe-CdLyeb6m.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BisnGRS6.js";import"./index-COAzQ30d.js";import"./index-BKyx4Nv4.js";import"./Combination-CUcpsVkp.js";import"./index-BvwbJulw.js";import"./index-5yzgPyqn.js";import"./x-Db6nCcWx.js";import"./createLucideIcon-B-yWAdHL.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
