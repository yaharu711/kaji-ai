import{j as o}from"./jsx-runtime-u17CrQMm.js";import{G as d}from"./index-P8c_y2R_.js";import{P as i}from"./index-ykZGv8WS.js";import{c as g}from"./createLucideIcon-DLGIdVLT.js";import"./iframe-BsvuHyQB.js";import"./preload-helper-PPVm8Dsz.js";const p=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],u=g("loader-circle",p),m="_container_brnj5_1",_="_cardShell_brnj5_12",y="_content_brnj5_16",b="_loadingContent_brnj5_22",j="_spinner_brnj5_31",h="_loadingTexts_brnj5_38",x="_loadingEyebrow_brnj5_44",L="_loadingTitle_brnj5_53",f="_loadingDescription_brnj5_60",N="_header_brnj5_67",G="_eyebrow_brnj5_74",T="_title_brnj5_83",w="_description_brnj5_90",e={container:m,cardShell:_,content:y,loadingContent:b,spinner:j,loadingTexts:h,loadingEyebrow:x,loadingTitle:L,loadingDescription:f,header:N,eyebrow:G,title:T,description:w};function a({isLoading:t,isBusy:l,onGoogleLogin:c}){return t?o.jsx("div",{className:e.container,children:o.jsx("div",{className:e.cardShell,children:o.jsx(i,{align:"center",children:o.jsxs("div",{className:e.loadingContent,"aria-busy":!0,children:[o.jsx(u,{className:e.spinner,"aria-hidden":!0}),o.jsxs("div",{className:e.loadingTexts,children:[o.jsx("p",{className:e.loadingEyebrow,children:"しばらくお待ちください"}),o.jsx("p",{className:e.loadingTitle,children:"ログイン処理を実行中です"}),o.jsx("p",{className:e.loadingDescription,children:"認証完了後、自動的にページ遷移します。"})]})]})})})}):o.jsx("div",{className:e.container,children:o.jsx("div",{className:e.cardShell,children:o.jsx(i,{align:"center",children:o.jsxs("div",{className:e.content,children:[o.jsxs("header",{className:e.header,children:[o.jsx("p",{className:e.eyebrow,children:"家事可視化アプリ"}),o.jsx("h1",{className:e.title,children:"Googleでログイン"}),o.jsx("p",{className:e.description,children:"Googleアカウントを使ってすぐにサインインできます。"})]}),o.jsx(d,{disabled:l,onClick:()=>{c()}})]})})})})}a.__docgenInfo={description:"",methods:[],displayName:"LoginView",props:{isLoading:{required:!0,tsType:{name:"boolean"},description:""},isBusy:{required:!0,tsType:{name:"boolean"},description:""},onGoogleLogin:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const E={component:a,parameters:{layout:"fullscreen"},argTypes:{onGoogleLogin:{control:!1},isLoading:{control:"boolean"},isBusy:{control:"boolean"}}},n={args:{isLoading:!1,isBusy:!1,onGoogleLogin:()=>{console.log("google login (storybook)")}}},s={args:{isLoading:!0,isBusy:!0,onGoogleLogin:()=>{console.log("google login (storybook)")}}},r={args:{isLoading:!1,isBusy:!0,onGoogleLogin:()=>{console.log("google login (storybook)")}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    isLoading: false,
    isBusy: false,
    onGoogleLogin: () => {
      console.log("google login (storybook)");
    }
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isLoading: true,
    isBusy: true,
    onGoogleLogin: () => {
      console.log("google login (storybook)");
    }
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isLoading: false,
    isBusy: true,
    onGoogleLogin: () => {
      console.log("google login (storybook)");
    }
  }
}`,...r.parameters?.docs?.source}}};const q=["Default","Loading","Busy"];export{r as Busy,n as Default,s as Loading,q as __namedExportsOrder,E as default};
