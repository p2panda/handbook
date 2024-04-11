"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[4345],{3036:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>n,metadata:()=>o,toc:()=>h});var a=i(5893),s=i(1151);const n={title:"Access control in a p2p world"},r=void 0,o={permalink:"/blog/2024/04/08/capabilities",source:"@site/blog/2024-04-08-capabilities.md",title:"Access control in a p2p world",description:"TLDR; capability based access control system designs for p2panda//github.com/p2panda/capabilities/blob/main/DESIGN.md",date:"2024-04-08T00:00:00.000Z",formattedDate:"April 8, 2024",tags:[],hasTruncateMarker:!1,authors:[],frontMatter:{title:"Access control in a p2p world"},unlisted:!1,nextItem:{title:"Plans 2024",permalink:"/blog/2024/01/17/roadmap-24"}},l={authorsImageUrls:[]},h=[{value:"Introduction",id:"introduction",level:2},{value:"Authoring and owning data",id:"authoring-and-owning-data",level:2},{value:"Access token basics",id:"access-token-basics",level:2},{value:"What do we need?",id:"what-do-we-need",level:2},{value:"Supported ownership models",id:"supported-ownership-models",level:3},{value:"The research",id:"the-research",level:2},{value:"CapTP / OCapN (Agoric, Spritely, Cap&#39;N&#39;Proto)",id:"captp--ocapn-agoric-spritely-capnproto",level:3},{value:"Links",id:"links",level:4},{value:"UCAN",id:"ucan",level:3},{value:"Links",id:"links-1",level:4},{value:"Biscuit",id:"biscuit",level:3},{value:"Links",id:"links-2",level:4},{value:"Our approach",id:"our-approach",level:2},{value:"Thanks",id:"thanks",level:2}];function c(e){const t={a:"a",blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",ul:"ul",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.p,{children:(0,a.jsxs)(t.em,{children:["TLDR; capability based access control system designs for p2panda: ",(0,a.jsx)(t.a,{href:"https://github.com/p2panda/capabilities/blob/main/DESIGN.md",children:"https://github.com/p2panda/capabilities/blob/main/DESIGN.md"})]})}),"\n",(0,a.jsx)(t.h2,{id:"introduction",children:"Introduction"}),"\n",(0,a.jsx)(t.p,{children:"Hello \ud83d\udc4b and welcome to the first p2panda research blog post! This is the start of series of posts where we'll be publicly documenting our research process. We've always cared about making our system designs accessible and publishing tutorials and other learning resources. This is an effort to also make our research more transparent and hopefully useful to users and developers in the wider p2p ecosystem."}),"\n",(0,a.jsx)(t.p,{children:"One of our primary tasks over the next months is to design and implement an access control system for p2panda. This is no simple matter in a leaderless peer-to-peer network. When using centralized services, we put our trust in a single provider, and delegate to them responsibility for storing data and authorizing access requests. This will likely involve agreeing user credentials (username, password etc..). By knowing these credentials it is assumed we have authority to access to my data."}),"\n",(0,a.jsxs)(t.p,{children:['This model is not possible (or welcome!) in peer-to-peer systems. There is no central source of authority, so we need a way for peers to communicate authority boundaries themselves, in a away which allows all peers on the network to act as "authorizer" when handling access requests. There are many well researched approaches to designing access control systems in multi-actor systems, originating not only in network technologies, but also operating system design and asynchronous programming environments, which offer solutions to this very problem. Many of these incorporate patterns from Capability-based Security ',(0,a.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Capability-based_security",children:"wikipedia"})," systems. In the rest of this article we'll go a little deeper into what a system like this needs to look like for p2panda, look over a few systems we've spent time researching, and then share our current designs."]}),"\n",(0,a.jsx)(t.h2,{id:"authoring-and-owning-data",children:"Authoring and owning data"}),"\n",(0,a.jsxs)(t.p,{children:["Peer-to-peer protocols such as p2panda use public-key cryptography and digital signatures to establish the identity of peers and the authenticity of messages replicated on a network. Any peer can verify that messages it receives were created by the claimed peer (public key), and that they have not been tampered with by any third parties. This technically allows peers to replicate messages freely to ",(0,a.jsx)(t.em,{children:"anyone"}),", safe in the knowledge that the original author of the message can be verified and if tampering occurred it will be detected."]}),"\n",(0,a.jsxs)(t.p,{children:['What if we don\'t want to share data with everyone though? Even if we know it won\'t be tampered with, we understandably want a stricter system where an author has control over where their data can travel, and how peers are allowed to interact with it. If we understand "authorship" as equal to "ownership" then we can say that only an owner has "read" and "write" authority over the data they created ("write" authority being relevant to long-lived mutable data). This actually now sounds a little like our centralized service described above, there is again a "single service" which controls your data, this time it\'s ',(0,a.jsx)(t.em,{children:"you"})," though."]}),"\n",(0,a.jsx)(t.h2,{id:"access-token-basics",children:"Access token basics"}),"\n",(0,a.jsxs)(t.p,{children:["If we all kept our data to ourselves, this wouldn't be very interesting though, in healthy collaborative peer-to-peer networks you want to share your data with peers you trust and let them share it further too. Token based capabilities offer us patterns for making this possible. Let's say that I've authored some blog posts which I want all my friends to be able to read, I can hand out unforgeable (signed) tokens to each of them, which states that they can \"read\" any posts I write. Equally, my friends can prove to ",(0,a.jsx)(t.em,{children:"each other"})," that they have been authorized (by me) to read the posts, and so can share posts between themselves when I'm not even there. In rather simplified terms, this is how token based capabilities work."]}),"\n",(0,a.jsxs)(t.p,{children:["Don't take my word for it though, from ",(0,a.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Capability-based_security",children:"wikipedia"}),":"]}),"\n",(0,a.jsxs)(t.blockquote,{children:["\n",(0,a.jsx)(t.p,{children:"Capability-based security is a concept in the design of secure computing systems, one of the existing security models. A capability (known in some systems as a key) is a communicable, unforgeable token of authority. It refers to a value that references an object along with an associated set of access rights. A user program on a capability-based operating system must use a capability to access an object. Capability-based security refers to the principle of designing user programs such that they directly share capabilities with each other according to the principle of least privilege, and to the operating system infrastructure necessary to make such transactions efficient and secure. Capability-based security is to be contrasted with an approach that uses traditional UNIX permissions and Access Control Lists."}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"what-do-we-need",children:"What do we need?"}),"\n",(0,a.jsx)(t.p,{children:"We came to this research with a set of requirements for any capability system to be used with p2panda:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"authors have fine-grained control over who can access and perform actions their data"}),"\n",(0,a.jsx)(t.li,{children:"tokens can be distributed freely but only used by the intended recipient"}),"\n",(0,a.jsx)(t.li,{children:"delay tolerant networks and offline-first operation supported"}),"\n",(0,a.jsx)(t.li,{children:"tokens can be delegated and revoked"}),"\n",(0,a.jsx)(t.li,{children:"role based access control patterns can be modeled"}),"\n",(0,a.jsx)(t.li,{children:'hierarchical and "flat" ownership of resources can be modeled'}),"\n"]}),"\n",(0,a.jsx)(t.h3,{id:"supported-ownership-models",children:"Supported ownership models"}),"\n",(0,a.jsx)(t.p,{children:'A requirement of our system is that it allows developers to build apps which model both "flat" and hierarchical ownership structures with suitable access control boundaries.'}),"\n",(0,a.jsxs)(t.p,{children:["The below diagram sketches the access control boundaries for a festival and it's schedule of events. The application data has hierarchical ownership structure. There is an admin group which owns the festival and collection of events, organisers are delegated ",(0,a.jsx)(t.code,{children:"collection/add"})," authority so they can add events to the collection, they own any events they create. Visitors are given ",(0,a.jsx)(t.code,{children:"document/read"})," authority for the festival info and all it's events."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{src:"https://laub.liebechaos.org/uploads/6b5055c1-70bd-4446-808b-fff3caaaa9af.png",alt:""})}),"\n",(0,a.jsx)(t.p,{children:'In the following diagram we can see how non-hierarchical ownership can be modeled with a photo sharing app. The app displays to the user a collection of photos, this isn\'t an "owned" collection as no peer has overall authority over it, each user will have their own photo collection. All they need is read authority for any published photos.'}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{src:"https://laub.liebechaos.org/uploads/3c5801fc-308e-43d1-8ca7-f229f9118a2e.png",alt:""})}),"\n",(0,a.jsx)(t.h2,{id:"the-research",children:"The research"}),"\n",(0,a.jsx)(t.p,{children:"I've spent a substantial amount of time researching capability systems over the last months, and I still feel like I've only scratched the surface. Here is a selection of projects I've looked into, chosen for their differing approaches and relation to our design goals."}),"\n",(0,a.jsx)(t.h3,{id:"captp--ocapn-agoric-spritely-capnproto",children:"CapTP / OCapN (Agoric, Spritely, Cap'N'Proto)"}),"\n",(0,a.jsxs)(t.p,{children:['CapTP (Capability Transport Protocol) is an object-capability protocol which allows "distributed object programming over mutually suspicious networks". It\'s  origin is in the E programming language which is described as "an object-capability programming language and platform for writing distributed, secure, and robust software". Sounds good to me so far ',"\ud83d\ude04"," ! There are various implementations out there, notably in Spritely, Agoric and Cap'N'Proto. There's also a (pre-)standardization effort underway for OCapN (Object Capability Network) network suite which incorporates CapTP."]}),"\n",(0,a.jsx)(t.p,{children:"Despite the system properties feeling intuitively familiar, penetrating the details of the protocol design was actually a challenge. The reasons for this were firstly that important resources are spread across many projects (from the 90s to current day) so it took quite some searching to feel like I was getting a full picture, and secondly many of the implementations are in languages that I'm not familiar with, so reading through codebases took some extra mental overhead. No fault to be placed anywhere for these factors (decentralization, yay!!), but it was my experience as a new-comer to the ecosystem. Once I got through that though, the very active ecosystems and resources around these projects provided excellent insight into common approaches to capability systems. Certainly looking into the patterns explored by these projects is a great way to understand where the theories around object-capability models originate and how they're being implemented today. There's a radical spirit and and ambition around much of the work in this particular capability corner which is especially inspiring."}),"\n",(0,a.jsx)(t.p,{children:"In terms of the features we require, it seems that the CapTP model is aimed at environments where the protocol can run over live connections between peers. Typically a capability will last for the lifetime of a connection, but no longer. I know there are features of the protocol which can be used to extend this lifetime, something which would be needed for our use, but this is at least the starting assumption I believe."}),"\n",(0,a.jsx)(t.h4,{id:"links",children:"Links"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"https://spritely.institute/",children:"spritely institute"})}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"https://github.com/capnproto/capnproto/blob/v2/c%2B%2B/src/capnp/rpc.capnp",children:"impressively commented Cap'N'Proto RPC document"})," (best resource for CapTP overview)"]}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"http://wiki.erights.org/wiki/Main_Page",children:"E programming language"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"https://ocapn.org/",children:"OCapN standardization effort"})}),"\n"]}),"\n",(0,a.jsx)(t.h3,{id:"ucan",children:"UCAN"}),"\n",(0,a.jsxs)(t.p,{children:['UCAN (User Controlled Authorization Networks) is described as: "an extension of the popular JSON Web Token format specifically designed to enable ways of authorizing offline-first apps and distributed systems". Again, we\'re on the right track! Here research was quite straightforward, the design and core data types can be grasped by looking at their website landing page ',"\ud83d\ude4f",". Their token based approach felt fairly intuitive to pick-up, although not being super familiar with DIDs held me back a little. Their use of JWTs seems to be an explicit attempt to aid in adoption as it's a familiar format for web devs already. There's an active community around the specifications and implementations, with libraries available in Rust and TypeScript."]}),"\n",(0,a.jsxs)(t.p,{children:["It's impressive (and I'm grateful for) how simple and intuitive UCANs are in their design, and the specification is excellent (bonus material if you reach the end of the spec is a useful roll-call of capability systems ",(0,a.jsx)(t.a,{href:"https://github.com/ucan-wg/spec?tab=readme-ov-file#10-related-work-and-prior-art",children:"movers and shakers"}),"). Of particular interest to us is their first-class support for offline-first applications and delay tolerant networking."]}),"\n",(0,a.jsx)(t.h4,{id:"links-1",children:"Links"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"https://ucan.xyz/",children:"UCAN homepage"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"https://github.com/ucan-wg/spec?tab=readme-ov-file",children:"UCAN specification"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"https://github.com/ucan-wg",children:"UCAN working group"})}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"https://github.com/ucan-wg/rs-ucan",children:"Rust"})," & ",(0,a.jsx)(t.a,{href:"https://github.com/ucan-wg/ts-ucan",children:"TypeScript"})," implementations"]}),"\n"]}),"\n",(0,a.jsx)(t.h3,{id:"biscuit",children:"Biscuit"}),"\n",(0,a.jsxs)(t.blockquote,{children:["\n",(0,a.jsx)(t.p,{children:"Biscuit is a bearer token that supports offline attenuation, can be verified by any system that knows the root public key, and provides a flexible authorization language based on logic programming. It is serialized as Protocol Buffers, and designed to be small enough for storage in HTTP cookies."}),"\n"]}),"\n",(0,a.jsx)(t.p,{children:"I've included Biscuit in particular for it's interesting use of a Datalog based logic language for writing authorization policies. This really jumped out as powerful and incredibly versatile approach to defining the rules which restrict the authority of a capability."}),"\n",(0,a.jsx)(t.p,{children:"In terms of features we need though, biscuit tokens cannot be distributed freely, rather the holder of a token gains authority to use it."}),"\n",(0,a.jsx)(t.h4,{id:"links-2",children:"Links"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"https://github.com/biscuit-auth/biscuit/blob/main/SPECIFICATIONS.md",children:"homepage"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"https://doc.biscuitsec.org/getting-started",children:"docs"})}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"our-approach",children:"Our approach"}),"\n",(0,a.jsx)(t.p,{children:"Our early designs shared many common ideas and provided almost the same features as UCAN tokens. After speaking with some community members it seems there are exciting developments on the next iteration of the specification which take inspiration from some of the descriptive policy features of biscuit as well as other changes which fit our system well. We've therefore based our designs on the (new) UCAN specification where possible. It made sense that we continue to rely on our existing internal data types for identity, signing, resource addressing and encoding formats though, making p2panda tokens not inter-operable with existing UCAN implementations."}),"\n",(0,a.jsxs)(t.p,{children:["Our designs are published in this git repository: ",(0,a.jsx)(t.a,{href:"https://github.com/p2panda/capabilities/blob/main/DESIGN.md",children:"https://github.com/p2panda/capabilities/blob/main/DESIGN.md"})]}),"\n",(0,a.jsx)(t.p,{children:"After some final rounds of feedback we'll be starting on the Rust implementation."}),"\n",(0,a.jsx)(t.h2,{id:"thanks",children:"Thanks"}),"\n",(0,a.jsxs)(t.p,{children:["This research wouldn't have been possible without the support we received from the ",(0,a.jsx)(t.a,{href:"https://nlnet.nl/",children:"NLNet"})," foundation! Also many thanks to our friends at ",(0,a.jsx)(t.a,{href:"https://www.scuttlebutt.nz/",children:"SSB"}),", ",(0,a.jsx)(t.a,{href:"https://willowprotocol.org/",children:"Willow"}),", ",(0,a.jsx)(t.a,{href:"https://www.digital-democracy.org/",children:"Digital Democracy"})," and ",(0,a.jsx)(t.a,{href:"https://github.com/cabal-club/cable",children:"Cable"})," for their conversations, feedback and general sharing of excellent related work along the way."]}),"\n",(0,a.jsx)(t.p,{children:"Thanks for reading, see you next time!"})]})}function d(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},1151:(e,t,i)=>{i.d(t,{Z:()=>o,a:()=>r});var a=i(7294);const s={},n=a.createContext(s);function r(e){const t=a.useContext(n);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),a.createElement(n.Provider,{value:t},e.children)}}}]);