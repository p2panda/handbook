"use strict";(self.webpackChunkp2panda_website=self.webpackChunkp2panda_website||[]).push([[4486],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),p=l(n),m=o,y=p["".concat(s,".").concat(m)]||p[m]||u[m]||a;return n?r.createElement(y,i(i({ref:t},d),{},{components:n})):r.createElement(y,i({ref:t},d))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=p;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},8287:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return i},default:function(){return u},frontMatter:function(){return a},metadata:function(){return c},toc:function(){return l}});var r=n(3117),o=(n(7294),n(3905));const a={id:"discovery"},i="Discovery",c={unversionedId:"networking/discovery",id:"networking/discovery",title:"Discovery",description:"Discovery is in specification phase and has not been implemented yet.",source:"@site/docs/03-networking/discovery.md",sourceDirName:"03-networking",slug:"/networking/discovery",permalink:"/handbook/docs/networking/discovery",draft:!1,editUrl:"https://github.com/p2panda/handbook/edit/main/website/docs/03-networking/discovery.md",tags:[],version:"current",frontMatter:{id:"discovery"},sidebar:"docs",previous:{title:"Networking",permalink:"/handbook/docs/category/networking"},next:{title:"Replication",permalink:"/handbook/docs/networking/replication"}},s={},l=[{value:"Use Cases",id:"use-cases",level:2},{value:"Manual discovery",id:"manual-discovery",level:2},{value:"mDNS discovery",id:"mdns-discovery",level:2}],d={toc:l};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"discovery"},"Discovery"),(0,o.kt)("admonition",{title:"not implemented",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Discovery is in specification phase and has not been implemented yet.")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Discovery is the process by which ",(0,o.kt)("a",{parentName:"li",href:"/docs/writing-data/clients-nodes"},"nodes")," find other nodes and connect to them"),(0,o.kt)("li",{parentName:"ul"},"There is no global list of all existing nodes",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Nodes MUST NOT be required to register or sign up anywhere in order to start connecting to other nodes")))),(0,o.kt)("h2",{id:"use-cases"},"Use Cases"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Users who run and configure a node are ",(0,o.kt)("em",{parentName:"li"},"node operators")),(0,o.kt)("li",{parentName:"ul"},"Node operators can manually specify IP addresses of other nodes to connect to"),(0,o.kt)("li",{parentName:"ul"},"Node operators can choose to have their node broadcast connection parameters that allow other nodes to connect to it"),(0,o.kt)("li",{parentName:"ul"},"Nodes can be configured to broadcast connection parameters via DHT"),(0,o.kt)("li",{parentName:"ul"},"Nodes can be configured to broadcast connection parameters via mDNS")),(0,o.kt)("h2",{id:"manual-discovery"},"Manual discovery"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("em",{parentName:"li"},"Node operators can specify IP addresses and ports to replicate with"))),(0,o.kt)("h2",{id:"mdns-discovery"},"mDNS discovery"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("em",{parentName:"li"},"Nodes broadcast via mDNS that they are ready to replicate")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("em",{parentName:"li"},"enabled by default"))))}u.isMDXComponent=!0}}]);