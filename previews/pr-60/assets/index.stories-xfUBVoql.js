import{G as i}from"./index-CGYO366l.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-1XqFOf6O.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BKtDPDeF.js";import"./index-BY_T3de1.js";import"./index-DjFYXPrv.js";import"./index-BtXqq22z.js";import"./index-aftx0WHr.js";import"./x-BmK9XW0G.js";import"./createLucideIcon-D0gNjZIx.js";import"./index-ykZGv8WS.js";import"./index-Csx-MW96.js";import"./index-BOniLWWW.js";import"./index-BDOVIBqh.js";import"./index-BbgNWcPO.js";import"./check-DRBNxQ2P.js";import"./user-plus-CLarGy3O.js";import"./search-C1bqqKUQ.js";const m=e=>{},t=e=>{},l=e=>{},O={component:i,parameters:{layout:"centered"},args:{open:!0,groupName:"永井家",onOpenChange:m,onSearch:t,isSearching:!1,isInviting:!1,searchResults:[],searchError:"",onClearSearchError:()=>{},onInvite:l}},n={args:{}},r={args:{isSearching:!0}},a={args:{searchResults:[{id:"1",name:"佐藤 太郎",email:"sato@example.com",image_url:null,is_invited_or_belonging:!1},{id:"2",name:"田中 花子",email:"hanako@example.com",image_url:null,is_invited_or_belonging:!1}],onInvite:e=>{console.log("invite",e)}}},o={args:{searchResults:[{id:"1",name:"佐藤 太郎",email:"sato@example.com",image_url:null,is_invited_or_belonging:!0},{id:"2",name:"田中 花子",email:"hanako@example.com",image_url:null,is_invited_or_belonging:!0}]}},s={args:{searchResults:[{id:"long-1",name:"とても長い名前のユーザーです表示が崩れないか確認用",email:"longname@example.com",image_url:null,is_invited_or_belonging:!1}]}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    searchResults: [{
      id: "long-1",
      name: "とても長い名前のユーザーです表示が崩れないか確認用",
      email: "longname@example.com",
      image_url: null,
      is_invited_or_belonging: false
    }]
  }
}`,...s.parameters?.docs?.source}}};const A=["Empty","Searching","WithResults","AlreadyJoined","LongName"];export{o as AlreadyJoined,n as Empty,s as LongName,r as Searching,a as WithResults,A as __namedExportsOrder,O as default};
