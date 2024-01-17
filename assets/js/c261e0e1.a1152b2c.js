"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[1119],{7470:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>h,contentTitle:()=>t,default:()=>c,frontMatter:()=>o,metadata:()=>r,toc:()=>l});var s=i(5893),a=i(1151);const o={id:"bamboo",title:"Bamboo"},t=void 0,r={id:"specifications/aquadoggo/data-types/bamboo",title:"Bamboo",description:"This section will soon be replaced with our new namakemono data type which is similar, but cooler.",source:"@site/docs/specifications/aquadoggo/data-types/bamboo.md",sourceDirName:"specifications/aquadoggo/data-types",slug:"/specifications/aquadoggo/data-types/bamboo",permalink:"/specifications/aquadoggo/data-types/bamboo",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"bamboo",title:"Bamboo"},sidebar:"specifications",previous:{title:"Key Concepts",permalink:"/specifications/aquadoggo/key-concepts"},next:{title:"Key Pairs",permalink:"/specifications/aquadoggo/data-types/key-pairs"}},h={},l=[{value:"Hashing",id:"hashing",level:3},{value:"Encoding",id:"encoding",level:3},{value:"Authors",id:"authors",level:3},{value:"Logs",id:"logs",level:3},{value:"Entries",id:"entries",level:3},{value:"End of log flag",id:"end-of-log-flag",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.admonition,{title:"Deprecated",type:"danger",children:(0,s.jsxs)(n.p,{children:["This section will soon be replaced with our new ",(0,s.jsx)(n.a,{href:"/specifications/namakemono",children:"namakemono"})," data type which is similar, but cooler."]})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.em,{children:"Requirements in this section refer only to how p2panda specifies use of bamboo."})}),"\n",(0,s.jsx)(n.admonition,{title:"Requirement BA1",type:"caution",children:(0,s.jsxs)(n.p,{children:["p2panda uses ",(0,s.jsx)(n.a,{href:"https://github.com/AljoschaMeyer/bamboo",children:"Bamboo"})," with Ed25519 (Digital Signature Algorithm) and YASMF (Multihash) to encode and secure data."]})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["p2panda is built on top of the ",(0,s.jsx)(n.a,{href:"https://github.com/AljoschaMeyer/bamboo",children:"Bamboo"})," data type.","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"This handbook doesn't repeat everything that's in the Bamboo specification, so it might be helpful to have a look at that (it's not too long)."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Bamboo is an append-only log data type that ensures security and authenticity of arbitrary data in order to share it in a decentralised and trustless setting.","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Bamboo organises data by ",(0,s.jsx)(n.em,{children:"author"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Every author can have many ",(0,s.jsx)(n.a,{href:"#logs",children:(0,s.jsx)(n.em,{children:"logs"})}),", each of which contains many ",(0,s.jsx)(n.em,{children:"entries"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"Entries contain p2panda data that we want to publish."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"The following sections explain how these concepts from bamboo are used in p2panda."}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"struct Entry {\n  /// PublicKey of this entry.\n  public_key: Bytes(32),\n\n  /// Used log for this entry.\n  log_id: U64,\n\n  /// Sequence number of this entry.\n  seq_num: NonZeroU64,\n\n  /// Hash of skiplink Bamboo entry.\n  skiplink?: Bytes(34),\n\n  /// Hash of previous Bamboo entry.\n  backlink?: Bytes(34),\n\n  /// Byte size of payload.\n  payload_size: U64,\n\n  /// Hash of payload.\n  payload_hash: Bytes(34),\n\n  /// Ed25519 signature of entry.\n  signature: Bytes(64),\n}\n"})}),"\n",(0,s.jsx)(n.h3,{id:"hashing",children:"Hashing"}),"\n",(0,s.jsx)(n.admonition,{title:"Requirement BA2",type:"caution",children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/bamboo-rs/yasmf-hash-spec",children:"_Yet Another Smol Multi-Hash (YASMF)"})," MUST be used to produce hashes for Bamboo entries and payloads."]})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["The original Bamboo requires ",(0,s.jsx)(n.a,{href:"https://github.com/AljoschaMeyer/yamf-hash",children:(0,s.jsx)(n.em,{children:"YAMF-hashes"})})," to verify the integrity of entries and logs.","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"YAMF is a multiformat hash that only adds new hashing algorithms when previous ones have been discovered to be broken."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["However, p2panda uses bamboo with ",(0,s.jsxs)(n.a,{href:"https://github.com/bamboo-rs/yasmf-hash-spec",children:[(0,s.jsx)(n.em,{children:"YASMF"}),"-hashes"]}),".","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"YASMF has the additional requirement that hashing algorithms should be chosen that produce shorter hashes (256 bits)."}),"\n",(0,s.jsx)(n.li,{children:"At the time of writing, YASMF only contains the BLAKE3 hash, which therefore is the hash function used throughout p2panda. It is fast, safe, and produces hashes that are just 32 bytes long."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"encoding",children:"Encoding"}),"\n",(0,s.jsx)(n.admonition,{title:"Requirement BA3",type:"caution",children:(0,s.jsx)(n.p,{children:"Bamboo entries MUST be encoded using hexadecimal encoding when being transported through the Client API via GraphQL."})}),"\n",(0,s.jsx)(n.p,{children:"p2panda prefers hex-encoding to make it nicer for humans to look at the data."}),"\n",(0,s.jsx)(n.h3,{id:"authors",children:"Authors"}),"\n",(0,s.jsx)(n.admonition,{title:"Definition: Author",type:"info",children:(0,s.jsx)(n.p,{children:"An p2panda author is a human or bot who publishes data using p2panda. Authors may have more than one key pair."})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Data published using Bamboo always belongs to the public key that signed it, this key is called ",(0,s.jsx)(n.em,{children:"author"})," in Bamboo."]}),"\n",(0,s.jsxs)(n.li,{children:["People and bots who use p2panda can have access to more than one key pair, which is why we don't call public keys ",(0,s.jsx)(n.em,{children:"author"}),", as Bamboo does, we call them ",(0,s.jsx)(n.em,{children:"public key"}),".","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Data in p2panda belongs to the ",(0,s.jsx)(n.em,{children:"key pair"})," that signed it."]}),"\n",(0,s.jsx)(n.li,{children:"p2panda uses Ed25519 as the Bamboo signature scheme."}),"\n",(0,s.jsx)(n.li,{children:"p2panda users may have more than one key because every device and client uses an additional key."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Have a look at the ",(0,s.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/key-pairs",children:"key pairs"})," section of this handbook for more detailed information on this topic."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"logs",children:"Logs"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["When a key pair publishes data it is assigned to a Bamboo ",(0,s.jsx)(n.em,{children:"log"}),", which is identified by an integer number.","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Every key pair has 2^64 logs available to them."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["In p2panda every Bamboo log is used to collect a key pair's contributions to one ",(0,s.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/documents",children:"document"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"Every log contains up to 2^64 - 1 entries."}),"\n"]}),"\n",(0,s.jsx)(n.admonition,{title:"Requirement BA4",type:"caution",children:(0,s.jsx)(n.p,{children:"Bamboo log ids for any public key MUST increment monotonically by one."})}),"\n",(0,s.jsx)(n.h3,{id:"entries",children:"Entries"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["p2panda uses Bamboo entries to record changes of data while giving us cool features like partial replication, cryptographic integrity and authenticity.","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Every atomic change is recorded inside an entry."}),"\n",(0,s.jsxs)(n.li,{children:["We call these changes ",(0,s.jsx)(n.em,{children:"operations"}),"."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Have a look at the ",(0,s.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/operations",children:"operations"})," section of this handbook for more detailed information on this topic."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"end-of-log-flag",children:"End of log flag"}),"\n",(0,s.jsx)(n.p,{children:"Currently p2panda doesn't reserve a special use for the end of log flag. This may change in future versions."})]})}function c(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>r,a:()=>t});var s=i(7294);const a={},o=s.createContext(a);function t(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:t(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);