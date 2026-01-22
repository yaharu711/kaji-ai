import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as t}from"./iframe-BlIUsZfp.js";import{D as o}from"./index-Drhsz-Tb.js";import"./preload-helper-PPVm8Dsz.js";import"./Combination-TUgz2es3.js";import"./index-BFIMPf54.js";import"./index-fCs6qFsG.js";import"./index-CcgEDDwi.js";import"./chevron-down-DuM-fOLU.js";import"./createLucideIcon-B_MdN5nv.js";import"./check-QHfwUzp2.js";const a=[{value:"dishes",label:"食器洗い",icon:"🍽️"},{value:"clean",label:"掃除",icon:"🧹"},{value:"laundry",label:"洗濯",icon:"👕"},{value:"cook",label:"料理",icon:"🍳"},{value:"trash",label:"ゴミ出し",icon:"🗑️"}],x=Array.from({length:18},(s,r)=>({value:`chore-${String(r+1)}`,label:`家事 ${String(r+1)}`,icon:"✨"})),_={title:"Components/DropdownSelect",component:o,args:{options:a,onChange:()=>{}},parameters:{layout:"centered"}},g=()=>{const[s,r]=t.useState("laundry");return e.jsx("div",{style:{width:360},children:e.jsx(o,{label:"家事を選択",placeholder:"家事を選択してください",options:a,value:s,onChange:r})})},S=()=>{const[s,r]=t.useState("cook");return e.jsx("div",{style:{width:360},children:e.jsx(o,{label:"討伐する家事",helperText:"1つ選択してください",helperTextVariant:"notice",options:a,value:s,onChange:r,variant:"soft"})})},b=()=>{const[s,r]=t.useState("dishes");return e.jsxs("div",{style:{width:360,display:"flex",flexDirection:"column",gap:12},children:[e.jsx(o,{label:"サイズ: sm",options:a,value:s,onChange:r,size:"sm"}),e.jsx(o,{label:"サイズ: md",options:a,value:s,onChange:r,size:"md"}),e.jsx(o,{label:"サイズ: lg",options:a,value:s,onChange:r,size:"lg"})]})},v=()=>{const[s,r]=t.useState("clean");return e.jsxs("div",{style:{width:360,display:"flex",flexDirection:"column",gap:12},children:[e.jsx(o,{label:"角丸: md",options:a,value:s,onChange:r,radius:"md"}),e.jsx(o,{label:"角丸: lg",options:a,value:s,onChange:r,radius:"lg"}),e.jsx(o,{label:"角丸: pill",options:a,value:s,onChange:r,radius:"pill"})]})},y=()=>{const[s,r]=t.useState("trash");return e.jsxs("div",{style:{width:360,display:"flex",flexDirection:"column",gap:12},children:[e.jsx(o,{label:"バリアント: default",options:a,value:s,onChange:r,variant:"default"}),e.jsx(o,{label:"バリアント: soft",options:a,value:s,onChange:r,variant:"soft"})]})},f=()=>{const[s,r]=t.useState("dishes");return e.jsx("div",{style:{width:480},children:e.jsx(o,{label:"フル幅",options:a,value:s,onChange:r,width:"full"})})},j=()=>{const[s,r]=t.useState(x[0]?.value??"");return e.jsx("div",{style:{width:360},children:e.jsx(o,{label:"家事をたくさん表示",helperText:"選択肢が多いとスクロールが出ます",options:x,value:s,onChange:r,variant:"soft"})})},n={render:()=>e.jsx(g,{})},l={render:()=>e.jsx(S,{})},i={render:()=>e.jsx(b,{})},d={render:()=>e.jsx(v,{})},c={render:()=>e.jsx(y,{})},u={args:{label:"利用不可",options:a,value:"laundry",disabled:!0}},p={render:()=>e.jsx(f,{})},m={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx(o,{label:"幅: sm",options:a,onChange:()=>{},width:"sm"}),e.jsx(o,{label:"幅: md",options:a,onChange:()=>{},width:"md"}),e.jsx(o,{label:"幅: lg",options:a,onChange:()=>{},width:"lg"}),e.jsx(o,{label:"幅: full",options:a,onChange:()=>{},width:"full"})]})},h={render:()=>e.jsx(j,{})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
  render: () => <FullWidthStory />
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollableStory />
}`,...h.parameters?.docs?.source}}};const k=["Default","WithHelperText","Sizes","Radius","Variants","Disabled","FullWidth","Widths","Scrollable"];export{n as Default,u as Disabled,p as FullWidth,d as Radius,h as Scrollable,i as Sizes,c as Variants,m as Widths,l as WithHelperText,k as __namedExportsOrder,_ as default};
