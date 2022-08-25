"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[489],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>y});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,c=e.originalType,p=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),u=s(r),y=o,m=u["".concat(p,".").concat(y)]||u[y]||f[y]||c;return r?n.createElement(m,i(i({ref:t},l),{},{components:r})):n.createElement(m,i({ref:t},l))}));function y(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=r.length,i=new Array(c);i[0]=u;var a={};for(var p in t)hasOwnProperty.call(t,p)&&(a[p]=t[p]);a.originalType=e,a.mdxType="string"==typeof e?e:o,i[1]=a;for(var s=2;s<c;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},9613:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>f,frontMatter:()=>c,metadata:()=>a,toc:()=>s});var n=r(7462),o=(r(7294),r(3905));const c={id:"encryption",title:"Encryption"},i=void 0,a={unversionedId:"specification/core-concepts/encryption",id:"specification/core-concepts/encryption",title:"Encryption",description:"- p2panda uses MLS for encryption, which allows efficient group encryption with forward-secrecy and post-compromise security",source:"@site/docs/specification/core-concepts/encryption.md",sourceDirName:"specification/core-concepts",slug:"/specification/core-concepts/encryption",permalink:"/handbook/specification/core-concepts/encryption",draft:!1,tags:[],version:"current",frontMatter:{id:"encryption",title:"Encryption"},sidebar:"specification",previous:{title:"Schemas",permalink:"/handbook/specification/core-concepts/concepts-schemas"},next:{title:"Permissions",permalink:"/handbook/specification/core-concepts/permissions"}},p={},s=[{value:"Specification",id:"specification",level:2}],l={toc:s};function f(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"p2panda uses ",(0,o.kt)("a",{parentName:"li",href:"https://messaginglayersecurity.rocks/"},"MLS")," for encryption, which allows efficient group encryption with forward-secrecy and post-compromise security")),(0,o.kt)("h2",{id:"specification"},"Specification"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"see the ",(0,o.kt)("a",{parentName:"li",href:"https://laub.liebechaos.org/BmT9pLorTOeu5SsV-4vp6w"},"draft secret group spec")," for more detailled information")))}f.isMDXComponent=!0}}]);