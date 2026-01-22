import{j as t}from"./jsx-runtime-u17CrQMm.js";import{r as a}from"./iframe-DDVx_-k4.js";import{P as e}from"./index-C-m-I4hd.js";import"./preload-helper-PPVm8Dsz.js";import"./Combination-CqIPJpmR.js";import"./index-Do906N4c.js";import"./index-D_oct1RB.js";import"./index-CBfdSzOM.js";const y={title:"Components/Popover",component:e,parameters:{layout:"centered"}};function s(){const[i,o]=a.useState(!0);return t.jsx(e,{open:i,onOpenChange:o,ariaLabel:"ポップオーバー",trigger:t.jsx("button",{type:"button",children:"トリガー"}),content:t.jsx("div",{style:{padding:16},children:"内容をここに渡します。"})})}const n={args:{trigger:t.jsx("button",{type:"button",children:"トリガー"}),content:t.jsx("div",{style:{padding:16},children:"内容をここに渡します。"}),ariaLabel:"ポップオーバー"},render:()=>t.jsx(s,{})},r={args:{trigger:t.jsx("button",{type:"button",children:"サイズ"}),content:t.jsx("div",{style:{padding:16},children:"サイズ"})},render:()=>t.jsxs("div",{style:{display:"flex",gap:24},children:[t.jsx(e,{trigger:t.jsx("button",{type:"button",children:"Small"}),content:t.jsx("div",{style:{padding:16},children:"small"}),size:"sm",ariaLabel:"サイズ小"}),t.jsx(e,{trigger:t.jsx("button",{type:"button",children:"Medium"}),content:t.jsx("div",{style:{padding:16},children:"medium"}),size:"md",ariaLabel:"サイズ中"}),t.jsx(e,{trigger:t.jsx("button",{type:"button",children:"Large"}),content:t.jsx("div",{style:{padding:16},children:"large"}),size:"lg",ariaLabel:"サイズ大"})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: <button type="button">トリガー</button>,
    content: <div style={{
      padding: 16
    }}>内容をここに渡します。</div>,
    ariaLabel: "ポップオーバー"
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
    }}>small</div>} size="sm" ariaLabel="サイズ小" />
      <Popover trigger={<button type="button">Medium</button>} content={<div style={{
      padding: 16
    }}>medium</div>} size="md" ariaLabel="サイズ中" />
      <Popover trigger={<button type="button">Large</button>} content={<div style={{
      padding: 16
    }}>large</div>} size="lg" ariaLabel="サイズ大" />
    </div>
}`,...r.parameters?.docs?.source}}};const x=["Default","Sizes"];export{n as Default,r as Sizes,x as __namedExportsOrder,y as default};
