"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[4460],{4137:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),s=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),c=s(n),u=i,h=c["".concat(l,".").concat(u)]||c[u]||m[u]||o;return n?a.createElement(h,r(r({ref:t},d),{},{components:n})):a.createElement(h,r({ref:t},d))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=c;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:i,r[1]=p;for(var s=2;s<o;s++)r[s]=n[s];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},855:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>m,frontMatter:()=>o,metadata:()=>p,toc:()=>s});var a=n(7462),i=(n(7294),n(4137));const o={id:"operations",title:"Operations"},r=void 0,p={unversionedId:"specification/data-types/operations",id:"specification/data-types/operations",title:"Operations",description:"- Operations represent atomic data changes.",source:"@site/docs/specification/data-types/operations.md",sourceDirName:"specification/data-types",slug:"/specification/data-types/operations",permalink:"/handbook/specification/data-types/operations",draft:!1,tags:[],version:"current",frontMatter:{id:"operations",title:"Operations"},sidebar:"specification",previous:{title:"Key Pairs",permalink:"/handbook/specification/data-types/key-pairs"},next:{title:"Schemas",permalink:"/handbook/specification/data-types/schemas"}},l={},s=[{value:"Encoding Format",id:"encoding-format",level:2},{value:"Items",id:"items",level:2},{value:"Version",id:"version",level:3},{value:"Action",id:"action",level:3},{value:"Schema Id",id:"schema-id",level:3},{value:"Previous",id:"previous",level:3},{value:"Fields",id:"fields",level:3},{value:"Usage",id:"usage",level:2}],d={toc:s};function m(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Operations represent atomic data changes."),(0,i.kt)("li",{parentName:"ul"},"Operations are published as the payload of ",(0,i.kt)("em",{parentName:"li"},"Bamboo entries"),"."),(0,i.kt)("li",{parentName:"ul"},"Operations are identified by the hash of their Bamboo entry."),(0,i.kt)("li",{parentName:"ul"},"Every operation is associated with a ",(0,i.kt)("a",{parentName:"li",href:"/specification/data-types/key-pairs"},"Bamboo author"),", which is encoded in the operation's ",(0,i.kt)("em",{parentName:"li"},"entry"))),(0,i.kt)("admonition",{title:"Definition: Operation ID",type:"info"},(0,i.kt)("p",{parentName:"admonition"},"The ",(0,i.kt)("em",{parentName:"p"},"operation id")," uniquely identifies an operation. It is equal to the hash of the Bamboo entry that has the operation as its payload.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"struct Operation {\n  /// Version of this operation.\n  version: NonZeroU64,\n\n  /// Describes if this operation creates, updates or deletes data.\n  action: OperationAction,\n\n  /// The id of the schema for this operation.\n  schema_id: String,\n\n  /// Optional document view id containing the operation ids directly preceding this one in the\n  /// document.\n  previous_operations?: String{68}[],\n\n  /// Optional fields map holding the operation data.\n  fields?: HashMap<String, OperationValue>,\n}\n")),(0,i.kt)("h2",{id:"encoding-format"},"Encoding Format"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"CBOR is a binary encoding that is used to encode the contents of an operation and produce bytes that can be associated with a Bamboo entry, stored, and sent over a network connection."),(0,i.kt)("li",{parentName:"ul"},"Operations are encoded as arrays of items, described in more detail below.")),(0,i.kt)("admonition",{title:"Requirement OP1",type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"An operation MUST be encoded using hexadecimal encoded ",(0,i.kt)("a",{parentName:"p",href:"https://cbor.io/"},"CBOR")," with the following format:"),(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("inlineCode",{parentName:"p"},"[version, action, schema_id, [previous]?, { [field_key]: <field_value> }?]")),(0,i.kt)("p",{parentName:"admonition"},"Operations MUST NOT contain any additional items.")),(0,i.kt)("h2",{id:"items"},"Items"),(0,i.kt)("h3",{id:"version"},"Version"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The operation version is the version of the p2panda specification that is followed by that operation.")),(0,i.kt)("admonition",{title:"Requirement OP2",type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"Every operation MUST have an ",(0,i.kt)("em",{parentName:"p"},"operation version"),". An operation version MUST be a positive integer number. An operation version MUST NOT be larger than 256.")),(0,i.kt)("h3",{id:"action"},"Action"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The operation action defines the kind of data change that is described by the operation.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"enum OperationAction {\n  CREATE,\n  UPDATE,\n  DELETE,\n}\n")),(0,i.kt)("admonition",{title:"Definition: Operation Actions",type:"info"},(0,i.kt)("p",{parentName:"admonition"},"There are 3 types of operation:"),(0,i.kt)("ol",{parentName:"admonition"},(0,i.kt)("li",{parentName:"ol"},"CREATE operations initialise new documents and set all of their field values."),(0,i.kt)("li",{parentName:"ol"},"UPDATE operations mutate any number of fields on an existing document."),(0,i.kt)("li",{parentName:"ol"},"DELETE operations delete an existing document."))),(0,i.kt)("admonition",{title:"Requirement OP3",type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"Every operation MUST have an ",(0,i.kt)("em",{parentName:"p"},"operation action"),", which MUST be one of"),(0,i.kt)("ul",{parentName:"admonition"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"0")," - denotes a CREATE action and results in a CREATE operation"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"1")," - denotes an UPDATE action and results in a UPDATE operation"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"2")," - denotes a DELETE action and results in a DELETE operation"))),(0,i.kt)("h3",{id:"schema-id"},"Schema Id"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The schema of an operation may define additional requirements for the operation's action, previous and fields items.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"See the ",(0,i.kt)("a",{parentName:"li",href:"/specification/data-types/schemas"},"schema")," section for more details.")))),(0,i.kt)("admonition",{title:"Requirement OP4",type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"Every operation MUST have a ",(0,i.kt)("a",{parentName:"p",href:"/specification/data-types/schemas"},"schema id"))),(0,i.kt)("h3",{id:"previous"},"Previous"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("em",{parentName:"li"},"previous")," specifies where an operation should be placed when constructing the graph of operations required to materialise a document.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"It contains an array of ",(0,i.kt)("em",{parentName:"li"},"operation_id"),"'s which identify the tip operation of any unmerged branches in this document at the time of\npublishing this operation."),(0,i.kt)("li",{parentName:"ul"},"In the case where a graph has no unmerged branches, this array will contain only one id (the resolved graph tip)."),(0,i.kt)("li",{parentName:"ul"},"Publishing an operation which identifies more than one graph tip effectively merges these branches into one.")))),(0,i.kt)("admonition",{title:"Requirement OP5",type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"DELETE and UPDATE operations MUST have ",(0,i.kt)("em",{parentName:"p"},"previous")," with ",(0,i.kt)("inlineCode",{parentName:"p"},"length > 0"),". CREATE operations MUST NOT have ",(0,i.kt)("em",{parentName:"p"},"previous"),".")),(0,i.kt)("h3",{id:"fields"},"Fields"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("em",{parentName:"li"},"Operation fields")," contain the actual data carried by an operation."),(0,i.kt)("li",{parentName:"ul"},"Depending on the operation's action and schema, different requirements exist for which data must be contained in the operation."),(0,i.kt)("li",{parentName:"ul"},"Fields map field names to field values",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"field names are strings"),(0,i.kt)("li",{parentName:"ul"},"field values can be of type: ",(0,i.kt)("inlineCode",{parentName:"li"},"u64"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"f64"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"boolean"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"relation"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"relation_list"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"pinned_relation"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"pinned_relation_list")),(0,i.kt)("li",{parentName:"ul"},"see ",(0,i.kt)("a",{parentName:"li",href:"/specification/data-types/schemas"},"schema")," for further specification of field names and values"))),(0,i.kt)("li",{parentName:"ul"},"The schema defined by the schema id item of the operation specifies the name and type of each field which can be included in an operation."),(0,i.kt)("li",{parentName:"ul"},"In order to deserialise typed field values, a copy of the schema is required.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"enum OperationValue {\n  Boolean(Bool),\n  Integer(I64),\n  Float(F64),\n  String(String),\n  Relation(String{68}),\n  RelationList(String{68}[]),\n  PinnedRelation(String{68}[]),\n  PinnedRelationList(String{68}[][]),\n}\n")),(0,i.kt)("admonition",{title:"Requirement OP6",type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"A CREATE operation MUST contain all fields defined by the operation's ",(0,i.kt)("em",{parentName:"p"},"operation schema"),".\nAn UPDATE operation MAY contain any combination of fields from the operation's ",(0,i.kt)("em",{parentName:"p"},"operation schema"),".\nA DELETE operation MUST NOT contain any fields.")),(0,i.kt)("admonition",{title:"Requirement OP7",type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"The encoding reflects the core data types of CBOR while they MUST be interpreted as p2panda operation values when decoding with the help of a schema:"),(0,i.kt)("ul",{parentName:"admonition"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"string")," can be interpreted as any string or a document id for a relation depending on the schema"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"string[]")," can be interpreted as a pinned relation (document view id) or a relation list (list of document ids) depending on the schema"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"string[][]")," is a pinned relation list"))),(0,i.kt)("admonition",{title:"Requirement OP8",type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"The type of all operation field values MUST match the corresponding field in the operation's schema.")),(0,i.kt)("h2",{id:"usage"},"Usage"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Clients can use operations to publish data changes."),(0,i.kt)("li",{parentName:"ul"},"Clients must embed operations in Bamboo entries to publish them."),(0,i.kt)("li",{parentName:"ul"},"Clients can create a ",(0,i.kt)("a",{parentName:"li",href:"/specification/data-types/documents"},"document")," by publishing a CREATE operation."),(0,i.kt)("li",{parentName:"ul"},"Clients can update a document by publishing an UPDATE operation.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Every UPDATE operation leads to a new ",(0,i.kt)("em",{parentName:"li"},"document view")," of the document that is being updated."))),(0,i.kt)("li",{parentName:"ul"},"Clients can delete a document by publishing a DELETE operation."),(0,i.kt)("li",{parentName:"ul"},"Nodes can ",(0,i.kt)("a",{parentName:"li",href:"/specification/data-types/documents#reduction"},"reduce")," operations to produce a specific ",(0,i.kt)("em",{parentName:"li"},"document view")," of their document."),(0,i.kt)("li",{parentName:"ul"},"Clients can delete a document by publishing a DELETE operation.")),(0,i.kt)("admonition",{title:"Requirement OP9",type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"Nodes MUST delete all operations of a document once it has been deleted. (@TODO: this should probably go into the documents section).")))}m.isMDXComponent=!0}}]);