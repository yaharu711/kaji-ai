import{j as e}from"./jsx-runtime-u17CrQMm.js";import{U as r}from"./index-DGJr4RFe.js";import"./iframe-DgPYzqpe.js";import{C as t}from"./crown-DfmeESoy.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon--1YttshL.js";const p="_row_ulmk7_1",c="_badge_ulmk7_7",i={row:p,badge:c},y={title:"Components/UserProfileImg",component:r,parameters:{layout:"centered"}},s={args:{name:"テストユーザー",imageUrl:null,size:"md",tone:"primary"}},a={args:{name:"アイコンあり",imageUrl:"https://placehold.co/120x120/png",size:"md",tone:"primary"}},n={render:()=>e.jsxs("div",{className:i.row,children:[e.jsx(r,{name:"S",size:"sm",tone:"primary"}),e.jsx(r,{name:"M",size:"md",tone:"primary"}),e.jsx(r,{name:"L",size:"lg",tone:"primary"})]})},o={render:()=>e.jsxs("div",{className:i.row,children:[e.jsx(r,{name:"P",size:"sm",tone:"primary"}),e.jsx(r,{name:"P",size:"sm",tone:"pink"}),e.jsx(r,{name:"P",size:"sm",tone:"purple"}),e.jsx(r,{name:"O",size:"sm",tone:"orange"})]})},m={args:{name:"オーナー",size:"md",tone:"orange",badge:e.jsx("span",{className:i.badge,"aria-hidden":"true",children:e.jsx(t,{size:14})})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    name: "テストユーザー",
    imageUrl: null,
    size: "md",
    tone: "primary"
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    name: "アイコンあり",
    imageUrl: "https://placehold.co/120x120/png",
    size: "md",
    tone: "primary"
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className={styles.row}>
      <UserProfileImg name="S" size="sm" tone="primary" />
      <UserProfileImg name="M" size="md" tone="primary" />
      <UserProfileImg name="L" size="lg" tone="primary" />
    </div>
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className={styles.row}>
      <UserProfileImg name="P" size="sm" tone="primary" />
      <UserProfileImg name="P" size="sm" tone="pink" />
      <UserProfileImg name="P" size="sm" tone="purple" />
      <UserProfileImg name="O" size="sm" tone="orange" />
    </div>
}`,...o.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    name: "オーナー",
    size: "md",
    tone: "orange",
    badge: <span className={styles.badge} aria-hidden="true">
        <Crown size={14} />
      </span>
  }
}`,...m.parameters?.docs?.source}}};const f=["Default","WithImage","Sizes","Tones","WithBadge"];export{s as Default,n as Sizes,o as Tones,m as WithBadge,a as WithImage,f as __namedExportsOrder,y as default};
