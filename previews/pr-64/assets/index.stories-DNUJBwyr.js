import{G as s}from"./index-zYkdpDkJ.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-BFcfItUZ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BKtDPDeF.js";import"./index-CYig4_QT.js";import"./index-Dd79nXSZ.js";import"./index-C4tc7QHF.js";import"./index-Tvf42t2B.js";import"./index-D6q3Myyk.js";import"./x-BhvpNAdt.js";import"./createLucideIcon-BG3cR-YB.js";import"./index-ykZGv8WS.js";import"./index-DtRWC1mZ.js";import"./index-CNvwQfw2.js";import"./chunk-JMJ3UQ3L-D0G7smSw.js";import"./index-BTW7EMpt.js";import"./index-Bxq_GVgr.js";import"./index-B1VmXTqc.js";import"./index-l-Gq6uQg.js";import"./check-B9LIzH6-.js";import"./user-plus-DimUBGoo.js";import"./search-DCG_VzpY.js";const m=e=>{},t=e=>{},l=e=>{},L={component:s,parameters:{layout:"centered"},args:{open:!0,groupName:"永井家",onOpenChange:m,onSearch:t,isSearching:!1,isInviting:!1,searchResults:[],searchError:"",onClearSearchError:()=>{},onInvite:l}},n={args:{}},r={args:{isSearching:!0}},a={args:{searchResults:[{id:"1",name:"佐藤 太郎",email:"sato@example.com",image_url:null,is_invited_or_belonging:!1},{id:"2",name:"田中 花子",email:"hanako@example.com",image_url:null,is_invited_or_belonging:!1}],onInvite:e=>{console.log("invite",e)}}},o={args:{searchResults:[{id:"1",name:"佐藤 太郎",email:"sato@example.com",image_url:null,is_invited_or_belonging:!0},{id:"2",name:"田中 花子",email:"hanako@example.com",image_url:null,is_invited_or_belonging:!0}]}},i={args:{searchResults:[{id:"long-1",name:"とても長い名前のユーザーです表示が崩れないか確認用",email:"longname@example.com",image_url:null,is_invited_or_belonging:!1}]}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isSearching: true
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    searchResults: [{
      id: "1",
      name: "佐藤 太郎",
      email: "sato@example.com",
      image_url: null,
      is_invited_or_belonging: false
    }, {
      id: "2",
      name: "田中 花子",
      email: "hanako@example.com",
      image_url: null,
      is_invited_or_belonging: false
    }],
    onInvite: user => {
      console.log("invite", user);
    }
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    searchResults: [{
      id: "1",
      name: "佐藤 太郎",
      email: "sato@example.com",
      image_url: null,
      is_invited_or_belonging: true
    }, {
      id: "2",
      name: "田中 花子",
      email: "hanako@example.com",
      image_url: null,
      is_invited_or_belonging: true
    }]
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    searchResults: [{
      id: "long-1",
      name: "とても長い名前のユーザーです表示が崩れないか確認用",
      email: "longname@example.com",
      image_url: null,
      is_invited_or_belonging: false
    }]
  }
}`,...i.parameters?.docs?.source}}};const W=["Empty","Searching","WithResults","AlreadyJoined","LongName"];export{o as AlreadyJoined,n as Empty,i as LongName,r as Searching,a as WithResults,W as __namedExportsOrder,L as default};
