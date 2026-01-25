import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-Cbgge5Sq.js";import{u as a}from"./useErrorModal-BK7bjuk2.js";import"./iframe-C3NN4Cl6.js";import"./preload-helper-PPVm8Dsz.js";import"./index-2mxY30W4.js";import"./index-Br9iXg45.js";import"./index-QldZMTvM.js";import"./Combination-f0JZPTuo.js";import"./index-DLtRkDdf.js";import"./index-DRxynnt4.js";import"./x-Um0zTedi.js";import"./createLucideIcon-BuCsD1FM.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
