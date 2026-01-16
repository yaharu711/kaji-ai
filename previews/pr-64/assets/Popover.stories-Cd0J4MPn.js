import{j as t}from"./jsx-runtime-u17CrQMm.js";import{r as i}from"./iframe-BFcfItUZ.js";import{P as e}from"./index-l-Gq6uQg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C4tc7QHF.js";import"./index-Tvf42t2B.js";import"./index-D6q3Myyk.js";const y={title:"Components/Popover",component:e,parameters:{layout:"centered"}};function d(){const[o,s]=i.useState(!0);return t.jsx(e,{open:o,onOpenChange:s,trigger:t.jsx("button",{type:"button",children:"トリガー"}),content:t.jsx("div",{style:{padding:16},children:"内容をここに渡します。"})})}const n={args:{trigger:t.jsx("button",{type:"button",children:"トリガー"}),content:t.jsx("div",{style:{padding:16},children:"内容をここに渡します。"})},render:()=>t.jsx(d,{})},r={args:{trigger:t.jsx("button",{type:"button",children:"サイズ"}),content:t.jsx("div",{style:{padding:16},children:"サイズ"})},render:()=>t.jsxs("div",{style:{display:"flex",gap:24},children:[t.jsx(e,{trigger:t.jsx("button",{type:"button",children:"Small"}),content:t.jsx("div",{style:{padding:16},children:"small"}),size:"sm"}),t.jsx(e,{trigger:t.jsx("button",{type:"button",children:"Medium"}),content:t.jsx("div",{style:{padding:16},children:"medium"}),size:"md"}),t.jsx(e,{trigger:t.jsx("button",{type:"button",children:"Large"}),content:t.jsx("div",{style:{padding:16},children:"large"}),size:"lg"})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: <button type="button">トリガー</button>,
    content: <div style={{
      padding: 16
    }}>内容をここに渡します。</div>
  },
  render: () => <DefaultStory />
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: <button type="button">サイズ</button>,
    content: <div style={{
      padding: 16
    }}>サイズ</div>
  },
  render: () => <div style={{
    display: "flex",
    gap: 24
  }}>
      <Popover trigger={<button type="button">Small</button>} content={<div style={{
      padding: 16
    }}>small</div>} size="sm" />
      <Popover trigger={<button type="button">Medium</button>} content={<div style={{
      padding: 16
    }}>medium</div>} size="md" />
      <Popover trigger={<button type="button">Large</button>} content={<div style={{
      padding: 16
    }}>large</div>} size="lg" />
    </div>
}`,...r.parameters?.docs?.source}}};const b=["Default","Sizes"];export{n as Default,r as Sizes,b as __namedExportsOrder,y as default};
