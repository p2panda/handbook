"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[460],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var p=n.createContext({}),s=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=s(a),u=i,h=c["".concat(p,".").concat(u)]||c[u]||m[u]||r;return a?n.createElement(h,o(o({ref:t},d),{},{components:a})):n.createElement(h,o({ref:t},d))}));function u(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=c;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var s=2;s<r;s++)o[s]=a[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},3963:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>m,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var n=a(7462),i=(a(7294),a(3905));const r={id:"operations",title:"Operations"},o=void 0,l={unversionedId:"specification/data-types/operations",id:"specification/data-types/operations",title:"Operations",description:"- operations represent data changes",source:"@site/docs/specification/data-types/operations.md",sourceDirName:"specification/data-types",slug:"/specification/data-types/operations",permalink:"/handbook/specification/data-types/operations",draft:!1,tags:[],version:"current",frontMatter:{id:"operations",title:"Operations"},sidebar:"specification",previous:{title:"Key Pairs",permalink:"/handbook/specification/data-types/key-pairs"},next:{title:"Schemas",permalink:"/handbook/specification/data-types/schemas"}},p={},s=[{value:"Fields",id:"fields",level:2},{value:"Encoding",id:"encoding",level:2},{value:"Usage",id:"usage",level:2}],d={toc:s};function m(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"operations represent data changes"),(0,i.kt)("li",{parentName:"ul"},"operations are published as the payload of ",(0,i.kt)("em",{parentName:"li"},"bamboo entries")),(0,i.kt)("li",{parentName:"ul"},"operations are identified by the hash of their bamboo entry",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"this is referred to as the ",(0,i.kt)("em",{parentName:"li"},"operation id")))),(0,i.kt)("li",{parentName:"ul"},"every operation is associated with a ",(0,i.kt)("a",{parentName:"li",href:"/specification/data-types/key-pairs"},"bamboo author"),", which is encoded in the operation's ",(0,i.kt)("em",{parentName:"li"},"entry")),(0,i.kt)("li",{parentName:"ul"},"every operation MUST have an ",(0,i.kt)("em",{parentName:"li"},"operation version"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"it describes the version of the operation specification that is followed by that operation"),(0,i.kt)("li",{parentName:"ul"},"this write-up represents the operation specification version 1"))),(0,i.kt)("li",{parentName:"ul"},"every operation MUST have an ",(0,i.kt)("em",{parentName:"li"},"operation action"),", which MUST be one of",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"0")," - results in a CREATE operation"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"1")," - results in an UPDATE operation"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"2")," - results in a DELETE operation"))),(0,i.kt)("li",{parentName:"ul"},"every operation MUST have a ",(0,i.kt)("a",{parentName:"li",href:"/specification/data-types/schemas"},"schema id")),(0,i.kt)("li",{parentName:"ul"},"every DELETE and UPDATE operation MUST have ",(0,i.kt)("em",{parentName:"li"},"previous operations")," with ",(0,i.kt)("inlineCode",{parentName:"li"},"length > 0"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"it contains an array of ",(0,i.kt)("em",{parentName:"li"},"operation_id"),"'s which identify the tip operation of any un-merged branches in this document graph",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"this is also known as a ",(0,i.kt)("em",{parentName:"li"},"document_view_id")))),(0,i.kt)("li",{parentName:"ul"},"in the case where a graph has no un-merged branches, this array will contain only one id (the resolved graph tip)"),(0,i.kt)("li",{parentName:"ul"},"publishing an operation which identifies more than 1 graph tip, effectively merges these branches into one"))),(0,i.kt)("li",{parentName:"ul"},"a CREATE operation MUST NOT have ",(0,i.kt)("em",{parentName:"li"},"previous operations"))),(0,i.kt)("h2",{id:"fields"},"Fields"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a CREATE operation MUST contain all fields of the operation's schema"),(0,i.kt)("li",{parentName:"ul"},"an UPDATE operation MAY contain any combination of fields from the operation's schema"),(0,i.kt)("li",{parentName:"ul"},"a DELETE operation MUST NOT contain any fields"),(0,i.kt)("li",{parentName:"ul"},"fields map field names to field values",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"field names are strings"),(0,i.kt)("li",{parentName:"ul"},"field values can be of type: ",(0,i.kt)("inlineCode",{parentName:"li"},"u64"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"f64"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"boolean"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"relation"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"relation_list"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"pinned_relation"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"pinned_relation_list")),(0,i.kt)("li",{parentName:"ul"},"see ","[schema][/specification/data-types/schemas]"," for further specification of field names and -values"))),(0,i.kt)("li",{parentName:"ul"},"to identify the actual type of an operation value an external schema is required")),(0,i.kt)("h2",{id:"encoding"},"Encoding"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"operations are encoded using ",(0,i.kt)("a",{parentName:"li",href:"https://cbor.io/"},"CBOR")," with the following format: ",(0,i.kt)("inlineCode",{parentName:"li"},'[version, action, "schema id", [previous operations]?, { [field key]: <field value> }?]'),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"version is encoded as a u64 integer and MUST be given",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"the latest operation specification version is ",(0,i.kt)("inlineCode",{parentName:"li"},"1")),(0,i.kt)("li",{parentName:"ul"},"unknown or unsupported operation versions MUST be rejected"))),(0,i.kt)("li",{parentName:"ul"},"action is encoded as a u64 integer and MUST be given, the regarding actions are represented as follows:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"CREATE: ",(0,i.kt)("inlineCode",{parentName:"li"},"0")),(0,i.kt)("li",{parentName:"ul"},"UPDATE: ",(0,i.kt)("inlineCode",{parentName:"li"},"1")),(0,i.kt)("li",{parentName:"ul"},"DELETE: ",(0,i.kt)("inlineCode",{parentName:"li"},"2")))),(0,i.kt)("li",{parentName:"ul"},"schema id is encoded as a string and MUST be given"),(0,i.kt)("li",{parentName:"ul"},"previous operations is encoded as an array of operation ids, it MUST be omitted in a CREATE operation"),(0,i.kt)("li",{parentName:"ul"},"fields are encoded as a map where the map keys are encoded as strings, it MUST be omitted in a DELETE operation",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"the map values can be encoded as one of the following types: ",(0,i.kt)("inlineCode",{parentName:"li"},"u64"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"f64"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"boolean"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"string[]")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"string[][]")),(0,i.kt)("li",{parentName:"ul"},"map names and values MUST match the given schema"),(0,i.kt)("li",{parentName:"ul"},"the encoding reflects the core data types of CBOR while they MUST be interpreted as p2panda operation values when decoding with the help of a schema:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"string")," can be interpreted as any string or a document id for a relation depending on the schema"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"string[]")," can be interpreted as a pinned relation (document view id) or a relation list (list of document ids) depending on the schema"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"string[][]")," is a pinned relation list"))))),(0,i.kt)("li",{parentName:"ul"},"operations MUST never contain any more array fields than the specified ones, if they do they need to be rejected"))),(0,i.kt)("li",{parentName:"ul"},"all array values and map keys must be serialised in sorted order and de-duplicated unless their order and occurrence is semantic",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"this is currently only required for document view ids, which are given inside of application schema ids, previous operations fields, pinned relation lists or pinned relations"),(0,i.kt)("li",{parentName:"ul"},"all operations that have values or map keys which are not sorted or duplicate even though their order has no semantic meaning are invalid")))),(0,i.kt)("h2",{id:"usage"},"Usage"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"clients can use operations to publish data changes"),(0,i.kt)("li",{parentName:"ul"},"clients must embed operations in bamboo entries to publish them"),(0,i.kt)("li",{parentName:"ul"},"clients can create a ",(0,i.kt)("a",{parentName:"li",href:"/specification/data-types/documents#documents"},"document")," by publishing a CREATE operation"),(0,i.kt)("li",{parentName:"ul"},"clients can update a document by publishing an UPDATE operation",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"every UPDATE operation leads to a new ",(0,i.kt)("em",{parentName:"li"},"document view")," of the document that is being updated"))),(0,i.kt)("li",{parentName:"ul"},"nodes can ",(0,i.kt)("a",{parentName:"li",href:"/specification/data-types/materialization#reduction"},"reduce")," operations to produce a specific ",(0,i.kt)("em",{parentName:"li"},"document view")," of their document"),(0,i.kt)("li",{parentName:"ul"},"clients can delete a document by publishing a DELETE operation",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"nodes MUST delete all operations of a document once it has been deleted")))))}m.isMDXComponent=!0}}]);