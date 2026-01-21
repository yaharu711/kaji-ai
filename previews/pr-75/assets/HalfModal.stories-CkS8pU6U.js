import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as h}from"./iframe-DxGbP0-9.js";import{H as o}from"./index-CRw0Jcmv.js";import{B as g}from"./index-BKtDPDeF.js";import{I as p}from"./index-B_Psecui.js";import{S as t}from"./swords-RmYdR2K4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CAFPQBOE.js";import"./Combination-CR-jTGjv.js";import"./index-Rb89O4Qn.js";import"./index-B_8gQvYz.js";import"./x-DxJV4PI0.js";import"./createLucideIcon-CgzfMX5A.js";const M={component:o,parameters:{layout:"fullscreen"}},n=e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(p,{label:"家事を選択",placeholder:"家事を選択してください",fullWidth:!0}),e.jsx(p,{label:"討伐時刻",placeholder:"10:00",fullWidth:!0})]});function m(){const[r,a]=h.useState(!1);return e.jsxs("div",{style:{padding:32},children:[e.jsx(g,{onClick:()=>{a(!0)},radius:"lg",size:"md",children:"ハーフモーダルを開く"}),e.jsx(o,{open:r,onOpenChange:a,title:"家事を討伐する",description:"討伐する家事を選択してください",headerIcon:e.jsx(t,{size:18}),secondaryActionLabel:"キャンセル",onSecondaryAction:()=>{a(!1)},primaryActionLabel:"討伐完了",onPrimaryAction:()=>{a(!1)},height:"md",children:n})]})}const s={render:()=>e.jsx(m,{}),args:{open:!1,onOpenChange:()=>{},title:"",children:n}},i={render:r=>e.jsx(o,{...r,children:n}),args:{open:!0,onOpenChange:()=>{},title:"家事を討伐する",description:"討伐する家事を選択してください",headerIcon:e.jsx(t,{size:18}),secondaryActionLabel:"キャンセル",primaryActionLabel:"討伐完了",height:"sm",children:n}},c={render:r=>e.jsx(o,{...r,children:n}),args:{open:!0,onOpenChange:()=>{},title:"家事を討伐する",description:"討伐する家事を選択してください",headerIcon:e.jsx(t,{size:18}),secondaryActionLabel:"キャンセル",primaryActionLabel:"討伐完了",height:"md",children:n}},d={render:r=>e.jsx(o,{...r,children:n}),args:{open:!0,onOpenChange:()=>{},title:"家事を討伐する",description:"討伐する家事を選択してください",headerIcon:e.jsx(t,{size:18}),secondaryActionLabel:"キャンセル",primaryActionLabel:"討伐完了",height:"lg",children:n}},l={render:r=>e.jsx(o,{...r,children:n}),args:{open:!0,onOpenChange:()=>{},title:"家事を討伐する",description:"討伐する家事を選択してください",headerIcon:e.jsx(t,{size:18}),children:n}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <WithTrigger />,
  args: {
    open: false,
    onOpenChange: () => {
      /* noop (storybook args placeholder) */
    },
    title: "",
    children: Content
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => <HalfModal {...args}>{Content}</HalfModal>,
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    title: "家事を討伐する",
    description: "討伐する家事を選択してください",
    headerIcon: <Swords size={18} />,
    secondaryActionLabel: "キャンセル",
    primaryActionLabel: "討伐完了",
    height: "sm",
    children: Content
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <HalfModal {...args}>{Content}</HalfModal>,
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    title: "家事を討伐する",
    description: "討伐する家事を選択してください",
    headerIcon: <Swords size={18} />,
    secondaryActionLabel: "キャンセル",
    primaryActionLabel: "討伐完了",
    height: "md",
    children: Content
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <HalfModal {...args}>{Content}</HalfModal>,
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    title: "家事を討伐する",
    description: "討伐する家事を選択してください",
    headerIcon: <Swords size={18} />,
    secondaryActionLabel: "キャンセル",
    primaryActionLabel: "討伐完了",
    height: "lg",
    children: Content
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <HalfModal {...args}>{Content}</HalfModal>,
  args: {
    open: true,
    onOpenChange: () => {
      /* noop */
    },
    title: "家事を討伐する",
    description: "討伐する家事を選択してください",
    headerIcon: <Swords size={18} />,
    children: Content
  }
}`,...l.parameters?.docs?.source}}};const z=["WithTriggerButton","HeightSmall","HeightMedium","HeightLarge","WithoutFooter"];export{d as HeightLarge,c as HeightMedium,i as HeightSmall,s as WithTriggerButton,l as WithoutFooter,z as __namedExportsOrder,M as default};
