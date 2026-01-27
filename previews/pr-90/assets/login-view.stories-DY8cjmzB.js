import{j as o}from"./jsx-runtime-u17CrQMm.js";import{G as d}from"./index-P8c_y2R_.js";import{P as r}from"./index-D26oWmff.js";import"./index-d41GYEeS.js";import"./index-DxFc5O45.js";import"./index-BKtDPDeF.js";import"./index-XAfm4Zpx.js";import{L as g}from"./index-BOCUrT83.js";import"./index-egEOj9Lu.js";import"./index-BaCqgYLr.js";import"./index-Dcay1ck8.js";import"./iframe-BzGHARFC.js";import"./index-B1CbN0te.js";import"./index-KXQ-ngKf.js";import"./index-BgecqtTW.js";import"./index-DCsYZJVv.js";import"./index-CxrSOdGl.js";import"./index-CbkTFAy_.js";import"./index-BJv44x48.js";import"./Combination-BMi-on9C.js";import"./index-iCrqWDMr.js";import"./index-iVLB7gGA.js";import"./x-Cjq4Lj0u.js";import"./createLucideIcon-6fTX82Uh.js";import"./proxy-3QQuYY2m.js";import"./chunk-JMJ3UQ3L-D-JeWL1q.js";import"./preload-helper-PPVm8Dsz.js";import"./crown-ATVGXcSd.js";import"./index-D1GpFqQr.js";import"./chevron-down-DMRk9vAS.js";import"./check-DhSOmBdd.js";import"./heart-BkKKGJc6.js";const m="_container_jo5w0_1",p="_cardShell_jo5w0_12",u="_content_jo5w0_16",_="_loadingContent_jo5w0_22",y="_loadingTexts_jo5w0_31",j="_loadingEyebrow_jo5w0_37",h="_loadingTitle_jo5w0_46",x="_loadingDescription_jo5w0_53",w="_header_jo5w0_60",L="_eyebrow_jo5w0_67",b="_title_jo5w0_76",f="_description_jo5w0_83",e={container:m,cardShell:p,content:u,loadingContent:_,loadingTexts:y,loadingEyebrow:j,loadingTitle:h,loadingDescription:x,header:w,eyebrow:L,title:b,description:f};function t({isLoading:a,isBusy:l,onGoogleLogin:c}){return a?o.jsx("div",{className:e.container,children:o.jsx("div",{className:e.cardShell,children:o.jsx(r,{align:"center",children:o.jsxs("div",{className:e.loadingContent,"aria-busy":!0,children:[o.jsx(g,{size:"lg"}),o.jsxs("div",{className:e.loadingTexts,children:[o.jsx("p",{className:e.loadingEyebrow,children:"しばらくお待ちください"}),o.jsx("p",{className:e.loadingTitle,children:"ログイン処理を実行中です"}),o.jsx("p",{className:e.loadingDescription,children:"認証完了後、自動的にページ遷移します。"})]})]})})})}):o.jsx("div",{className:e.container,children:o.jsx("div",{className:e.cardShell,children:o.jsx(r,{align:"center",children:o.jsxs("div",{className:e.content,children:[o.jsxs("header",{className:e.header,children:[o.jsx("p",{className:e.eyebrow,children:"家事可視化アプリ"}),o.jsx("h1",{className:e.title,children:"Googleでログイン"}),o.jsx("p",{className:e.description,children:"Googleアカウントを使ってすぐにサインインできます。"})]}),o.jsx(d,{disabled:l,onClick:()=>{c()}})]})})})})}t.__docgenInfo={description:"",methods:[],displayName:"LoginView",props:{isLoading:{required:!0,tsType:{name:"boolean"},description:""},isBusy:{required:!0,tsType:{name:"boolean"},description:""},onGoogleLogin:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const no={component:t,parameters:{layout:"fullscreen"},argTypes:{onGoogleLogin:{control:!1},isLoading:{control:"boolean"},isBusy:{control:"boolean"}}},n={args:{isLoading:!1,isBusy:!1,onGoogleLogin:()=>{console.log("google login (storybook)")}}},s={args:{isLoading:!0,isBusy:!0,onGoogleLogin:()=>{console.log("google login (storybook)")}}},i={args:{isLoading:!1,isBusy:!0,onGoogleLogin:()=>{console.log("google login (storybook)")}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const so=["Default","Loading","Busy"];export{i as Busy,n as Default,s as Loading,so as __namedExportsOrder,no as default};
