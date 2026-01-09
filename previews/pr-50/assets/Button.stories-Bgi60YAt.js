import{j as r}from"./jsx-runtime-u17CrQMm.js";import{B as e}from"./index-ohx606wJ.js";import"./iframe-7t8V1uNH.js";import{c as d}from"./createLucideIcon-FLbAmV6X.js";import"./preload-helper-PPVm8Dsz.js";const l=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]],m=d("user-plus",l),x={title:"Components/Button",component:e,parameters:{layout:"centered"}},s={args:{children:"作成する",variant:"primary"}},a={args:{children:"新規作成",icon:r.jsx(m,{size:18}),variant:"primary"}},n={args:{children:"キャンセル",variant:"secondary"}},t={args:{children:"テキストリンク",variant:"ghost"}},i={render:()=>r.jsxs("div",{style:{display:"flex",gap:12},children:[r.jsx(e,{size:"sm",children:"Small"}),r.jsx(e,{size:"md",children:"Medium"}),r.jsx(e,{size:"lg",children:"Large"})]})},o={render:()=>r.jsxs("div",{style:{display:"flex",gap:12},children:[r.jsx(e,{radius:"md",children:"R: md"}),r.jsx(e,{radius:"lg",children:"R: lg"}),r.jsx(e,{radius:"pill",children:"R: pill"})]})},c={args:{children:"処理中…",variant:"primary",disabled:!0}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 12
  }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 12
  }}>
      <Button radius="md">R: md</Button>
      <Button radius="lg">R: lg</Button>
      <Button radius="pill">R: pill</Button>
    </div>
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    children: "処理中…",
    variant: "primary",
    disabled: true
  }
}`,...c.parameters?.docs?.source}}};const v=["Primary","WithIcon","Secondary","Ghost","Sizes","Radius","Disabled"];export{c as Disabled,t as Ghost,s as Primary,o as Radius,n as Secondary,i as Sizes,a as WithIcon,v as __namedExportsOrder,x as default};
