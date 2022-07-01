"use strict";(self.webpackChunkp2panda_website=self.webpackChunkp2panda_website||[]).push([[2948],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return m}});var a=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=a.createContext({}),d=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},u=function(e){var n=d(e.components);return a.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=d(t),m=i,h=c["".concat(s,".").concat(m)]||c[m]||p[m]||r;return t?a.createElement(h,l(l({ref:n},u),{},{components:t})):a.createElement(h,l({ref:n},u))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,l=new Array(r);l[0]=c;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var d=2;d<r;d++)l[d]=t[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},3546:function(e,n,t){t.r(n),t.d(n,{assets:function(){return s},contentTitle:function(){return l},default:function(){return p},frontMatter:function(){return r},metadata:function(){return o},toc:function(){return d}});var a=t(3117),i=(t(7294),t(3905));const r={id:"queries"},l="Queries",o={unversionedId:"organising-data/queries",id:"organising-data/queries",title:"Queries",description:"- clients send queries to nodes in order to publish new entries and query materialised documents",source:"@site/docs/02-organising-data/queries.md",sourceDirName:"02-organising-data",slug:"/organising-data/queries",permalink:"/handbook/docs/organising-data/queries",draft:!1,editUrl:"https://github.com/p2panda/handbook/edit/main/website/docs/02-organising-data/queries.md",tags:[],version:"current",frontMatter:{id:"queries"},sidebar:"docs",previous:{title:"Reduction",permalink:"/handbook/docs/organising-data/reduction"},next:{title:"Networking",permalink:"/handbook/docs/category/networking"}},s={},d=[{value:"Client API",id:"client-api",level:2},{value:"Publishing Entries",id:"publishing-entries",level:2},{value:"<code>nextEntryArgs</code>",id:"nextentryargs",level:3},{value:"<code>publishEntry</code>",id:"publishentry",level:3},{value:"Response",id:"response",level:3},{value:"Querying documents",id:"querying-documents",level:2},{value:"<code>&lt;schema_id&gt;</code>",id:"schema_id",level:3},{value:"<code>all_&lt;schema_id&gt;</code>",id:"all_schema_id",level:3}],u={toc:d};function p(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,a.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"queries"},"Queries"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"clients send ",(0,i.kt)("em",{parentName:"li"},"queries")," to nodes in order to publish new entries and query materialised documents"),(0,i.kt)("li",{parentName:"ul"},"queries are sent via HTTP using the ",(0,i.kt)("a",{parentName:"li",href:"https://graphql.org/"},"GraphQL")," language"),(0,i.kt)("li",{parentName:"ul"},"serving a GraphQL API and handling requests is implemented in ",(0,i.kt)("a",{parentName:"li",href:"/docs/writing-data/clients-nodes"},"nodes"),", for example ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/p2panda/aquadoggo"},"Aquadoggo")),(0,i.kt)("li",{parentName:"ul"},"nodes use the same GraphQL API to talk to each other, you can read more about it under ",(0,i.kt)("a",{parentName:"li",href:"/docs/networking/replication"},"replication")),(0,i.kt)("li",{parentName:"ul"},"large numbers are encoded as strings in the payloads (",(0,i.kt)("inlineCode",{parentName:"li"},"logId")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"seqNum"),") to account for the lack of support to represent u64 integers in JSON")),(0,i.kt)("h2",{id:"client-api"},"Client API"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the client api is the interface for communication between ",(0,i.kt)("a",{parentName:"li",href:"/docs/writing-data/clients-nodes"},"node and client")),(0,i.kt)("li",{parentName:"ul"},"clients can publish entries",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"before that, clients can retrieve parameters required for encoding entries if they can't compute them independently"))),(0,i.kt)("li",{parentName:"ul"},"clients can retrieve materialised ",(0,i.kt)("a",{parentName:"li",href:"/docs/organising-data/documents"},"documents")," of a given schema",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"documents can be filtered by individual fields"),(0,i.kt)("li",{parentName:"ul"},"linked documents can be retrieved"),(0,i.kt)("li",{parentName:"ul"},"documents can be sorted by arbitrary fields"),(0,i.kt)("li",{parentName:"ul"},"documents can be sorted by self-referential orderings"),(0,i.kt)("li",{parentName:"ul"},"documents can be queried by ",(0,i.kt)("inlineCode",{parentName:"li"},"document_view_id")," in order to receive a ","[documents][view]"," onto it's data at a specific materialised state")))),(0,i.kt)("h2",{id:"publishing-entries"},"Publishing Entries"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"clients use two GraphQL operations for publishing entries:",(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"#nextentryargs"},(0,i.kt)("inlineCode",{parentName:"a"},"nextEntryArgs"))," query to retrieve parameters required for encoding an entry"),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"#publishentry"},(0,i.kt)("inlineCode",{parentName:"a"},"publishEntry"))," mutation to publish a signed and encoded entry together with its payload")))),(0,i.kt)("h3",{id:"nextentryargs"},(0,i.kt)("inlineCode",{parentName:"h3"},"nextEntryArgs")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"returns parameters required for encoding new entries",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"implementations must not have side effects"))),(0,i.kt)("li",{parentName:"ul"},"clients can't encode new entries without information from this endpoint because every entry needs to place itself in the first unused sequence number of a specific ",(0,i.kt)("a",{parentName:"li",href:"/docs/writing-data/bamboo"},(0,i.kt)("em",{parentName:"a"},"bamboo log"))," and also it needs to include the hashes of specific previous entries in its encoding",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"this information is held by the node"))),(0,i.kt)("li",{parentName:"ul"},"clients may cache the arguments required for the next entry (they are also returned by ",(0,i.kt)("inlineCode",{parentName:"li"},"publishEntry"),")"),(0,i.kt)("li",{parentName:"ul"},"clients may also persist their entry logs locally to avoid any dependency for retrieving entry arguments of nodes at all"),(0,i.kt)("li",{parentName:"ul"},"clients must set the ",(0,i.kt)("inlineCode",{parentName:"li"},"documentId")," input variable to receive arguments for encoding an ",(0,i.kt)("inlineCode",{parentName:"li"},"UPDATE")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"DELETE")," operation.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"clients must not set this when they want to encode a ",(0,i.kt)("inlineCode",{parentName:"li"},"CREATE")," operation")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'query nextEntryArgs(\n  """\n  public key of the author signing and encoding the next entry\n  """\n  publicKey: PublicKey!\n\n  """\n  id of the document that will be updated or deleted with the next entry. leave empty to receive arguments for creating a new document.\n  """\n  documentId: DocumentId\n): NextEntryArguments!\n')),(0,i.kt)("h3",{id:"publishentry"},(0,i.kt)("inlineCode",{parentName:"h3"},"publishEntry")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"if a ",(0,i.kt)("inlineCode",{parentName:"li"},"publishEntry")," request is accepted by a node it must publish the entry supplied with the request by taking the following steps:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"the node must validate the received entry and operation by checking if:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"the entry adheres to the ",(0,i.kt)("a",{parentName:"li",href:"/docs/writing-data/bamboo"},"bamboo specification")," and has a valid signature and log integrity"),(0,i.kt)("li",{parentName:"ul"},"the operation adheres to the ",(0,i.kt)("a",{parentName:"li",href:"/docs/writing-data/operations"},"operation specification")),(0,i.kt)("li",{parentName:"ul"},"the operation is linked to the entry with a correct payload hash and size"))),(0,i.kt)("li",{parentName:"ul"},"the node should persist the entry and operation and make it available to other nodes via ",(0,i.kt)("a",{parentName:"li",href:"/docs/networking/replication"},"replication")),(0,i.kt)("li",{parentName:"ul"},"the node may ",(0,i.kt)("a",{parentName:"li",href:"/docs/organising-data/reduction"},"materialise")," the document this new operation belongs to, resulting in a new document view"))),(0,i.kt)("li",{parentName:"ul"},"returns entry arguments required for publishing the next entry for the same document, similar to ",(0,i.kt)("inlineCode",{parentName:"li"},"nextEntryArgs")),(0,i.kt)("li",{parentName:"ul"},"returns an error ",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"when the bamboo log, signature or document integrity could not be verified, the operation was malformed or schema not fullfilled"),(0,i.kt)("li",{parentName:"ul"},"when the node is unable to persist the entry and operation at the moment")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'mutation publishEntry(\n  """\n  CBOR representation of a signed Bamboo entry, encoded as a hexadecimal string\n  """\n  entry: EncodedEntry!\n\n  """\n  CBOR representation of an p2panda operation, the payload of the Bamboo entry,\n  encoded as a hexadecimal string\n  """\n  operation: EncodedOperation!\n): NextEntryArguments!\n')),(0,i.kt)("h3",{id:"response"},"Response"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"both ",(0,i.kt)("inlineCode",{parentName:"li"},"publishEntry")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"nextEntryArgs")," return the arguments for encoding and signing the next entry as a response")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'type NextEntryArguments {\n  """\n  log id to be used to forge the next entry\n  """\n  logId: LogId!\n\n  """\n  sequence number to be used to forge the next entry\n  """\n  seqNum: SeqNum!\n\n  """\n  optional backlink hash to be used to forge the next entry\n  """\n  backlink: EntryHash\n\n  """\n  optional skiplink hash to be used to forge the next entry\n  """\n  skiplink: EntryHash\n}\n')),(0,i.kt)("h2",{id:"querying-documents"},"Querying documents"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"these queries allow clients to request the field contents of materialised document views and metadata for their associated documents"),(0,i.kt)("li",{parentName:"ul"},"some GraphQL operations and types are dynamic in that they depend on the schemas known to the node",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"this spec only gives a generic form for these operations and types"),(0,i.kt)("li",{parentName:"ul"},"in this specification we use ",(0,i.kt)("inlineCode",{parentName:"li"},"<schema_id>")," as a placeholder for the string-encoded schema id of actual schemas")))),(0,i.kt)("h3",{id:"schema_id"},(0,i.kt)("inlineCode",{parentName:"h3"},"<schema_id>")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"returns a single document that uses this schema id with a specific document view",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"implementations must have no side effects"))),(0,i.kt)("li",{parentName:"ul"},"either the ",(0,i.kt)("inlineCode",{parentName:"li"},"id")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"view_id")," input variable must to be set",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"if ",(0,i.kt)("inlineCode",{parentName:"li"},"id")," contains a document id the response must contain the ",(0,i.kt)("a",{parentName:"li",href:"/docs/organising-data/documents#the-latest-document-view"},(0,i.kt)("em",{parentName:"a"},"latest document view"))," for that document"),(0,i.kt)("li",{parentName:"ul"},"if ",(0,i.kt)("inlineCode",{parentName:"li"},"view_id")," contains a document view id, the query must contain this document view"),(0,i.kt)("li",{parentName:"ul"},"if both input variables are given the query must return an error"))),(0,i.kt)("li",{parentName:"ul"},'not every node holds all documents and especially not all document views (historical states of a document) in its database because of the decentralised nature of p2panda. in this case a "not found" error will be returned')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'query <schema_id>(\n  """\n  id of the document to be queried\n  """\n  id: DocumentId\n\n  """\n  specific document view id to be queried\n  """\n  viewId: DocumentViewId\n): <schema_id>Response!\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'type <schema_id>Response {\n  """\n  meta information about the returned document and document view\n  """\n  meta: <schema_id>ResponseMeta,\n\n  """\n  actual data contained in the document view\n  """\n  fields: <schema_id>ResponseFields,\n}\n\ntype <schema_id>ResponseMeta {\n  """\n  identifier of the returned document\n  """\n  id: DocumentId!\n\n  """\n  document view id contained in this response\n  """\n  viewId: DocumentViewId!\n\n  """\n  this field is `true` if this document has been deleted\n  """\n  deleted: Boolean!\n\n  """\n  this field is `true` if this document view has been updated at least once\n  """\n  edited: Boolean!\n}\n\ntype <schema_id>ResponseFields {\n  """\n  named fields containing the actual, materialised values of this document\n  view. the form is defined by the regarding p2panda schema\n  """\n  <field_name>: <field_type>\n\n  """\n  ... potentially more fields\n  """\n}\n')),(0,i.kt)("h3",{id:"all_schema_id"},(0,i.kt)("inlineCode",{parentName:"h3"},"all_<schema_id>")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"returns the ",(0,i.kt)("a",{parentName:"li",href:"/docs/organising-data/documents#the-latest-document-view"},"latest document view")," for many documents of a given schema",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"implementations must have no side effects"))),(0,i.kt)("li",{parentName:"ul"},"deleted documents must not be included in the response unless they are explicitly included using a filter"),(0,i.kt)("li",{parentName:"ul"},"response is paginated, can be sorted and filtered")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Filters")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"filters can be applied on any operation field of type ",(0,i.kt)("inlineCode",{parentName:"li"},"float"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"str")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"integer"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"in special cases also ",(0,i.kt)("inlineCode",{parentName:"li"},"relation")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"pinned_relation")," can be filtered, see self-referential relations section below"))),(0,i.kt)("li",{parentName:"ul"},"if no filter is selected all document views following that given schema will be selected")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Ordering")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"if no ordering is selected the documents will be ordered by document id, ascending")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Pagination")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"our pagination adheres to the ",(0,i.kt)("a",{parentName:"li",href:"https://relay.dev/graphql/connections.htm"},"connection specification")," of graphql",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"a ",(0,i.kt)("inlineCode",{parentName:"li"},"cursor")," is an opaque and unique identifier of every connection edge and can be implemented differently as long as it aids pagination",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"we recommend a base64 encoded document view id as a cursor"),(0,i.kt)("li",{parentName:"ul"},"as stated by the ",(0,i.kt)("a",{parentName:"li",href:"https://graphql.org/learn/pagination/#pagination-and-edges"},"pagination specification")," of graphql the encoding should aid reminding developers that this data is opaque should not be relied upon")))))),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Self-referential fields")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"if the selected ",(0,i.kt)("inlineCode",{parentName:"li"},"orderBy")," field is a ",(0,i.kt)("a",{parentName:"li",href:"/docs/writing-data/schemas#relation-fields"},"self-referential relation")," the node will return a topologically ordered list of that reference graph in the same manner as the ",(0,i.kt)("a",{parentName:"li",href:"/docs/organising-data/reduction"},"reduction")," algorithm works"),(0,i.kt)("li",{parentName:"ul"},"if the selected filter field is a self-referential relation the topologically ordered list will be filtered")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'query all_<schema_id>(\n  """\n  filter collection of documents\n  """\n  where: <schema_id>Filter\n\n  """\n  order results by field values\n  """\n  orderBy: <field_name>\n\n  """\n  order results in specified direction ("asc" or "desc")\n  """\n  orderDirection: String\n\n  """\n  max number of items to be returned per page\n  """\n  first: Int\n\n  """\n  cursor identifier for pagination\n  """\n  after: String\n): <schema_id>PageResponse!\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'type <schema_id>Filter {\n  """\n  filter by public key\n  """\n  publicKey: PublicKey\n\n  """\n  filter by deletion status\n  """\n  deleted: Boolean\n\n  """\n  filter by editing status\n  """\n  edited: Boolean\n\n  """\n  filter by fields containing that exact value\n  """\n  <field_name>: <value>\n\n  """\n  filter by fields not containing that exact value\n  """\n  <field_name>_ne: <value>\n\n  """\n  filter by fields containing larger values\n  """\n  <field_name>_gt: <value>\n\n  """\n  filter by fields containing larger or equal values\n  """\n  <field_name>_gte: <value>\n\n  """\n  filter by fields containing lower values\n  """\n  <field_name>_lt: <value>\n\n  """\n  filter by fields containing lower or equal values\n  """\n  <field_name>_lte: <value>\n}\n\ntype <schema_id>PageResponse {\n  """\n  information to aid in pagination\n  """\n  pageInfo: <schema_id>PageInfo!\n\n  """\n  list of returned items with pagination data\n  """\n  edges: [<schema_id>PageEdge]\n}\n\ntype <schema_id>PageInfo {\n  """\n  when paginating backwards, are there more items?\n  """\n  hasPreviousPage: Boolean!\n\n  """\n  when paginating forwards, are there more items?\n  """\n  hasNextPage: Boolean!\n\n  """\n  when paginating backwards, the cursor to continue.\n  """\n  startCursor: String\n\n  """\n  when paginating forwards, the cursor to continue.\n  """\n  endCursor: String\n}\n\ntype <schema_id>PageEdge {\n  """\n  item at the end of the pagination edge\n  """\n  node: <schema_id>Response!\n\n  """\n  cursor to use in pagination\n  """\n  cursor: String!\n}\n')))}p.isMDXComponent=!0}}]);