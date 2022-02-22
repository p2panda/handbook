"use strict";(self.webpackChunkp2panda_website=self.webpackChunkp2panda_website||[]).push([[87],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return m}});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var u=a.createContext({}),p=function(e){var t=a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},s=function(e){var t=p(e.components);return a.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=p(r),m=n,f=d["".concat(u,".").concat(m)]||d[m]||c[m]||i;return r?a.createElement(f,o(o({ref:t},s),{},{components:r})):a.createElement(f,o({ref:t},s))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=d;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:n,o[1]=l;for(var p=2;p<i;p++)o[p]=r[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9084:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return l},contentTitle:function(){return u},metadata:function(){return p},toc:function(){return s},default:function(){return d}});var a=r(3117),n=r(102),i=(r(7294),r(3905)),o=["components"],l={id:"key-pairs"},u="Key Pairs",p={unversionedId:"writing-data/key-pairs",id:"writing-data/key-pairs",title:"Key Pairs",description:"- clients sign all published data with a user's key pair",source:"@site/docs/01-writing-data/key-pairs.md",sourceDirName:"01-writing-data",slug:"/writing-data/key-pairs",permalink:"/handbook/docs/writing-data/key-pairs",editUrl:"https://github.com/p2panda/handbook/edit/main/website/docs/01-writing-data/key-pairs.md",tags:[],version:"current",frontMatter:{id:"key-pairs"},sidebar:"docs",previous:{title:"Bamboo",permalink:"/handbook/docs/writing-data/bamboo"},next:{title:"Schemas",permalink:"/handbook/docs/writing-data/schemas"}},s=[{value:"Usage",id:"usage",children:[],level:2},{value:"Key Management",id:"key-management",children:[],level:2}],c={toc:s};function d(e){var t=e.components,r=(0,n.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"key-pairs"},"Key Pairs"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"clients sign all published data with a user's key pair"),(0,i.kt)("li",{parentName:"ul"},"p2panda uses Ed25519 key pairs"),(0,i.kt)("li",{parentName:"ul"},"refer to ",(0,i.kt)("a",{parentName:"li",href:"/docs/collaboration/overview"},"collaboration")," for further topics")),(0,i.kt)("h2",{id:"usage"},"Usage"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"p2panda clients create key pairs for their users",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"the p2panda library includes functionality to create key pairs"))),(0,i.kt)("li",{parentName:"ul"},"data recipients can identify the author of data from the public key and the signature on a ",(0,i.kt)("a",{parentName:"li",href:"/docs/writing-data/bamboo#entries"},"bamboo entry"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"the public key and signature are distributed alongside the data"))),(0,i.kt)("li",{parentName:"ul"},"data recipients can verify the integrity of data using the signature on bamboo entries")),(0,i.kt)("h2",{id:"key-management"},"Key Management"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"p2panda clients SHOULD generate a new key pair for every new usage context",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"the boundaries of a usage context are defined by",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"device storage"),(0,i.kt)("li",{parentName:"ul"},"software distribution"),(0,i.kt)("li",{parentName:"ul"},"trust"))))),(0,i.kt)("li",{parentName:"ul"},"p2panda clients SHOULD ensure that private keys cannot be read by adversaries"),(0,i.kt)("li",{parentName:"ul"},"p2panda clients SHOULD NOT require the transmission of a private key outside a usage context (e.g. to migrate a software installation)")))}d.isMDXComponent=!0}}]);