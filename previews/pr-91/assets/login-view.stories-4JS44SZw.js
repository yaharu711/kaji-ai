import{j as o}from"./jsx-runtime-u17CrQMm.js";import{G as d}from"./index-P8c_y2R_.js";import{P as r}from"./index-D26oWmff.js";import"./index-Bjlp2PT-.js";import"./index-ChyA34b1.js";import"./index-BKtDPDeF.js";import"./index-D6QKdDSd.js";import{L as g}from"./index-LnoLDDmG.js";import"./index-2OeMp47w.js";import"./index-DRgTK0Dz.js";import"./index-DlU45e9t.js";import"./iframe-DS2ubQzj.js";import"./index-CAn0EVSj.js";import"./index-DOQEzIyN.js";import"./index-B5Ox7MoJ.js";import"./index-Bn64PahD.js";import"./index-CgO1-KyT.js";import"./index-CqRQLHxX.js";import"./index-Bs8G1nUV.js";import"./Combination-CXaePgN3.js";import"./index-Dfuz3Veq.js";import"./index-Bx29Ftz7.js";import"./x-BWDwh0mW.js";import"./createLucideIcon-BPQngdg8.js";import"./proxy-vlZouM70.js";import"./chunk-JMJ3UQ3L-DY4dCN1o.js";import"./preload-helper-PPVm8Dsz.js";import"./crown-BEto1Tir.js";import"./index-aPK9Zp0H.js";import"./chevron-down-CpIKkHnG.js";import"./check-DQWYs0Ra.js";import"./heart-DUXXLnPU.js";const m="_container_jo5w0_1",p="_cardShell_jo5w0_12",u="_content_jo5w0_16",_="_loadingContent_jo5w0_22",y="_loadingTexts_jo5w0_31",j="_loadingEyebrow_jo5w0_37",h="_loadingTitle_jo5w0_46",x="_loadingDescription_jo5w0_53",w="_header_jo5w0_60",L="_eyebrow_jo5w0_67",b="_title_jo5w0_76",f="_description_jo5w0_83",e={container:m,cardShell:p,content:u,loadingContent:_,loadingTexts:y,loadingEyebrow:j,loadingTitle:h,loadingDescription:x,header:w,eyebrow:L,title:b,description:f};function t({isLoading:a,isBusy:l,onGoogleLogin:c}){return a?o.jsx("div",{className:e.container,children:o.jsx("div",{className:e.cardShell,children:o.jsx(r,{align:"center",children:o.jsxs("div",{className:e.loadingContent,"aria-busy":!0,children:[o.jsx(g,{size:"lg"}),o.jsxs("div",{className:e.loadingTexts,children:[o.jsx("p",{className:e.loadingEyebrow,children:"しばらくお待ちください"}),o.jsx("p",{className:e.loadingTitle,children:"ログイン処理を実行中です"}),o.jsx("p",{className:e.loadingDescription,children:"認証完了後、自動的にページ遷移します。"})]})]})})})}):o.jsx("div",{className:e.container,children:o.jsx("div",{className:e.cardShell,children:o.jsx(r,{align:"center",children:o.jsxs("div",{className:e.content,children:[o.jsxs("header",{className:e.header,children:[o.jsx("p",{className:e.eyebrow,children:"家事可視化アプリ"}),o.jsx("h1",{className:e.title,children:"Googleでログイン"}),o.jsx("p",{className:e.description,children:"Googleアカウントを使ってすぐにサインインできます。"})]}),o.jsx(d,{disabled:l,onClick:()=>{c()}})]})})})})}t.__docgenInfo={description:"",methods:[],displayName:"LoginView",props:{isLoading:{required:!0,tsType:{name:"boolean"},description:""},isBusy:{required:!0,tsType:{name:"boolean"},description:""},onGoogleLogin:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const no={component:t,parameters:{layout:"fullscreen"},argTypes:{onGoogleLogin:{control:!1},isLoading:{control:"boolean"},isBusy:{control:"boolean"}}},n={args:{isLoading:!1,isBusy:!1,onGoogleLogin:()=>{console.log("google login (storybook)")}}},s={args:{isLoading:!0,isBusy:!0,onGoogleLogin:()=>{console.log("google login (storybook)")}}},i={args:{isLoading:!1,isBusy:!0,onGoogleLogin:()=>{console.log("google login (storybook)")}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
