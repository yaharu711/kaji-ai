import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as i}from"./iframe-EaA_ffCS.js";import{P as t}from"./index-BGfYprC9.js";import"./preload-helper-PPVm8Dsz.js";import"./index-FwC8WnoZ.js";import"./index-DE9sEHyg.js";import"./index-CW7T4woV.js";const x={title:"Components/Popover",component:t,parameters:{layout:"centered"}};function d(){const[o,s]=i.useState(!0);return e.jsx(t,{open:o,onOpenChange:s,trigger:e.jsx("button",{type:"button",children:"トリガー"}),content:e.jsx("div",{style:{padding:16},children:"内容をここに渡します。"})})}const n={render:()=>e.jsx(d,{})},r={render:()=>e.jsxs("div",{style:{display:"flex",gap:24},children:[e.jsx(t,{trigger:e.jsx("button",{type:"button",children:"Small"}),content:e.jsx("div",{style:{padding:16},children:"small"}),size:"sm"}),e.jsx(t,{trigger:e.jsx("button",{type:"button",children:"Medium"}),content:e.jsx("div",{style:{padding:16},children:"medium"}),size:"md"}),e.jsx(t,{trigger:e.jsx("button",{type:"button",children:"Large"}),content:e.jsx("div",{style:{padding:16},children:"large"}),size:"lg"})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <DefaultStory />
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const y=["Default","Sizes"];export{n as Default,r as Sizes,y as __namedExportsOrder,x as default};
