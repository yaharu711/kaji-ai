import{j as e}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as o}from"./index-BbgNWcPO.js";import{u as a}from"./useErrorModal-XKX_-mvW.js";import"./iframe-1XqFOf6O.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BDOVIBqh.js";import"./index-DjFYXPrv.js";import"./index-BtXqq22z.js";import"./index-aftx0WHr.js";import"./x-BmK9XW0G.js";import"./createLucideIcon-D0gNjZIx.js";const n="_helper_13cpv_1",i={helper:n};function m(){const{showError:t}=a();return e.jsx("div",{className:i.helper,children:e.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const _={title:"components/ErrorModalProvider",component:o,parameters:{layout:"centered"}},r={args:{children:null},render:()=>e.jsx(o,{children:e.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const g=["Default"];export{r as Default,g as __namedExportsOrder,_ as default};
