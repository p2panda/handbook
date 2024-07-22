"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[7918],{7065:(e,t,s)=>{s.d(t,{Z:()=>r});s(7294);var n=s(9114),a=s(5893);function r(e){let t;return"note"===e.type?t="\ud83d\udc27":"info"===e.type?t="\ud83d\udc3c":"caution"===e.type?t="\ud83c\udf29\ufe0f":"danger"===e.type?t="\ud83d\ude48":"tip"===e.type&&(t="\ud83d\udc3b\u200d\u2744\ufe0f"),(0,a.jsx)(n.Z,{icon:(0,a.jsx)("span",{className:"panda-icon",children:t}),...e})}},2320:(e,t,s)=>{s.d(t,{Z:()=>l});s(7294);var n=s(9524);const a={"icon-home":"icon-home_wWeS"};var r=s(5893);function l(){return(0,r.jsx)("img",{src:(0,n.Z)("/images/deepsea-panda.svg"),width:"30",className:a["icon-home"]})}},8912:(e,t,s)=>{s.d(t,{g:()=>y});var n=s(7294),a=s(3888);const r=e=>{let{children:t}=e;const[s,r]=(0,n.useState)(!1);return(0,n.useEffect)((()=>{(async()=>{await(0,a.Y2)(),r(!0)})()}),[]),s?t:null};var l=s(4096),c=s(3729),o=s(8227),i=s(5893);const d=e=>{let{header:t,sayHello:s}=e;return(0,i.jsxs)("header",{className:"header",children:[(0,i.jsx)("h1",{children:t}),s?(0,i.jsx)(l.m.Consumer,{children:e=>{let{publicKey:t}=e;return(0,i.jsxs)("p",{className:"public-key",children:["Hello, ",t,"!"]})}}):null]})},u=()=>{const{error:e}=(0,n.useContext)(c.E);return e?(0,i.jsx)("div",{className:"error",children:e}):null},h=()=>{const{success:e}=(0,n.useContext)(c.E);return e?(0,i.jsx)("div",{className:"success",children:e}):null},x=e=>{let{children:t,header:s}=e;return(0,i.jsxs)("div",{className:"app",children:[(0,i.jsx)(d,{header:s}),(0,i.jsx)("main",{children:t}),(0,i.jsx)(u,{}),(0,i.jsx)(h,{})]})},y=e=>{let{children:t,header:s="",sayHello:n=!1,endpoint:a}=e;return(0,i.jsx)(r,{children:(0,i.jsx)(l.f,{endpoint:a,children:(0,i.jsx)(c.x,{children:(0,i.jsx)(o.n,{children:(0,i.jsx)(x,{header:s,sayHello:n,children:t})})})})})}},3729:(e,t,s)=>{s.d(t,{E:()=>r,x:()=>l});var n=s(7294),a=s(5893);const r=n.createContext(),l=e=>{let{children:t}=e;const[s,l]=(0,n.useState)(null),[c,o]=(0,n.useState)(null);return(0,a.jsx)(r.Provider,{value:{error:s,setError:l,success:c,setSuccess:o},children:t})}},8227:(e,t,s)=>{s.d(t,{O:()=>o,n:()=>i});var n=s(7294),a=s(108),r=s(4096),l=s(3729),c=s(5893);const o=n.createContext(),i=e=>{let{children:t}=e;const{graphQLClient:s}=(0,n.useContext)(r.m),{setError:i}=(0,n.useContext)(l.E),[d,u]=(0,n.useState)();return(0,n.useEffect)((()=>{const e=setInterval((()=>{(async()=>{try{await s.request(a.Ps`
          query checkNode {
            all_schema_definition_v1 {
              totalCount
            }
          }
        `),d||(i(null),u(!0))}catch(e){d&&(u(!1),i("Node offline"))}})()}),1e3);return()=>clearInterval(e)}),[s,d,i]),(0,c.jsx)(o.Provider,{value:{nodeOnline:d},children:t})}},4096:(e,t,s)=>{s.d(t,{f:()=>d,m:()=>i});var n=s(7294),a=s(3888),r=s(108),l=s(5893);const c="privateKey",o="http://localhost:2020";const i=n.createContext({publicKey:null,keyPair:null,session:null,graphQLClient:null,endpoint:null}),d=e=>{let{children:t,endpoint:s=o}=e;const[d,u]=(0,n.useState)(s),h=(0,n.useMemo)((()=>{const e=function(){const e=window.localStorage.getItem(c);if(e)return new a.sx(e);const t=new a.sx;return window.localStorage.setItem(c,t.privateKey()),t}(),t=new a.z_(`${d}/graphql`).setKeyPair(e),s=new r.g6(`${d}/graphql`);return{keyPair:e,publicKey:e.publicKey(),session:t,graphQLClient:s,ep:d}}),[d]);return(0,n.useEffect)((()=>{const e=setInterval((()=>{window.ENDPOINT&&window.ENDPOINT!=s&&u(window.ENDPOINT)}),1e3);return function(){clearInterval(e)}})),(0,l.jsx)(i.Provider,{value:h,children:t})}},8008:(e,t,s)=>{s.d(t,{Eo:()=>l,O6:()=>r,YE:()=>a,kw:()=>n});const n="/schemas/query-tutorial/schema.lock",a="vocabulary_0020840f74f3a3ca502c80b12ba54e5738c435d27e9c0717214a38173a3e31a75752",r="study_sets_002055142f8a42052fe558891fb33b707fa16367ae4ebba876ba900cf4870a352ad6",l="study_set_members_0020c2500c3088b01a98f4a7cfdab6037371ac64d4b929d4677daf39a3aa0c257612"},1022:(e,t,s)=>{s.d(t,{m:()=>c});var n=s(7294),a=s(4096),r=s(3729),l=s(5893);const c=e=>{let{createCafe:t}=e;const{session:s}=(0,n.useContext)(a.m),{setError:c,setSuccess:o}=(0,n.useContext)(r.E),[i,d]=(0,n.useState)({address:"123 Yummy St.",name:"Ice Cream Heaven",opening_year:2020}),u=e=>{const{name:t,value:s}=e.target;d((e=>({...e,[t]:"edible"===t?!e.edible:s})))},h=!i.address||!i.name||!i.opening_year;return(0,l.jsxs)("div",{className:"cafe-form",children:[(0,l.jsx)("h2",{children:"Create Cafe"}),(0,l.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),c(null),o(null);let n=null;try{n=await t(s,i)}catch(a){return void c(a.message)}o(`Created Cafe: ${n}`)},children:[(0,l.jsxs)("fieldset",{children:[(0,l.jsx)("label",{htmlFor:"name",children:"name"}),(0,l.jsx)("input",{type:"text",id:"name",name:"name",value:i.name,onChange:u})]}),(0,l.jsxs)("fieldset",{children:[(0,l.jsx)("label",{htmlFor:"address",children:"Address"}),(0,l.jsx)("input",{type:"text",id:"address",name:"address",value:i.address,onChange:u})]}),(0,l.jsxs)("fieldset",{children:[(0,l.jsx)("label",{htmlFor:"opening_year",children:"Opening Year"}),(0,l.jsx)("input",{type:"number",id:"latin",name:"opening_year",value:i.opening_year,onChange:u})]}),(0,l.jsx)("input",{type:"submit",value:"Create",disabled:h})]})]})}},50:(e,t,s)=>{s.d(t,{ZP:()=>l});var n=s(7294),a=s(748),r=s(5893);const l={React:n,...n,App:function(e){return(0,r.jsx)(a.Z,{fallback:(0,r.jsx)("div",{children:"..."}),children:()=>{const t=s(8912).g;return(0,r.jsx)(t,{...e})}})},CafeForm:function(e){return(0,r.jsx)(a.Z,{fallback:(0,r.jsx)("div",{children:"..."}),children:()=>{const t=s(1022).m;return(0,r.jsx)(t,{...e})}})},StudySetForm:function(e){return(0,r.jsx)(a.Z,{fallback:(0,r.jsx)("div",{children:"..."}),children:()=>{const t=s(9017).k;return(0,r.jsx)(t,{...e})}})},Query:function(e){return(0,r.jsx)(a.Z,{fallback:(0,r.jsx)("div",{children:"..."}),children:()=>{const t=s(3963).A;return(0,r.jsx)(t,{...e})}})},BootstrapNode:function(e){return(0,r.jsx)(a.Z,{fallback:(0,r.jsx)("div",{children:"..."}),children:()=>{const t=s(3907).P;return(0,r.jsx)(t,{...e})}})},PaginatedQuery:function(e){return(0,r.jsx)(a.Z,{fallback:(0,r.jsx)("div",{children:"..."}),children:()=>{const t=s(6701).M;return(0,r.jsx)(t,{...e})}})}}},3907:(e,t,s)=>{s.d(t,{P:()=>h});var n=s(7294),a=s(5424),r=s.n(a),l=s(108),c=(s(8946),s(4096)),o=s(3729),i=s(8227),d=s(8008),u=s(5893);const h=()=>{const{session:e,graphQLClient:t}=(0,n.useContext)(c.m),{nodeOnline:s}=(0,n.useContext)(i.O),{setError:a}=(0,n.useContext)(o.E),[h,x]=(0,n.useState)(!1),[y,m]=(0,n.useState)(!1),[f,j]=(0,n.useState)(!1),[p,b]=(0,n.useState)(!1);(0,n.useEffect)((()=>{s||(j(!1),x(!1))}),[s]),(0,n.useEffect)((()=>{if(!h){const e=setInterval((()=>{(async()=>{try{let e=!1;for(const s of[d.O6,d.YE])(await t.request(l.Ps`
            query {
              all_${s} {
                totalCount
              }
            }
          `))[`all_${s}`].totalCount>0&&(e=!0);x(!0),j(e)}catch{x(!1),j(!1)}})()}),1e3);return()=>clearInterval(e)}}),[t,s,h,a]);const v=!s||y||h||p,C=!s||!h||f||p;return(0,u.jsxs)("div",{id:"bootstrap-node",children:[(0,u.jsxs)("div",{children:["node online:",s?(0,u.jsx)("span",{children:" \u2705"}):(0,u.jsx)("span",{children:" \u274c"})]}),(0,u.jsxs)("div",{children:["schema deployed:",h?(0,u.jsx)("span",{children:" \u2705"}):(0,u.jsx)("span",{children:" \u274c"})]}),(0,u.jsxs)("div",{children:["seed data published:"," ",f?(0,u.jsx)("span",{children:" \u2705"}):(0,u.jsx)("span",{children:" \u274c"})]}),(0,u.jsx)("button",{disabled:v,onClick:async()=>{try{b(!0);const t=await fetch(d.kw),s=await t.text(),n=r().parse(s);for(const{entry:a,operation:r}of Array.from(n.commits))await e.publish(a,r);m(!0)}catch(t){a(`${t}`),m(!1)}finally{b(!1)}},children:"Deploy Schema"}),(0,u.jsx)("button",{disabled:C,onClick:async()=>{try{b(!0);for(const t of[d.O6,d.YE]){const s=await fetch(`/seed-data/${t}.json`),n=await s.json();for(const a of n)await e.create(a,{schemaId:t})}j(!0)}catch(t){j(!1),a(`${t}`)}finally{b(!1)}},children:"Publish Seed Data"})]})}},6701:(e,t,s)=>{s.d(t,{M:()=>i});var n=s(7294),a=s(108),r=s(4096),l=s(3729),c=s(8008),o=s(5893);const i=e=>{let{queryBuilder:t}=e;const{graphQLClient:s}=(0,n.useContext)(r.m),{setError:i}=(0,n.useContext)(l.E),[d,u]=(0,n.useState)([]),[h,x]=(0,n.useState)(null),[y,m]=(0,n.useState)(null),[f,j]=(0,n.useState)(0),p=(0,n.useCallback)((async e=>{const n=t(e);try{let e=await s.request(a.Ps`
          ${n}
        `);e=e[`all_${c.YE}`],x(e.endCursor),u(e.documents),m(e.hasNextPage),j(f+1)}catch(r){i(`${r}`)}}),[f,s,t,i]);(0,n.useEffect)((()=>{h||p(h)}),[h,p]);return(0,o.jsxs)("div",{className:"vocabulary-pagination",children:[(0,o.jsx)("h2",{children:"Vocabulary"}),(0,o.jsx)("fieldset",{children:(0,o.jsx)("select",{id:"vocabulary",name:"vocabulary",size:d.length,children:d?d.map(((e,t)=>{const s=Number(d.length*(f-1))+t,n=e.meta.documentId,a=e.fields.word;return(0,o.jsxs)("option",{children:[s,": ",a]},n)})):(0,o.jsx)("option",{value:"",children:"no data"},0)})}),(0,o.jsx)("button",{disabled:!y,onClick:e=>{e.preventDefault(),p(h)},children:"Next Page"})]})}},3963:(e,t,s)=>{s.d(t,{A:()=>i});var n=s(7294),a=s(108),r=s(9123),l=(s(8946),s(4096)),c=s(3729),o=s(5893);const i=e=>{let{query:t}=e;const[s,i]=(0,n.useState)("No results, is your node online?"),{graphQLClient:d}=(0,n.useContext)(l.m),{setError:u}=(0,n.useContext)(c.E),h=(0,n.useCallback)((async()=>{try{const e=await d.request(a.Ps`
        ${t}
      `);i(e)}catch(e){u(`${e}`)}}),[d,t,u]);return(0,n.useEffect)((()=>{h()}),[h]),(0,o.jsxs)("div",{id:"query-tutorial-results",children:[(0,o.jsx)("button",{onClick:h,children:"\u21bb"}),(0,o.jsx)(r.ZP,{src:s,theme:"default"})]})}},9017:(e,t,s)=>{s.d(t,{k:()=>u});var n=s(7294),a=s(3888),r=s(108),l=s(4096),c=s(3729),o=s(8008),i=s(8227),d=s(5893);const u=e=>{let{studySetsQuery:t}=e;const{graphQLClient:s,session:i}=(0,n.useContext)(l.m),{setError:u,setSuccess:x}=(0,n.useContext)(c.E),[y,m]=(0,n.useState)(null),[f,j]=(0,n.useState)([]),p=(0,n.useCallback)((async()=>{try{j(!0);const e=await s.request(r.Ps`
        ${t}
      `),n=Array.from(e[`all_${o.O6}`].documents);m(n),u(null)}catch(e){u(`${e}`)}finally{j(!1)}}),[s,u,t]);(0,n.useEffect)((()=>{t&&p()}),[s,m,u,t,p]);return(0,d.jsx)(h,{studySets:y,onAddVocabulary:async(e,t)=>{u(null),x(null);try{j(!0);const s=Number((new Date).getTime()),n=new a.F9({date_added:s,last_studied:s});n.insert("member","relation",e),n.insert("study_set","relation",t),n.insert("rating","float",0);const r=await i.create(n,{schemaId:o.Eo});x(`Created study set member with document id: ${r}`)}catch(s){u(s.message)}finally{j(!1)}},onRefresh:p,busy:f})},h=e=>{let{studySets:t,onAddVocabulary:s,busy:a,onRefresh:r}=e;const{nodeOnline:l}=(0,n.useContext)(i.O),[c,o]=(0,n.useState)({studySet:"",vocabulary:""}),u=e=>{const{name:t,value:s}=e.target;o((e=>({...e,[t]:s})))},h=!c.studySet||!c.vocabulary||a||!l;return(0,d.jsxs)("div",{id:"study-sets-form",children:[(0,d.jsx)("div",{className:"button-wrapper",children:(0,d.jsx)("button",{disabled:h,onClick:r,children:"\u21bb"})}),(0,d.jsxs)("form",{onSubmit:e=>{e.preventDefault(),s(c.vocabulary,c.studySet),o({studySet:"",vocabulary:""})},children:[(0,d.jsxs)("fieldset",{children:[(0,d.jsx)("label",{htmlFor:"studySet",children:"Study Sets"}),(0,d.jsx)("select",{disabled:h,id:"studySet",name:"studySet",size:3,value:c.studySet,onChange:u,children:t?t.map((e=>{const t=e.meta.documentId,s=e.fields.title;return(0,d.jsx)("option",{value:t,children:s},t)})):(0,d.jsx)("option",{value:"",children:"no study sets found..."},0)})]}),(0,d.jsxs)("fieldset",{children:[(0,d.jsx)("label",{htmlFor:"vocabulary",children:"Vocabulary ID"}),(0,d.jsx)("input",{disabled:h,type:"text",id:"vocabulary",name:"vocabulary",value:c.vocabulary,onChange:u})]}),(0,d.jsx)("input",{type:"submit",value:"Add",disabled:h})]})]})}}}]);