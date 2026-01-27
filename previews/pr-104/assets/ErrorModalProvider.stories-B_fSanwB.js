import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-D2pXKBO8.js";import{u as a}from"./useErrorModal-vbdt33B6.js";import"./iframe-M9O5mXHc.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CWdXI3cp.js";import"./index-YCkUdgM9.js";import"./index-ub8jn3vV.js";import"./Combination-CGYK_wYF.js";import"./index-Cm5NKQVv.js";import"./index-K308fw13.js";import"./x-uyYY1H80.js";import"./createLucideIcon-B_rlYIdZ.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
