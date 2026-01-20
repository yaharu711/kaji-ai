import{G as s}from"./index-046hMvUa.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-CVTC7NmS.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BKtDPDeF.js";import"./index-DLwo3SGB.js";import"./index-a584p7Rz.js";import"./index-D0M3MBX6.js";import"./index-DpCzjvgm.js";import"./index-moVwi2Uc.js";import"./index-BbZF7t0Y.js";import"./x-BrP4-5PG.js";import"./createLucideIcon-BAFFFu14.js";import"./index-ykZGv8WS.js";import"./index-DxXqNueK.js";import"./index-BOGMBlWv.js";import"./index-dxw4tIKe.js";import"./chunk-JMJ3UQ3L-CVr9uXhG.js";import"./index-BGEEP2ch.js";import"./index-CEy3-5Z5.js";import"./index-FlyXXLwP.js";import"./index-F97Ai9Hb.js";import"./check-CJLr9YwJ.js";import"./user-plus-Bs9gTsf1.js";import"./search-DfNI9mGJ.js";const m=e=>{},t=e=>{},l=e=>{},w={component:s,parameters:{layout:"centered"},args:{open:!0,groupName:"永井家",onOpenChange:m,onSearch:t,isSearching:!1,isInviting:!1,searchResults:[],searchError:"",onClearSearchError:()=>{},onInvite:l}},n={args:{}},r={args:{isSearching:!0}},a={args:{searchResults:[{id:"1",name:"佐藤 太郎",email:"sato@example.com",image_url:null,is_invited_or_belonging:!1},{id:"2",name:"田中 花子",email:"hanako@example.com",image_url:null,is_invited_or_belonging:!1}],onInvite:e=>{console.log("invite",e)}}},o={args:{searchResults:[{id:"1",name:"佐藤 太郎",email:"sato@example.com",image_url:null,is_invited_or_belonging:!0},{id:"2",name:"田中 花子",email:"hanako@example.com",image_url:null,is_invited_or_belonging:!0}]}},i={args:{searchResults:[{id:"long-1",name:"とても長い名前のユーザーです表示が崩れないか確認用",email:"longname@example.com",image_url:null,is_invited_or_belonging:!1}]}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const M=["Empty","Searching","WithResults","AlreadyJoined","LongName"];export{o as AlreadyJoined,n as Empty,i as LongName,r as Searching,a as WithResults,M as __namedExportsOrder,w as default};
