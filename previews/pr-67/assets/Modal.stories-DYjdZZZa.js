import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as i}from"./iframe-DlAJITND.js";import{M as o}from"./index-xGNG4QVk.js";import{B as n}from"./index-BKtDPDeF.js";import{I as l}from"./index-C8b6v4az.js";import"./preload-helper-PPVm8Dsz.js";import"./index-nZOlBP_d.js";import"./index-B_R-FC-K.js";import"./index-Dx8Wy_nQ.js";import"./x-CBUPgxp5.js";import"./createLucideIcon-B6qCSH5Y.js";const W={component:o,parameters:{layout:"fullscreen"}};function a(){const[s,t]=i.useState(!1);return e.jsxs("div",{style:{padding:32,display:"flex",gap:16},children:[e.jsx(n,{onClick:()=>{t(!0)},radius:"lg",size:"md",children:"モーダルを開く"}),e.jsx(o,{open:s,onOpenChange:t,title:"新しいグループを作成 ✨",description:"トリガーボタンから開く例",footer:e.jsx(n,{fullWidth:!0,size:"lg",radius:"lg",onClick:()=>{t(!1)},children:"作成する"}),children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:e.jsx(l,{label:"グループ名",placeholder:"例: 田中家",fullWidth:!0})})})]})}const r={render:()=>e.jsx(a,{}),args:{open:!1,onOpenChange:()=>{},title:"",children:null}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <WithTrigger />,
  // コンポーネントの必須propsを満たすためのダミー値（render内で制御するため未使用）
  args: {
    open: false,
    onOpenChange: () => {
      /* noop (storybook args placeholder) */
    },
    title: "",
    children: null
  }
}`,...r.parameters?.docs?.source}}};const C=["WithTriggerButton"];export{r as WithTriggerButton,C as __namedExportsOrder,W as default};
