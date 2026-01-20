import{j as e}from"./jsx-runtime-u17CrQMm.js";import{I as r}from"./index-DLwo3SGB.js";import"./iframe-CVTC7NmS.js";import{S as p}from"./search-DfNI9mGJ.js";import{M as i}from"./mail-Bbxhe9V5.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-BAFFFu14.js";const I={title:"Components/Input",component:r,parameters:{layout:"centered"}},l={args:{label:"氏名",placeholder:"例: 山田太郎"}},a={render:()=>e.jsxs("div",{style:{display:"flex",gap:14,flexDirection:"column",width:360},children:[e.jsx(r,{size:"sm",label:"サイズ: sm",placeholder:"テキストを入力"}),e.jsx(r,{size:"md",label:"サイズ: md",placeholder:"テキストを入力"}),e.jsx(r,{size:"lg",label:"サイズ: lg",placeholder:"テキストを入力"})]})},s={render:()=>e.jsxs("div",{style:{display:"flex",gap:14,flexDirection:"column",width:360},children:[e.jsx(r,{radius:"md",label:"角丸: md",placeholder:"テキストを入力"}),e.jsx(r,{radius:"lg",label:"角丸: lg",placeholder:"テキストを入力"}),e.jsx(r,{radius:"pill",label:"角丸: pill",placeholder:"テキストを入力"})]})},o={render:()=>e.jsxs("div",{style:{display:"flex",gap:14,flexDirection:"column",width:400},children:[e.jsx(r,{label:"検索",placeholder:"キーワードを入力",leftIcon:e.jsx(p,{size:16}),helperText:"サジェストが表示されます"}),e.jsx(r,{label:"メールアドレス",type:"email",placeholder:"user@example.com",leftIcon:e.jsx(i,{size:16}),rightIcon:e.jsx(i,{size:16}),helperText:"確認のため再入力が必要です"})]})},n={args:{label:"氏名",placeholder:"例: 山田太郎",required:!0}},t={args:{label:"メールアドレス",type:"email",placeholder:"user@example.com",error:!0,errorText:"メールアドレスの形式が正しくありません"}},d={args:{label:"グループ名",placeholder:"入力できません",disabled:!0,helperText:"権限がありません"}},c={render:()=>e.jsx("div",{style:{width:480},children:e.jsx(r,{label:"グループ名",placeholder:"幅いっぱいに広がります",fullWidth:!0})})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: "氏名",
    placeholder: "例: 山田太郎"
  }
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 14,
    flexDirection: "column",
    width: 360
  }}>
      <Input size="sm" label="サイズ: sm" placeholder="テキストを入力" />
      <Input size="md" label="サイズ: md" placeholder="テキストを入力" />
      <Input size="lg" label="サイズ: lg" placeholder="テキストを入力" />
    </div>
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 14,
    flexDirection: "column",
    width: 360
  }}>
      <Input radius="md" label="角丸: md" placeholder="テキストを入力" />
      <Input radius="lg" label="角丸: lg" placeholder="テキストを入力" />
      <Input radius="pill" label="角丸: pill" placeholder="テキストを入力" />
    </div>
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 14,
    flexDirection: "column",
    width: 400
  }}>
      <Input label="検索" placeholder="キーワードを入力" leftIcon={<Search size={16} />} helperText="サジェストが表示されます" />
      <Input label="メールアドレス" type="email" placeholder="user@example.com" leftIcon={<Mail size={16} />} rightIcon={<Mail size={16} />} helperText="確認のため再入力が必要です" />
    </div>
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: "氏名",
    placeholder: "例: 山田太郎",
    required: true
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: "メールアドレス",
    type: "email",
    placeholder: "user@example.com",
    error: true,
    errorText: "メールアドレスの形式が正しくありません"
  }
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: "グループ名",
    placeholder: "入力できません",
    disabled: true,
    helperText: "権限がありません"
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 480
  }}>
      <Input label="グループ名" placeholder="幅いっぱいに広がります" fullWidth />
    </div>
}`,...c.parameters?.docs?.source}}};const y=["Default","Sizes","Radius","WithIcons","Required","Error","Disabled","FullWidth"];export{l as Default,d as Disabled,t as Error,c as FullWidth,s as Radius,n as Required,a as Sizes,o as WithIcons,y as __namedExportsOrder,I as default};
