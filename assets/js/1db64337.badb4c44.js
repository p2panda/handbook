"use strict";(self.webpackChunkp2panda_website=self.webpackChunkp2panda_website||[]).push([[372],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(n),m=r,b=u["".concat(s,".").concat(m)]||u[m]||d[m]||i;return n?a.createElement(b,o(o({ref:t},p),{},{components:n})):a.createElement(b,o({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6777:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return u}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={sidebar_position:1,slug:"/"},s="Overview",c={unversionedId:"overview",id:"overview",isDocsHomePage:!1,title:"Overview",description:"p2panda lets you build applications connected by a feature-rich decentralised database with built-in identity and encryption providers. p2panda is playful, local-first, ressource-efficient, interconnected and hackable.",source:"@site/docs/overview.md",sourceDirName:".",slug:"/",permalink:"/handbook/docs/",editUrl:"https://github.com/p2panda/handbook/edit/main/website/docs/overview.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,slug:"/"},sidebar:"tutorialSidebar",next:{title:"Encoding",permalink:"/handbook/docs/writing-data/encoding"}},p=[{value:"Limitations",id:"limitations",children:[],level:2},{value:"Handbook",id:"handbook",children:[],level:2},{value:"Reading notes",id:"reading-notes",children:[],level:2}],d={toc:p};function u(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"overview"},"Overview"),(0,i.kt)("p",null,"p2panda lets you build applications connected by a feature-rich decentralised database with built-in identity and encryption providers. p2panda is playful, local-first, ressource-efficient, interconnected and hackable."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"build applications without managing servers"),(0,i.kt)("li",{parentName:"ul"},"users own their data and can take it everywhere they want: open data schemas allow access to the same data from multiple applications simultaneously"),(0,i.kt)("li",{parentName:"ul"},"strong encryption capabilities based on OpenMLS enable end-to-encryption, also in groups of arbitrary size, with post-compromise security and optional forward secrecy"),(0,i.kt)("li",{parentName:"ul"},"ready for local-first applications that work offline and with unstable internet connections "),(0,i.kt)("li",{parentName:"ul"},"flexible network topologies from fully distributed serverless systems to federated server-based systems accessible from web or thin mobile clients"),(0,i.kt)("li",{parentName:"ul"},"built-in identity provider that lets users authenticate from multiple devices without creating accounts based on an email and password"),(0,i.kt)("li",{parentName:"ul"},"implemented in Rust but also available in Javascript and TypeScript through WebAssembly bindings with a comfortable TypeScript interface")),(0,i.kt)("h2",{id:"limitations"},"Limitations"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"p2panda is gossip-based: without good connectivity between nodes data may only become available much later or not become available as all"),(0,i.kt)("li",{parentName:"ul"},"data is lost when no node has a copy of it anymore"),(0,i.kt)("li",{parentName:"ul"},"p2panda's multi-user capabilities may cause data to be overwritten when multiple users change the same data at the same time"),(0,i.kt)("li",{parentName:"ul"},"p2panda allows deleting data you published by broadcasting a deletion request, however hacked nodes may not honor these requests")),(0,i.kt)("h2",{id:"handbook"},"Handbook"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the handbook contains detailled descriptions of all capabilities of p2panda and contains references to technical specifications, examples and additional resources "),(0,i.kt)("li",{parentName:"ul"},"you can start reading the handbook from the beginning to learn bit by bit or directly jump to sections of interest"),(0,i.kt)("li",{parentName:"ul"},"what other ressources should the reader know about?")),(0,i.kt)("h2",{id:"reading-notes"},"Reading notes"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"p2panda")," refers to ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/p2panda/p2panda"},"the p2panda library"))))}u.isMDXComponent=!0}}]);