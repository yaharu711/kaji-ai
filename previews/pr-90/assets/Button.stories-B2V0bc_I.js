import{j as r}from"./jsx-runtime-u17CrQMm.js";import{B as e}from"./index-BKtDPDeF.js";import"./iframe-DeiQN-Kw.js";import{U as c}from"./user-plus-D9P0oTxE.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-C_imvSua.js";const y={title:"Components/Button",component:e,parameters:{layout:"centered"}},s={args:{children:"作成する",variant:"primary"}},a={args:{children:"新規作成",icon:r.jsx(c,{size:18}),variant:"primary"}},n={args:{children:"キャンセル",variant:"secondary"}},t={args:{children:"テキストリンク",variant:"ghost"}},o={render:()=>r.jsxs("div",{style:{display:"flex",gap:12},children:[r.jsx(e,{size:"sm",children:"Small"}),r.jsx(e,{size:"md",children:"Medium"}),r.jsx(e,{size:"lg",children:"Large"})]})},i={render:()=>r.jsxs("div",{style:{display:"flex",gap:12},children:[r.jsx(e,{radius:"md",children:"R: md"}),r.jsx(e,{radius:"lg",children:"R: lg"}),r.jsx(e,{radius:"pill",children:"R: pill"})]})},d={args:{children:"処理中…",variant:"primary",disabled:!0}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: "作成する",
    variant: "primary"
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: "新規作成",
    icon: <UserPlus size={18} />,
    variant: "primary"
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    children: "キャンセル",
    variant: "secondary"
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: "テキストリンク",
    variant: "ghost"
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 12
  }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 12
  }}>
      <Button radius="md">R: md</Button>
      <Button radius="lg">R: lg</Button>
      <Button radius="pill">R: pill</Button>
    </div>
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: "処理中…",
    variant: "primary",
    disabled: true
  }
}`,...d.parameters?.docs?.source}}};const x=["Primary","WithIcon","Secondary","Ghost","Sizes","Radius","Disabled"];export{d as Disabled,t as Ghost,s as Primary,i as Radius,n as Secondary,o as Sizes,a as WithIcon,x as __namedExportsOrder,y as default};
