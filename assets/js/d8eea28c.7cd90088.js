"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[563],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),f=l(r),m=a,d=f["".concat(p,".").concat(m)]||f[m]||s[m]||i;return r?n.createElement(d,o(o({ref:t},u),{},{components:r})):n.createElement(d,o({ref:t},u))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=f;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<i;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},2418:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>s,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const i={title:"Specification"},o=void 0,c={unversionedId:"about/specification",id:"about/specification",title:"Specification",description:"- the p2panda specification describes the protocol and the interfaces required to be implemented",source:"@site/docs/about/specification.md",sourceDirName:"about",slug:"/about/specification",permalink:"/handbook/about/specification",draft:!1,tags:[],version:"current",frontMatter:{title:"Specification"},sidebar:"about",previous:{title:"Implementations",permalink:"/handbook/about/implementations"},next:{title:"Roadmap",permalink:"/handbook/about/roadmap"}},p={},l=[],u={toc:l};function s(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"the p2panda specification describes the protocol and the interfaces required to be implemented"),(0,a.kt)("li",{parentName:"ul"},"give a short overview of what is described in the specification using less formal language"),(0,a.kt)("li",{parentName:"ul"},"history",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"when did we start?"),(0,a.kt)("li",{parentName:"ul"},"in what stages was the specification created?"),(0,a.kt)("li",{parentName:"ul"},"what is the history of names in p2panda"))),(0,a.kt)("li",{parentName:"ul"},"what is the future of this?",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"some parts of it can be extended in the future"),(0,a.kt)("li",{parentName:"ul"},"could be helpful to restrict the future also, pointing at the principals of our design")))))}s.isMDXComponent=!0}}]);