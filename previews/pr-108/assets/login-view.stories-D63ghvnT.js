import{j as o}from"./jsx-runtime-u17CrQMm.js";import{G as d}from"./index-P8c_y2R_.js";import{P as r}from"./index-D26oWmff.js";import"./index-Dw6XdV9w.js";import"./index-DkuMBG6Z.js";import"./index-BKtDPDeF.js";import"./index-BbYEqis7.js";import{L as g}from"./index-xStBQTld.js";import"./index-BMzV_JQZ.js";import"./index-4M5G--cH.js";import"./index-11nxwiRZ.js";import"./iframe-xb1t4ZHU.js";import"./index-CjrsdldT.js";import"./index-B8DQYi4t.js";import"./index-2CMqI9qZ.js";import"./index-DeVhjKW9.js";import"./index-DxCT0jSL.js";import"./index-w4-gtbO9.js";import"./index-BBGZHdYo.js";import"./index-E3Bzbfbg.js";import"./Combination-D0EORKNu.js";import"./index-BaPV0b--.js";import"./index-DbigGyZM.js";import"./x-M_bBhYij.js";import"./createLucideIcon-ALLVZysa.js";import"./chunk-JMJ3UQ3L-Va4VT4Fx.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BodGhM6m.js";import"./check-B3XZbkPn.js";import"./heart-CqZcBubr.js";const m="_container_jo5w0_1",p="_cardShell_jo5w0_12",u="_content_jo5w0_16",_="_loadingContent_jo5w0_22",y="_loadingTexts_jo5w0_31",j="_loadingEyebrow_jo5w0_37",h="_loadingTitle_jo5w0_46",x="_loadingDescription_jo5w0_53",w="_header_jo5w0_60",L="_eyebrow_jo5w0_67",b="_title_jo5w0_76",f="_description_jo5w0_83",e={container:m,cardShell:p,content:u,loadingContent:_,loadingTexts:y,loadingEyebrow:j,loadingTitle:h,loadingDescription:x,header:w,eyebrow:L,title:b,description:f};function t({isLoading:a,isBusy:l,onGoogleLogin:c}){return a?o.jsx("div",{className:e.container,children:o.jsx("div",{className:e.cardShell,children:o.jsx(r,{align:"center",children:o.jsxs("div",{className:e.loadingContent,"aria-busy":!0,children:[o.jsx(g,{size:"lg"}),o.jsxs("div",{className:e.loadingTexts,children:[o.jsx("p",{className:e.loadingEyebrow,children:"しばらくお待ちください"}),o.jsx("p",{className:e.loadingTitle,children:"ログイン処理を実行中です"}),o.jsx("p",{className:e.loadingDescription,children:"認証完了後、自動的にページ遷移します。"})]})]})})})}):o.jsx("div",{className:e.container,children:o.jsx("div",{className:e.cardShell,children:o.jsx(r,{align:"center",children:o.jsxs("div",{className:e.content,children:[o.jsxs("header",{className:e.header,children:[o.jsx("p",{className:e.eyebrow,children:"家事可視化アプリ"}),o.jsx("h1",{className:e.title,children:"Googleでログイン"}),o.jsx("p",{className:e.description,children:"Googleアカウントを使ってすぐにサインインできます。"})]}),o.jsx(d,{disabled:l,onClick:()=>{c()}})]})})})})}t.__docgenInfo={description:"",methods:[],displayName:"LoginView",props:{isLoading:{required:!0,tsType:{name:"boolean"},description:""},isBusy:{required:!0,tsType:{name:"boolean"},description:""},onGoogleLogin:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const oo={component:t,parameters:{layout:"fullscreen"},argTypes:{onGoogleLogin:{control:!1},isLoading:{control:"boolean"},isBusy:{control:"boolean"}}},n={args:{isLoading:!1,isBusy:!1,onGoogleLogin:()=>{console.log("google login (storybook)")}}},s={args:{isLoading:!0,isBusy:!0,onGoogleLogin:()=>{console.log("google login (storybook)")}}},i={args:{isLoading:!1,isBusy:!0,onGoogleLogin:()=>{console.log("google login (storybook)")}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    isLoading: false,
    isBusy: true,
    onGoogleLogin: () => {
      console.log("google login (storybook)");
    }
  }
}`,...i.parameters?.docs?.source}}};const eo=["Default","Loading","Busy"];export{i as Busy,n as Default,s as Loading,eo as __namedExportsOrder,oo as default};
