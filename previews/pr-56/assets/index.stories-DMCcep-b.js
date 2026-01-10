import{G as s}from"./index-BWyqkCh6.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-CIxqpyXR.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BKtDPDeF.js";import"./index-BMpUdpSS.js";import"./index-DvXmAuT-.js";import"./index-5CEtQEnt.js";import"./index-D49ke3df.js";import"./x-BLRTAPut.js";import"./createLucideIcon-22kY4Ljd.js";import"./check-C6j62bpt.js";import"./user-plus-DYISoNlU.js";import"./search-H6XBlLAB.js";const i=o=>{},t=o=>{},R={component:s,parameters:{layout:"centered"},args:{open:!0,groupName:"永井家",onOpenChange:i,onSearch:t,isSearching:!1,searchResults:[],searchError:"",onClearSearchError:()=>{}}},e={args:{}},r={args:{isSearching:!0}},n={args:{searchResults:[{id:"1",name:"佐藤 太郎",email:"sato@example.com",image_url:null,is_invited_or_belonging:!1},{id:"2",name:"田中 花子",email:"hanako@example.com",image_url:null,is_invited_or_belonging:!1}],onInvite:o=>{console.log("invite",o)}}},a={args:{searchResults:[{id:"1",name:"佐藤 太郎",email:"sato@example.com",image_url:null,is_invited_or_belonging:!0},{id:"2",name:"田中 花子",email:"hanako@example.com",image_url:null,is_invited_or_belonging:!0}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isSearching: true
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const y=["Empty","Searching","WithResults","AlreadyJoined"];export{a as AlreadyJoined,e as Empty,r as Searching,n as WithResults,y as __namedExportsOrder,R as default};
