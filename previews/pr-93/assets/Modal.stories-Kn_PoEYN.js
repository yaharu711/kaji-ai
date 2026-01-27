import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as i}from"./iframe-AnQgECJl.js";import{M as n}from"./index-odiBLeLi.js";import{B as o}from"./index-BKtDPDeF.js";import{I as l}from"./index-BleoppBZ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-bo185IqV.js";import"./Combination-DyqCtIHQ.js";import"./index-BMs6jsM0.js";import"./index-Cztf3gh3.js";import"./x-DK6Qoy1d.js";import"./createLucideIcon-C9whViIr.js";const C={component:n,parameters:{layout:"fullscreen"}};function a(){const[s,t]=i.useState(!1);return e.jsxs("div",{style:{padding:32,display:"flex",gap:16},children:[e.jsx(o,{onClick:()=>{t(!0)},radius:"lg",size:"md",children:"モーダルを開く"}),e.jsx(n,{open:s,onOpenChange:t,title:"新しいグループを作成 ✨",description:"トリガーボタンから開く例",footer:e.jsx(o,{fullWidth:!0,size:"lg",radius:"lg",onClick:()=>{t(!1)},children:"作成する"}),children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:e.jsx(l,{label:"グループ名",placeholder:"例: 田中家",fullWidth:!0})})})]})}const r={render:()=>e.jsx(a,{}),args:{open:!1,onOpenChange:()=>{},title:"",children:null}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const O=["WithTriggerButton"];export{r as WithTriggerButton,O as __namedExportsOrder,C as default};
