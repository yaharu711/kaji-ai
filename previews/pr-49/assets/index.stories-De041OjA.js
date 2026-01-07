import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as c}from"./iframe-7APSL2DP.js";import{B as S}from"./index-ohx606wJ.js";import{I as _}from"./index-BSQeoFZC.js";import{M as b}from"./index-BOKYQTEV.js";import{S as T}from"./search-DwPTgefG.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D24jzJ6C.js";import"./index-BLEjL5z7.js";import"./createLucideIcon-Kl-w1dgn.js";const k="_searchForm_cdshd_1",E="_resultArea_cdshd_9",N="_emptyState_cdshd_19",w="_emptyEmoji_cdshd_27",I="_emptyText_cdshd_32",s={searchForm:k,resultArea:E,emptyState:N,emptyEmoji:w,emptyText:I};function l({open:o,onOpenChange:u,groupName:h,onSearch:y,isSearching:m=!1,results:g}){const[i,d]=c.useState(""),x=c.useId(),f=r=>{r.preventDefault();const p=i.trim();p&&y(p)},v=r=>{r||d(""),u(r)},j=m||!i.trim();return e.jsxs(b,{open:o,onOpenChange:v,title:"メンバーを招待 ✨",description:`${h}に招待するユーザーを検索できる`,children:[e.jsxs("form",{id:x,onSubmit:f,className:s.searchForm,children:[e.jsx(_,{fullWidth:!0,radius:"pill",placeholder:"kaji-enjoy@thankyou.com",value:i,label:"メールアドレス",onChange:r=>{d(r.target.value)},disabled:m}),e.jsx(S,{type:"submit",size:"md",radius:"pill",variant:"primary",disabled:j,icon:e.jsx(T,{size:18,strokeWidth:2.4}),children:"検索"})]}),e.jsx("div",{className:s.resultArea,"aria-live":"polite",children:g??e.jsxs("div",{className:s.emptyState,children:[e.jsx("span",{className:s.emptyEmoji,"aria-hidden":"true",children:"🔍"}),e.jsx("p",{className:s.emptyText,children:"ユーザーが見つかりませんでした"})]})})]})}l.__docgenInfo={description:"",methods:[],displayName:"GroupInviteModal",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onOpenChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:""},groupName:{required:!0,tsType:{name:"string"},description:""},onSearch:{required:!0,tsType:{name:"signature",type:"function",raw:"(keyword: string) => void",signature:{arguments:[{type:{name:"string"},name:"keyword"}],return:{name:"void"}}},description:""},isSearching:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},results:{required:!1,tsType:{name:"ReactNode"},description:""}}};const q=o=>{},C=o=>{},K={component:l,parameters:{layout:"centered"},args:{open:!0,groupName:"永井家",onOpenChange:q,onSearch:C}},t={},a={args:{isSearching:!0,results:e.jsx("p",{style:{margin:0},children:"検索中..."})}},n={args:{results:e.jsxs("div",{style:{display:"grid",gap:8},children:[e.jsx("div",{children:"永井 太郎 (nagai@example.com)"}),e.jsx("div",{children:"永井 花子 (hanako@example.com)"})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isSearching: true,
    results: <p style={{
      margin: 0
    }}>検索中...</p>
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    results: <div style={{
      display: "grid",
      gap: 8
    }}>
        <div>永井 太郎 (nagai@example.com)</div>
        <div>永井 花子 (hanako@example.com)</div>
      </div>
  }
}`,...n.parameters?.docs?.source}}};const V=["Empty","Searching","WithResults"];export{t as Empty,a as Searching,n as WithResults,V as __namedExportsOrder,K as default};
