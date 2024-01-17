"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[1223],{7713:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>c});var t=i(5893),o=i(1151);const s={id:"operations",title:"Operations"},a=void 0,r={id:"specifications/aquadoggo/data-types/operations",title:"Operations",description:"This section will soon be replaced with our new namakemono data type which is similar, but cooler.",source:"@site/docs/specifications/aquadoggo/data-types/operations.md",sourceDirName:"specifications/aquadoggo/data-types",slug:"/specifications/aquadoggo/data-types/operations",permalink:"/specifications/aquadoggo/data-types/operations",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"operations",title:"Operations"},sidebar:"specifications",previous:{title:"Key Pairs",permalink:"/specifications/aquadoggo/data-types/key-pairs"},next:{title:"Schemas",permalink:"/specifications/aquadoggo/data-types/schemas"}},d={},c=[{value:"Encoding Format",id:"encoding-format",level:2},{value:"Items",id:"items",level:2},{value:"Version",id:"version",level:3},{value:"Action",id:"action",level:3},{value:"Schema Id",id:"schema-id",level:3},{value:"Previous",id:"previous",level:3},{value:"Fields",id:"fields",level:3},{value:"Usage",id:"usage",level:2}];function l(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.admonition,{title:"Deprecated",type:"danger",children:(0,t.jsxs)(n.p,{children:["This section will soon be replaced with our new ",(0,t.jsx)(n.a,{href:"/specifications/namakemono",children:"namakemono"})," data type which is similar, but cooler."]})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Operations represent atomic data changes."}),"\n",(0,t.jsxs)(n.li,{children:["Operations are published as the payload of ",(0,t.jsx)(n.em,{children:"Bamboo entries"}),"."]}),"\n",(0,t.jsx)(n.li,{children:"Operations are identified by the hash of their Bamboo entry."}),"\n",(0,t.jsxs)(n.li,{children:["Every operation is associated with a ",(0,t.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/key-pairs",children:"Bamboo author"}),", which is encoded in the operation's ",(0,t.jsx)(n.em,{children:"entry"})]}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{title:"Definition: Operation ID",type:"info",children:(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.em,{children:"operation id"})," uniquely identifies an operation. It is equal to the hash of the Bamboo entry that has the operation as its payload."]})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"struct Operation {\n  /// Version of this operation.\n  version: NonZeroU64,\n\n  /// Describes if this operation creates, updates or deletes data.\n  action: OperationAction,\n\n  /// The id of the schema for this operation.\n  schema_id: String,\n\n  /// Optional document view id containing the operation ids directly preceding this one in the\n  /// document.\n  previous_operations?: String{68}[],\n\n  /// Optional fields map holding the operation data.\n  fields?: HashMap<String, OperationValue>,\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"encoding-format",children:"Encoding Format"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"CBOR is a binary encoding that is used to encode the contents of an operation and produce bytes that can be associated with a Bamboo entry, stored, and sent over a network connection."}),"\n",(0,t.jsx)(n.li,{children:"Operations are encoded as arrays of items, described in more detail below."}),"\n"]}),"\n",(0,t.jsxs)(n.admonition,{title:"Requirement OP1",type:"caution",children:[(0,t.jsxs)(n.p,{children:["An operation MUST be encoded using hexadecimal encoded ",(0,t.jsx)(n.a,{href:"https://cbor.io/",children:"CBOR"})," with the following format:"]}),(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"[version, action, schema_id, [previous]?, { [field_key]: <field_value> }?]"})}),(0,t.jsx)(n.p,{children:"Operations MUST NOT contain any additional items."})]}),"\n",(0,t.jsx)(n.h2,{id:"items",children:"Items"}),"\n",(0,t.jsx)(n.h3,{id:"version",children:"Version"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The operation version is the version of the p2panda specification that is followed by that operation."}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{title:"Requirement OP2",type:"caution",children:(0,t.jsxs)(n.p,{children:["Every operation MUST have an ",(0,t.jsx)(n.em,{children:"operation version"}),". An operation version MUST be a positive ",(0,t.jsx)(n.code,{children:"u64"})," integer."]})}),"\n",(0,t.jsx)(n.h3,{id:"action",children:"Action"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The operation action defines the kind of data change that is described by the operation."}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"enum OperationAction {\n  CREATE = 0,\n  UPDATE = 1,\n  DELETE = 2,\n}\n"})}),"\n",(0,t.jsxs)(n.admonition,{title:"Definition: Operation Actions",type:"info",children:[(0,t.jsx)(n.p,{children:"There are 3 types of operation:"}),(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"CREATE operations initialise new documents and set all of their field values."}),"\n",(0,t.jsx)(n.li,{children:"UPDATE operations mutate any number of fields on an existing document."}),"\n",(0,t.jsx)(n.li,{children:"DELETE operations delete an existing document."}),"\n"]})]}),"\n",(0,t.jsxs)(n.admonition,{title:"Requirement OP3",type:"caution",children:[(0,t.jsxs)(n.p,{children:["Every operation MUST have an ",(0,t.jsx)(n.em,{children:"operation action"}),", which MUST be one of"]}),(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"0"})," - denotes a CREATE action and results in a CREATE operation"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"1"})," - denotes an UPDATE action and results in a UPDATE operation"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"2"})," - denotes a DELETE action and results in a DELETE operation"]}),"\n"]})]}),"\n",(0,t.jsx)(n.h3,{id:"schema-id",children:"Schema Id"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["The schema of an operation may define additional requirements for the operation's action, previous and fields items.","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["See the ",(0,t.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/schemas",children:"schema"})," section for more details."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{title:"Requirement OP4",type:"caution",children:(0,t.jsxs)(n.p,{children:["Every operation MUST have a ",(0,t.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/schemas",children:"schema id"})]})}),"\n",(0,t.jsx)(n.h3,{id:"previous",children:"Previous"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.em,{children:"previous"})," specifies where an operation should be placed when constructing the graph of operations required to materialise a document.","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["It contains an array of ",(0,t.jsx)(n.em,{children:"operation_id"}),"'s which identify the tip operation of any unmerged branches in this document at the time of\npublishing this operation."]}),"\n",(0,t.jsx)(n.li,{children:"In the case where a graph has no unmerged branches, this array will contain only one id (the resolved graph tip)."}),"\n",(0,t.jsx)(n.li,{children:"Publishing an operation which identifies more than one graph tip effectively merges these branches into one."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{title:"Requirement OP5",type:"caution",children:(0,t.jsxs)(n.p,{children:["DELETE and UPDATE operations MUST have ",(0,t.jsx)(n.em,{children:"previous"})," with ",(0,t.jsx)(n.code,{children:"length > 0"}),". CREATE operations MUST NOT have ",(0,t.jsx)(n.em,{children:"previous"}),"."]})}),"\n",(0,t.jsx)(n.h3,{id:"fields",children:"Fields"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.em,{children:"Operation fields"})," contain the actual data carried by an operation."]}),"\n",(0,t.jsx)(n.li,{children:"Depending on the operation's action and schema, different requirements exist for which data must be contained in the operation."}),"\n",(0,t.jsxs)(n.li,{children:["Fields map field names to field values","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"field names are strings"}),"\n",(0,t.jsxs)(n.li,{children:["field values can be of type: ",(0,t.jsx)(n.code,{children:"u64"}),", ",(0,t.jsx)(n.code,{children:"f64"}),", ",(0,t.jsx)(n.code,{children:"boolean"}),", ",(0,t.jsx)(n.code,{children:"bytes"}),", ",(0,t.jsx)(n.code,{children:"string"}),", ",(0,t.jsx)(n.code,{children:"relation"}),", ",(0,t.jsx)(n.code,{children:"relation_list"}),", ",(0,t.jsx)(n.code,{children:"pinned_relation"}),", ",(0,t.jsx)(n.code,{children:"pinned_relation_list"})]}),"\n",(0,t.jsxs)(n.li,{children:["see ",(0,t.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/schemas",children:"schema"})," for further specification of field names and values"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"The schema defined by the schema id item of the operation specifies the name and type of each field which can be included in an operation."}),"\n",(0,t.jsx)(n.li,{children:"In order to deserialise typed field values, a copy of the schema is required."}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"enum OperationValue {\n  Boolean(bool),\n  Integer(i64),\n  Float(f64),\n  String(String),\n  Bytes(Vec<u8>),\n  Relation(String{68}),\n  RelationList(String{68}[]),\n  PinnedRelation(String{68}[]),\n  PinnedRelationList(String{68}[][]),\n}\n"})}),"\n",(0,t.jsx)(n.admonition,{title:"Requirement OP6",type:"caution",children:(0,t.jsxs)(n.p,{children:["A CREATE operation MUST contain all fields defined by the operation's ",(0,t.jsx)(n.em,{children:"operation schema"}),".\nAn UPDATE operation MAY contain any combination of fields from the operation's ",(0,t.jsx)(n.em,{children:"operation schema"}),".\nA DELETE operation MUST NOT contain any fields."]})}),"\n",(0,t.jsxs)(n.admonition,{title:"Requirement OP7",type:"caution",children:[(0,t.jsx)(n.p,{children:"The encoding reflects the core data types of CBOR while they MUST be interpreted as p2panda operation values when decoding with the help of a schema:"}),(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"string"})," can be interpreted as any string or a document id for a relation depending on the schema"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"string[]"})," can be interpreted as a pinned relation (document view id) or a relation list (list of document ids) depending on the schema"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"string[][]"})," is a pinned relation list"]}),"\n"]})]}),"\n",(0,t.jsx)(n.admonition,{title:"Requirement OP8",type:"caution",children:(0,t.jsx)(n.p,{children:"The type of all operation field values MUST match the corresponding field in the operation's schema."})}),"\n",(0,t.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Clients can use operations to publish data changes."}),"\n",(0,t.jsx)(n.li,{children:"Clients must embed operations in Bamboo entries to publish them."}),"\n",(0,t.jsxs)(n.li,{children:["Clients can create a ",(0,t.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/documents",children:"document"})," by publishing a CREATE operation."]}),"\n",(0,t.jsxs)(n.li,{children:["Clients can update a document by publishing an UPDATE operation.","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Every UPDATE operation leads to a new ",(0,t.jsx)(n.em,{children:"document view"})," of the document that is being updated."]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"Clients can delete a document by publishing a DELETE operation."}),"\n",(0,t.jsxs)(n.li,{children:["Nodes can ",(0,t.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/documents",children:"reduce"})," operations to produce a specific ",(0,t.jsx)(n.em,{children:"document view"})," of their document."]}),"\n",(0,t.jsx)(n.li,{children:"Clients can delete a document by publishing a DELETE operation."}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{title:"Requirement OP9",type:"caution",children:(0,t.jsx)(n.p,{children:"Nodes MUST delete all operations of a document once it has been deleted."})})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>r,a:()=>a});var t=i(7294);const o={},s=t.createContext(o);function a(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);