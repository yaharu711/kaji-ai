import{j as o}from"./jsx-runtime-u17CrQMm.js";import{B as s}from"./index-BKtDPDeF.js";import{E as e}from"./index-RqhJcs5a.js";import{u as a}from"./useErrorModal-BmD3kwiq.js";import"./iframe-BlIUsZfp.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DDKP8LS2.js";import"./index-ruhimC8r.js";import"./index-t4mK3Iqa.js";import"./Combination-TUgz2es3.js";import"./index-BFIMPf54.js";import"./index-fCs6qFsG.js";import"./x-CBQYMu9p.js";import"./createLucideIcon-B_MdN5nv.js";const i="_helper_13cpv_1",n={helper:i};function m(){const{showError:t}=a();return o.jsx("div",{className:n.helper,children:o.jsx(s,{size:"md",radius:"pill",variant:"primary",onClick:()=>{t({title:"検索エラー",message:"サーバーでエラーが発生しました。時間をおいて再度お試しください。"})},children:"エラーモーダルを開く"})})}const D={title:"components/ErrorModalProvider",component:e,parameters:{layout:"centered"}},r={args:{children:null},render:()=>o.jsx(e,{children:o.jsx(m,{})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ErrorModalProvider>
      <Demo />
    </ErrorModalProvider>
}`,...r.parameters?.docs?.source}}};const P=["Default"];export{r as Default,P as __namedExportsOrder,D as default};
