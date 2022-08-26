"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[651],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),p=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return i.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=a,h=d["".concat(s,".").concat(m)]||d[m]||c[m]||r;return n?i.createElement(h,o(o({ref:t},u),{},{components:n})):i.createElement(h,o({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<r;p++)o[p]=n[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1548:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var i=n(7462),a=(n(7294),n(4137));const r={id:"publishing",title:"Publishing"},o=void 0,l={unversionedId:"specification/APIs/publishing",id:"specification/APIs/publishing",title:"Publishing",description:"- clients use two GraphQL operations for publishing entries:",source:"@site/docs/specification/APIs/publishing.md",sourceDirName:"specification/APIs",slug:"/specification/APIs/publishing",permalink:"/handbook/specification/APIs/publishing",draft:!1,tags:[],version:"current",frontMatter:{id:"publishing",title:"Publishing"},sidebar:"specification",previous:{title:"Overview",permalink:"/handbook/specification/APIs/apis-overview"},next:{title:"Queries",permalink:"/handbook/specification/APIs/queries"}},s={},p=[{value:"<code>nextArgs</code>",id:"nextargs",level:2},{value:"<code>publish</code>",id:"publish",level:2},{value:"Response",id:"response",level:2}],u={toc:p};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"clients use two GraphQL operations for publishing entries:",(0,a.kt)("ol",{parentName:"li"},(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"#nextargs"},(0,a.kt)("inlineCode",{parentName:"a"},"nextArgs"))," query to retrieve parameters required for encoding an entry"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"#publish"},(0,a.kt)("inlineCode",{parentName:"a"},"publish"))," mutation to publish a signed and encoded entry together with its payload")))),(0,a.kt)("h2",{id:"nextargs"},(0,a.kt)("inlineCode",{parentName:"h2"},"nextArgs")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"returns parameters required for encoding new entries",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"implementations must not have side effects"))),(0,a.kt)("li",{parentName:"ul"},"clients can't encode new entries without information from this endpoint because every entry needs to place itself in the first unused sequence number of a specific ",(0,a.kt)("a",{parentName:"li",href:"/specification/data-types/bamboo"},(0,a.kt)("em",{parentName:"a"},"bamboo log"))," and also it needs to include the hashes of specific previous entries in its encoding",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"this information is held by the node"))),(0,a.kt)("li",{parentName:"ul"},"clients may cache the arguments required for the next entry (they are also returned by ",(0,a.kt)("inlineCode",{parentName:"li"},"publish"),")"),(0,a.kt)("li",{parentName:"ul"},"clients may also persist their entry logs locally to avoid any dependency for retrieving entry arguments of nodes at all"),(0,a.kt)("li",{parentName:"ul"},"clients must set the ",(0,a.kt)("inlineCode",{parentName:"li"},"viewId")," input variable to receive arguments for encoding an ",(0,a.kt)("inlineCode",{parentName:"li"},"UPDATE")," or ",(0,a.kt)("inlineCode",{parentName:"li"},"DELETE")," operation.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"clients must not set this when they want to encode a ",(0,a.kt)("inlineCode",{parentName:"li"},"CREATE")," operation")))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},'query nextArgs(\n  """\n  public key of the author signing and encoding the next entry\n  """\n  publicKey: PublicKey!\n\n  """\n  any view id from the document that will be updated or deleted with the next entry. leave empty to receive arguments for creating a new document.\n  """\n  viewId: ViewId\n): NextArguments!\n')),(0,a.kt)("h2",{id:"publish"},(0,a.kt)("inlineCode",{parentName:"h2"},"publish")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"if a ",(0,a.kt)("inlineCode",{parentName:"li"},"publish")," request is accepted by a node it must publish the entry supplied with the request by taking the following steps:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"the node must validate the received entry and operation by checking if:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"the entry adheres to the ",(0,a.kt)("a",{parentName:"li",href:"/specification/data-types/bamboo"},"bamboo specification")," and has a valid signature and log integrity"),(0,a.kt)("li",{parentName:"ul"},"the operation adheres to the ",(0,a.kt)("a",{parentName:"li",href:"/specification/data-types/operations"},"operation specification")),(0,a.kt)("li",{parentName:"ul"},"the operation is linked to the entry with a correct payload hash and size"))),(0,a.kt)("li",{parentName:"ul"},"the node should persist the entry and operation and make it available to other nodes via ",(0,a.kt)("a",{parentName:"li",href:"/specification/APIs/replication"},"replication")),(0,a.kt)("li",{parentName:"ul"},"the node may ",(0,a.kt)("a",{parentName:"li",href:"/specification/data-types/documents#reduction"},"materialise")," the document this new operation belongs to, resulting in a new document view"))),(0,a.kt)("li",{parentName:"ul"},"returns entry arguments required for publishing the next entry for the same document, similar to ",(0,a.kt)("inlineCode",{parentName:"li"},"nextArgs")),(0,a.kt)("li",{parentName:"ul"},"returns an error",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"when the bamboo log, signature or document integrity could not be verified, the operation was malformed or schema not fullfilled"),(0,a.kt)("li",{parentName:"ul"},"when the node is unable to persist the entry and operation at the moment")))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},'mutation publish(\n  """\n  CBOR representation of a signed Bamboo entry, encoded as a hexadecimal string\n  """\n  entry: EncodedEntry!\n\n  """\n  CBOR representation of an p2panda operation, the payload of the Bamboo entry,\n  encoded as a hexadecimal string\n  """\n  operation: EncodedOperation!\n): NextArguments!\n')),(0,a.kt)("h2",{id:"response"},"Response"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"both ",(0,a.kt)("inlineCode",{parentName:"li"},"publish")," and ",(0,a.kt)("inlineCode",{parentName:"li"},"nextArgs")," return the arguments for encoding and signing the next entry as a response")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},'type NextArguments {\n    """\n    log id to be used to forge the next entry\n    """\n    logId: LogId!\n\n    """\n    sequence number to be used to forge the next entry\n    """\n    seqNum: SeqNum!\n\n    """\n    optional backlink hash to be used to forge the next entry\n    """\n    backlink: EntryHash\n\n    """\n    optional skiplink hash to be used to forge the next entry\n    """\n    skiplink: EntryHash\n}\n')))}c.isMDXComponent=!0}}]);