import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as t}from"./iframe-BavpLA4z.js";import{D as o}from"./index-C2W9Bu75.js";import"./preload-helper-PPVm8Dsz.js";import"./Combination-CpTBewC8.js";import"./index-cMMFw8Yh.js";import"./index-CKlUjPBx.js";import"./index-CaWIL-9K.js";import"./chevron-down-D6q1KtjS.js";import"./createLucideIcon-rO1lRtKS.js";import"./check-Dm-X3tG8.js";const a=[{value:"dishes",label:"食器洗い",icon:"🍽️"},{value:"clean",label:"掃除",icon:"🧹"},{value:"laundry",label:"洗濯",icon:"👕"},{value:"cook",label:"料理",icon:"🍳"},{value:"trash",label:"ゴミ出し",icon:"🗑️"}],b=[{value:"dishes",label:"食器洗い",icon:"🍽️"},{value:"clean",label:"掃除",icon:"🧹",disabled:!0},{value:"laundry",label:"洗濯",icon:"👕"},{value:"cook",label:"料理",icon:"🍳",disabled:!0},{value:"trash",label:"ゴミ出し",icon:"🗑️"}],x=Array.from({length:18},(r,s)=>({value:`chore-${String(s+1)}`,label:`家事 ${String(s+1)}`,icon:"✨"})),_={title:"Components/DropdownSelect",component:o,args:{options:a,onChange:()=>{}},parameters:{layout:"centered"}},S=()=>{const[r,s]=t.useState("laundry");return e.jsx("div",{style:{width:360},children:e.jsx(o,{label:"家事を選択",placeholder:"家事を選択してください",options:a,value:r,onChange:s})})},v=()=>{const[r,s]=t.useState("cook");return e.jsx("div",{style:{width:360},children:e.jsx(o,{label:"討伐する家事",helperText:"1つ選択してください",helperTextVariant:"notice",options:a,value:r,onChange:s,variant:"soft"})})},y=()=>{const[r,s]=t.useState("dishes");return e.jsxs("div",{style:{width:360,display:"flex",flexDirection:"column",gap:12},children:[e.jsx(o,{label:"サイズ: sm",options:a,value:r,onChange:s,size:"sm"}),e.jsx(o,{label:"サイズ: md",options:a,value:r,onChange:s,size:"md"}),e.jsx(o,{label:"サイズ: lg",options:a,value:r,onChange:s,size:"lg"})]})},f=()=>{const[r,s]=t.useState("clean");return e.jsxs("div",{style:{width:360,display:"flex",flexDirection:"column",gap:12},children:[e.jsx(o,{label:"角丸: md",options:a,value:r,onChange:s,radius:"md"}),e.jsx(o,{label:"角丸: lg",options:a,value:r,onChange:s,radius:"lg"}),e.jsx(o,{label:"角丸: pill",options:a,value:r,onChange:s,radius:"pill"})]})},j=()=>{const[r,s]=t.useState("trash");return e.jsxs("div",{style:{width:360,display:"flex",flexDirection:"column",gap:12},children:[e.jsx(o,{label:"バリアント: default",options:a,value:r,onChange:s,variant:"default"}),e.jsx(o,{label:"バリアント: soft",options:a,value:r,onChange:s,variant:"soft"})]})},C=()=>{const[r,s]=t.useState("dishes");return e.jsx("div",{style:{width:480},children:e.jsx(o,{label:"フル幅",options:a,value:r,onChange:s,width:"full"})})},w=()=>{const[r,s]=t.useState(x[0]?.value??"");return e.jsx("div",{style:{width:360},children:e.jsx(o,{label:"家事をたくさん表示",helperText:"選択肢が多いとスクロールが出ます",options:x,value:r,onChange:s,variant:"soft"})})},n={render:()=>e.jsx(S,{})},l={render:()=>e.jsx(v,{})},i={render:()=>e.jsx(y,{})},d={render:()=>e.jsx(f,{})},c={render:()=>e.jsx(j,{})},u={args:{label:"利用不可",options:a,value:"laundry",disabled:!0}},p={args:{label:"一部選択不可",options:b,value:"laundry"}},m={render:()=>e.jsx(C,{})},h={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx(o,{label:"幅: sm",options:a,onChange:()=>{},width:"sm"}),e.jsx(o,{label:"幅: md",options:a,onChange:()=>{},width:"md"}),e.jsx(o,{label:"幅: lg",options:a,onChange:()=>{},width:"lg"}),e.jsx(o,{label:"幅: full",options:a,onChange:()=>{},width:"full"})]})},g={render:()=>e.jsx(w,{})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <DefaultStory />
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <HelperTextStory />
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <SizesStory />
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <RadiusStory />
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <VariantsStory />
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: "利用不可",
    options: chores,
    value: "laundry",
    disabled: true
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: "一部選択不可",
    options: choresWithDisabled,
    value: "laundry"
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <FullWidthStory />
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12
  }}>
      <DropdownSelect label="幅: sm" options={chores} onChange={() => undefined} width="sm" />
      <DropdownSelect label="幅: md" options={chores} onChange={() => undefined} width="md" />
      <DropdownSelect label="幅: lg" options={chores} onChange={() => undefined} width="lg" />
      <DropdownSelect label="幅: full" options={chores} onChange={() => undefined} width="full" />
    </div>
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollableStory />
}`,...g.parameters?.docs?.source}}};const $=["Default","WithHelperText","Sizes","Radius","Variants","Disabled","DisabledOptions","FullWidth","Widths","Scrollable"];export{n as Default,u as Disabled,p as DisabledOptions,m as FullWidth,d as Radius,g as Scrollable,i as Sizes,c as Variants,h as Widths,l as WithHelperText,$ as __namedExportsOrder,_ as default};
