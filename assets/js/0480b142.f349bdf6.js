"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[836],{4137:(e,a,t)=>{t.d(a,{Zo:()=>p,kt:()=>h});var n=t(7294);function o(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function i(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function r(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?i(Object(t),!0).forEach((function(a){o(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function l(e,a){if(null==e)return{};var t,n,o=function(e,a){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],a.indexOf(t)>=0||(o[t]=e[t]);return o}(e,a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var d=n.createContext({}),s=function(e){var a=n.useContext(d),t=a;return e&&(t="function"==typeof e?e(a):r(r({},a),e)),t},p=function(e){var a=s(e.components);return n.createElement(d.Provider,{value:a},e.children)},c={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},u=n.forwardRef((function(e,a){var t=e.components,o=e.mdxType,i=e.originalType,d=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(t),h=o,f=u["".concat(d,".").concat(h)]||u[h]||c[h]||i;return t?n.createElement(f,r(r({ref:a},p),{},{components:t})):n.createElement(f,r({ref:a},p))}));function h(e,a){var t=arguments,o=a&&a.mdxType;if("string"==typeof e||o){var i=t.length,r=new Array(i);r[0]=u;var l={};for(var d in a)hasOwnProperty.call(a,d)&&(l[d]=a[d]);l.originalType=e,l.mdxType="string"==typeof e?e:o,r[1]=l;for(var s=2;s<i;s++)r[s]=t[s];return n.createElement.apply(null,r)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},1771:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>d,contentTitle:()=>r,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var n=t(7462),o=(t(7294),t(4137));const i={title:"FAQ"},r=void 0,l={unversionedId:"faq",id:"faq",title:"FAQ",description:"Can I use p2panda already?",source:"@site/docs/faq.md",sourceDirName:".",slug:"/faq",permalink:"/faq",draft:!1,tags:[],version:"current",frontMatter:{title:"FAQ"}},d={},s=[{value:"Can I use p2panda already?",id:"can-i-use-p2panda-already",level:2},{value:"How about permissions?",id:"how-about-permissions",level:2},{value:"Is p2panda decentralised or federated?",id:"is-p2panda-decentralised-or-federated",level:2},{value:"Can I upload images, videos, audio with p2panda?",id:"can-i-upload-images-videos-audio-with-p2panda",level:2},{value:"Do you have CRDTs?",id:"do-you-have-crdts",level:2},{value:"Why is there a &quot;server&quot; in a decentralised protocol?",id:"why-is-there-a-server-in-a-decentralised-protocol",level:2},{value:"Does p2panda encrypt data?",id:"does-p2panda-encrypt-data",level:2},{value:"Does p2panda run on smartphones?",id:"does-p2panda-run-on-smartphones",level:2},{value:"Is p2panda &quot;offline-first&quot;?",id:"is-p2panda-offline-first",level:2},{value:"How can I refer to another document?",id:"how-can-i-refer-to-another-document",level:2},{value:"Can nodes replicate data with each other?",id:"can-nodes-replicate-data-with-each-other",level:2},{value:"Can nodes already find each other on the network?",id:"can-nodes-already-find-each-other-on-the-network",level:2},{value:"Can I delete data?",id:"can-i-delete-data",level:2},{value:"How can I keep old data?",id:"how-can-i-keep-old-data",level:2},{value:"Wasn&#39;t there something about a festival?",id:"wasnt-there-something-about-a-festival",level:2},{value:"How can I contact you?",id:"how-can-i-contact-you",level:2}],p={toc:s};function c(e){let{components:a,...t}=e;return(0,o.kt)("wrapper",(0,n.Z)({},p,t,{components:a,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"can-i-use-p2panda-already"},"Can I use p2panda already?"),(0,o.kt)("p",null,"You can already write full p2p applications on top of p2panda since all core features (collaborative editing, schemas, queries, discovery, replication, blobs etc.) are implemented and stable, still we do not recommend to run these applications in untrusted and open network scenarios. p2panda has not been audited yet for any security vulnerabilities and still lacks important features around security and data privacy. With this years funding we're focusing on capabilities and encryption followed by a security audit. After this period we will reach our first official release where we can assure security and privacy over user data."),(0,o.kt)("h2",{id:"how-about-permissions"},"How about permissions?"),(0,o.kt)("p",null,"All data can currently be edited and deleted by everyone. In our upcoming funding period we will be focussing on introducing a capability system to allow more fine-grained control over what permissions users have, including reading, writing and deleting data but also custom permissions which are specific to your application logic."),(0,o.kt)("h2",{id:"is-p2panda-decentralised-or-federated"},"Is p2panda decentralised or federated?"),(0,o.kt)("p",null,"It can be both! We thought it's good to let the developers, users and communities decide what setting is best for them. In any case, independent of how the users finally run their nodes, they will always be able to talk to each other, whether they are hosted locally (decentralised) or shared between many clients (federated)."),(0,o.kt)("h2",{id:"can-i-upload-images-videos-audio-with-p2panda"},"Can I upload images, videos, audio with p2panda?"),(0,o.kt)("p",null,"Yes! The blob feature is inspired by BitTorrent but with social and encryption features on top. Data is sliced into 256kb pieces and identified with a hash as it is based on our p2panda core data types. We materialize data directly into the file system and serve it via HTTP on nodes."),(0,o.kt)("h2",{id:"do-you-have-crdts"},"Do you have CRDTs?"),(0,o.kt)("p",null,"Yes, p2panda ",(0,o.kt)("em",{parentName:"p"},"Operations")," are Conflict-free Replicated Data Types (CRDTs). The cool thing is you can define any shape of data and p2panda will figure out how to handle merge conflicts automatically."),(0,o.kt)("h2",{id:"why-is-there-a-server-in-a-decentralised-protocol"},'Why is there a "server" in a decentralised protocol?'),(0,o.kt)("p",null,"p2panda has been designed with browser-friendliness in mind as it is still very hard to build full p2p applications running only in browsers, besides they can become slow on mobile devices when doing all of the heavy work. For this reason p2panda can be used with an external node (you can also call it \"server\") which does the heavy lifting for browser clients. You don't have to do this if you're interested in fully decentralised setups (you can embed a node ",(0,o.kt)("em",{parentName:"p"},"inside")," of your client). That being said, it is still not possible to reliably discover other nodes in a p2p network without some sort of signalling server infrastructure."),(0,o.kt)("h2",{id:"does-p2panda-encrypt-data"},"Does p2panda encrypt data?"),(0,o.kt)("p",null,"By default all published data is not encrypted. p2panda offers ",(0,o.kt)("a",{parentName:"p",href:"/specification/encryption"},"Secret Group")," to allow group encryption between multiple peers. For this p2panda uses ",(0,o.kt)("a",{parentName:"p",href:"https://messaginglayersecurity.rocks/"},"Messaging Layer Security")," (MLS) under the hood. While technically it is already possible to write encrypted applications (we will provide an example soon), for the upcoming funding period we are working on a high-level API which will make using encryption more seamless for developers."),(0,o.kt)("h2",{id:"does-p2panda-run-on-smartphones"},"Does p2panda run on smartphones?"),(0,o.kt)("p",null,"Yes! Very well actually, ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/p2panda/meli/"},"we've shipped an Android app")," built with flutter using p2panda with FFI bindings inside of it."),(0,o.kt)("h2",{id:"is-p2panda-offline-first"},'Is p2panda "offline-first"?'),(0,o.kt)("p",null,"Yes, you can embed an p2panda ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/p2panda/aquadoggo"},"node")," inside of your application, so it will live right next to your client, locally on your machine. With this approach you can still publish data to a node even when you are offline."),(0,o.kt)("h2",{id:"how-can-i-refer-to-another-document"},"How can I refer to another document?"),(0,o.kt)("p",null,"If you're looking for expressing relations between different sorts of data, similar to SQL, you should read about relation fields in operations. With p2panda you can express a reference to another document which automatically gets materialised in a GraphQL query."),(0,o.kt)("h2",{id:"can-nodes-replicate-data-with-each-other"},"Can nodes replicate data with each other?"),(0,o.kt)("p",null,"Yes! We have a ",(0,o.kt)("a",{parentName:"p",href:"/specification/replication"},"replication protocol")," which is implemented in ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/p2panda/aquadoggo/"},(0,o.kt)("inlineCode",{parentName:"a"},"aquadoggo")),". The nodes will automatically discover and sync with each other."),(0,o.kt)("h2",{id:"can-nodes-already-find-each-other-on-the-network"},"Can nodes already find each other on the network?"),(0,o.kt)("p",null,"Yes! Nodes can find each other in a local network via mDNS and on the internet with the help of rendesvouz nodes. Check out ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/p2panda/aquadoggo/"},(0,o.kt)("inlineCode",{parentName:"a"},"aquadoggo"))," which is our current node implementation."),(0,o.kt)("h2",{id:"can-i-delete-data"},"Can I delete data?"),(0,o.kt)("p",null,'Our data types support deletion of different kinds, either in form of "garbage collection" (automatically detecting and removing unused data), "pruning" (removing history of a document) or "full deletion" (removing everything), even without leaving a tombstone for each deleted document. Please note that while we have ideas and specifications for these things actual deletion is not implemented yet but we\'re aiming for it in our next funding period. For the future we\'re also looking into making ephemeral documents a default, data will automatically be deleted when it has not been explicitly kept alive after a certain amount of time.'),(0,o.kt)("h2",{id:"how-can-i-keep-old-data"},"How can I keep old data?"),(0,o.kt)("p",null,'If you want to keep historical data you can create a "pinned relation" which will "pin" the document view in its given state. Nodes will detect there is a dependency to this particular version and usually not automatically delete pinned document views.'),(0,o.kt)("h2",{id:"wasnt-there-something-about-a-festival"},"Wasn't there something about a festival?"),(0,o.kt)("p",null,"Yes! We started as a group which wanted to build a p2p ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/p2panda/festival-tool"},"festival organisation tool")," and p2panda came out of that. We will still make a festival client (on top of p2panda) and probably organise a festival sometime!"),(0,o.kt)("h2",{id:"how-can-i-contact-you"},"How can I contact you?"),(0,o.kt)("p",null,"Write us an email at ",(0,o.kt)("a",{parentName:"p",href:"mailto:contributors@p2panda.org"},"contributors@p2panda.org"),"."))}c.isMDXComponent=!0}}]);