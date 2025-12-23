import{j as e}from"./jsx-runtime-u17CrQMm.js";const d=({title:l,completed:i,total:t,highlights:n=[]})=>{const o=t===0?0:Math.round(i/t*100);return e.jsxs("article",{className:"chore-card","aria-live":"polite",children:[e.jsxs("header",{className:"chore-card__header",children:[e.jsx("p",{className:"chore-card__eyebrow",children:"今週の家事"}),e.jsx("h3",{className:"chore-card__title",children:l})]}),e.jsxs("div",{className:"chore-card__progress",children:[e.jsxs("p",{id:`chore-progress-${l}`,className:"chore-card__progress-label","aria-hidden":"true",children:[i," / ",t," 件完了 (",o,"%)"]}),e.jsx("div",{className:"chore-card__progress-bar",role:"progressbar","aria-valuenow":o,"aria-valuemin":0,"aria-valuemax":100,"aria-labelledby":`chore-progress-${l}`,children:e.jsx("div",{className:"chore-card__progress-value",style:{width:`${String(o)}%`}})})]}),n.length>0&&e.jsx("dl",{className:"chore-card__highlights",children:n.map(c=>e.jsxs("div",{className:"chore-card__highlight",children:[e.jsx("dt",{children:c.label}),e.jsx("dd",{children:c.value})]},c.label))})]})};d.__docgenInfo={description:"",methods:[],displayName:"ChoreSummaryCard",props:{title:{required:!0,tsType:{name:"string"},description:""},completed:{required:!0,tsType:{name:"number"},description:""},total:{required:!0,tsType:{name:"number"},description:""},highlights:{required:!1,tsType:{name:"Array",elements:[{name:"Highlight"}],raw:"Highlight[]"},description:"",defaultValue:{value:"[]",computed:!1}}}};const h={component:d,parameters:{layout:"centered"},args:{title:"水回り＋リビング",completed:7,total:10,highlights:[{label:"最終更新",value:"12/22 21:30"},{label:"次の担当",value:"ナツキ"}]}},r={},a={args:{title:"週次タスク",completed:12,total:12,highlights:[{label:"最終更新",value:"12/23 06:10"},{label:"ご褒美",value:"映画ナイト"}]}},s={args:{title:"新しいタスク",completed:0,total:0,highlights:[{label:"メモ",value:"まだ割り当てがありません"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: "週次タスク",
    completed: 12,
    total: 12,
    highlights: [{
      label: "最終更新",
      value: "12/23 06:10"
    }, {
      label: "ご褒美",
      value: "映画ナイト"
    }]
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: "新しいタスク",
    completed: 0,
    total: 0,
    highlights: [{
      label: "メモ",
      value: "まだ割り当てがありません"
    }]
  }
}`,...s.parameters?.docs?.source}}};const p=["Default","FullCompletion","EmptyState"];export{r as Default,s as EmptyState,a as FullCompletion,p as __namedExportsOrder,h as default};
