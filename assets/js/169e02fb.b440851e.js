"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7225],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=u(n),m=i,f=d["".concat(l,".").concat(m)]||d[m]||p[m]||o;return n?r.createElement(f,a(a({ref:t},s),{},{components:n})):r.createElement(f,a({ref:t},s))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:i,a[1]=c;for(var u=2;u<o;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8562:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return s},default:function(){return d}});var r=n(7462),i=n(3366),o=(n(7294),n(3905)),a=["components"],c={sidebar_position:2},l="Reduction",u={unversionedId:"receiving-data/reduction",id:"receiving-data/reduction",isDocsHomePage:!1,title:"Reduction",description:"- reduction is the process of creating an instance from a document (c.f. documents and instances)",source:"@site/docs/02-receiving-data/reduction.md",sourceDirName:"02-receiving-data",slug:"/receiving-data/reduction",permalink:"/handbook/docs/receiving-data/reduction",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/02-receiving-data/reduction.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Documents and Instances",permalink:"/handbook/docs/receiving-data/documents-instances"},next:{title:"Data Persistence",permalink:"/handbook/docs/receiving-data/persistence"}},s=[{value:"Algorithm",id:"algorithm",children:[],level:2}],p={toc:s};function d(e){var t=e.components,n=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"reduction"},"Reduction"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"reduction is the process of creating an ",(0,o.kt)("em",{parentName:"li"},"instance")," from a ",(0,o.kt)("em",{parentName:"li"},"document")," (c.f. ",(0,o.kt)("a",{parentName:"li",href:"/docs/receiving-data/documents-instances"},"documents and instances"),")")),(0,o.kt)("h2",{id:"algorithm"},"Algorithm"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"preprocess the document graph by applying topological sorting to linearise the operation graph")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Deserialise all fields of the document's ",(0,o.kt)("em",{parentName:"li"},"create operation")," to produce an ",(0,o.kt)("em",{parentName:"li"},"instance")),(0,o.kt)("li",{parentName:"ol"},"If the next operation in the document is an ",(0,o.kt)("em",{parentName:"li"},"update operation"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"for every field in the operation",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"overwrite this field's contents on the instance with the contents from the operation"))))),(0,o.kt)("li",{parentName:"ol"},"If the next operation in the document is a ",(0,o.kt)("em",{parentName:"li"},"delete operation"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"remove the content on all fields of the instance"),(0,o.kt)("li",{parentName:"ul"},"mark the instance deleted"))),(0,o.kt)("li",{parentName:"ol"},"Stop reduction if there is no next known operation in the document"),(0,o.kt)("li",{parentName:"ol"},"Continue with step 2. otherwise")))}d.isMDXComponent=!0}}]);