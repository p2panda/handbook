"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[8251],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var i=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=i.createContext({}),c=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return i.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,f=d["".concat(s,".").concat(m)]||d[m]||u[m]||a;return n?i.createElement(f,o(o({ref:t},p),{},{components:n})):i.createElement(f,o({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var c=2;c<a;c++)o[c]=n[c];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7853:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var i=n(7462),r=(n(7294),n(4137));const a={id:"overview",title:"Overview"},o=void 0,l={unversionedId:"specification/APIs/overview",id:"specification/APIs/overview",title:"Overview",description:"- Clients send queries to nodes in order to publish new entries and query materialised documents",source:"@site/docs/specification/APIs/overview.md",sourceDirName:"specification/APIs",slug:"/specification/APIs/overview",permalink:"/specification/APIs/overview",draft:!1,tags:[],version:"current",frontMatter:{id:"overview",title:"Overview"},sidebar:"specification",previous:{title:"Encryption",permalink:"/specification/encryption"},next:{title:"Publishing",permalink:"/specification/APIs/publishing"}},s={},c=[{value:"Client API (publishing &amp; queries)",id:"client-api-publishing--queries",level:2},{value:"Replication API",id:"replication-api",level:2}],p={toc:c};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Clients send ",(0,r.kt)("em",{parentName:"li"},"queries")," to nodes in order to publish new entries and query materialised documents"),(0,r.kt)("li",{parentName:"ul"},"Queries are sent via HTTP using the ",(0,r.kt)("a",{parentName:"li",href:"https://graphql.org/"},"GraphQL")," language"),(0,r.kt)("li",{parentName:"ul"},"Serving a GraphQL API and handling requests is implemented in ",(0,r.kt)("a",{parentName:"li",href:"/specification/networking/clients-nodes"},"nodes"),", for example ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/p2panda/aquadoggo"},"Aquadoggo")),(0,r.kt)("li",{parentName:"ul"},"Nodes use the same GraphQL API to talk to each other, you can read more about it under ",(0,r.kt)("a",{parentName:"li",href:"/specification/APIs/replication"},"replication")),(0,r.kt)("li",{parentName:"ul"},"Large numbers are encoded as strings in the payloads (",(0,r.kt)("inlineCode",{parentName:"li"},"logId")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"seqNum"),") to account for the lack of support to represent u64 integers in JSON")),(0,r.kt)("h2",{id:"client-api-publishing--queries"},"Client API (publishing & queries)"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The client api is the interface for communication between ",(0,r.kt)("a",{parentName:"li",href:"/specification/networking/clients-nodes"},"node and client")),(0,r.kt)("li",{parentName:"ul"},"Clients can publish entries",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Before that, clients can retrieve parameters required for encoding entries if they can't compute them independently"))),(0,r.kt)("li",{parentName:"ul"},"Clients can retrieve materialised ",(0,r.kt)("a",{parentName:"li",href:"/specification/data-types/documents"},"documents")," of a given schema",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Documents can be filtered by individual fields"),(0,r.kt)("li",{parentName:"ul"},"Linked documents can be retrieved"),(0,r.kt)("li",{parentName:"ul"},"Documents can be sorted by arbitrary fields"),(0,r.kt)("li",{parentName:"ul"},"Documents can be sorted by self-referential orderings"),(0,r.kt)("li",{parentName:"ul"},"Documents can be queried by ",(0,r.kt)("inlineCode",{parentName:"li"},"document_view_id")," in order to receive a ","[documents][view]"," onto its data at a specific materialised state")))),(0,r.kt)("h2",{id:"replication-api"},"Replication API"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"This api consists of GraphQL queries for other nodes to ask about the state of Bamboo logs, entries and payloads",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"These queries are enough to build a flexible replication protocol on top"))),(0,r.kt)("li",{parentName:"ul"},"Nodes need to implement the API specifications to make sure they are compatible with all other node and client implementations. The Node API is specified here, the Client API is further specified under ","[queries][queries]",", both APIs reside inside nodes")))}u.isMDXComponent=!0}}]);