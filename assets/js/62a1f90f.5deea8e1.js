(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[1364],{9558:(e,n,i)=>{e.exports={src:{srcSet:i.p+"assets/ideal-img/networking-flow-diagram.02a26da.1287.png 1287w",images:[{path:i.p+"assets/ideal-img/networking-flow-diagram.02a26da.1287.png",width:1287,height:970}],src:i.p+"assets/ideal-img/networking-flow-diagram.02a26da.1287.png",toString:function(){return i.p+"assets/ideal-img/networking-flow-diagram.02a26da.1287.png"},placeholder:void 0,width:1287,height:970},preSrc:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA/klEQVR4nBXQT1OCQABAcb7/d+jYpanp1qHxWjaYpoZZICFqShjsLsv+EWd8Dad3fr9AtQ6pHdZ7FpHnbeyZzzzjULMvLMpYhHYEUluc7xglK6aTJ9IoJIleSeKWqnZ05zPWdwTr5Rffs4hCaMosQ+Y5It/QcSH7FIwfdyzDkkBIybGqiUXB5K5geLVjdP2DqmL22x3JckO+PhBkmeH9o+F+mpJENat5Tbqo+I1vUGKL6S5o5wnCYcNgIHmYlEjrsecTpjvRiAzVCKT2qNYSlEdLtm25fT5Q1gbRGGplCF8s+4NDW4fqr7VzKOtYFxrRWHqFvvmm5U9YGuPoCf8BiNon76cMUJsAAAAASUVORK5CYII="}},2673:(e,n,i)=>{"use strict";i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>d,toc:()=>c});var t=i(5893),s=i(1151),o=i(2233);const r={id:"networking",title:"Networking"},a=void 0,d={id:"specifications/aquadoggo/networking/networking",title:"Networking",description:"Introduction",source:"@site/docs/specifications/aquadoggo/networking/networking.md",sourceDirName:"specifications/aquadoggo/networking",slug:"/specifications/aquadoggo/networking/",permalink:"/specifications/aquadoggo/networking/",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"networking",title:"Networking"},sidebar:"specifications",previous:{title:"Clients and nodes",permalink:"/specifications/aquadoggo/networking/clients-nodes"},next:{title:"Replication",permalink:"/specifications/aquadoggo/replication"}},l={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Terminology",id:"terminology",level:2},{value:"Strategies",id:"strategies",level:2},{value:"Internet layer with libp2p",id:"internet-layer-with-libp2p",level:3},{value:"Core Abstractions",id:"core-abstractions",level:4},{value:"Diagram",id:"diagram",level:4},{value:"Transport Layer",id:"transport-layer",level:4},{value:"Discovery",id:"discovery",level:4},{value:"mDNS",id:"mdns",level:5},{value:"Rendezvous Nodes",id:"rendezvous-nodes",level:5},{value:"Identity",id:"identity",level:4},{value:"Connectivity",id:"connectivity",level:4},{value:"Direct connection",id:"direct-connection",level:5},{value:"Relayed connection",id:"relayed-connection",level:5},{value:"Direct Connection Upgrade through Relay (DCUtR)",id:"direct-connection-upgrade-through-relay-dcutr",level:5},{value:"<code>aquadoggo</code> networking modes",id:"aquadoggo-networking-modes",level:4},{value:"Security and privacy",id:"security-and-privacy",level:4},{value:"Tor Strategy",id:"tor-strategy",level:3}];function h(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",p:"p",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,t.jsx)(n.p,{children:"p2panda doesn't have a strict specification around it's networking layer. We\nwant p2panda to be used in all sorts of contexts, let it be Low-Energy\nBluetooth, LoRa, Tor, Mesh Networks, internet or anything else."}),"\n",(0,t.jsx)(n.h2,{id:"terminology",children:"Terminology"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["In p2panda ",(0,t.jsx)(n.em,{children:"nodes"})," participate actively in the network, storing and replicating\ndata with each other."]}),"\n",(0,t.jsxs)(n.li,{children:["In order to achieve this, certain networking guarantees need to be met:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Nodes must know or be able to discover the addresses of other nodes on\ntheir network"}),"\n",(0,t.jsx)(n.li,{children:"Nodes must be able to establish (uni- or bi-directional) channels of\ncommunication with other nodes at these known addresses"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Patterns needed for achieving these conditions can be described as\n",(0,t.jsx)(n.em,{children:"discovery"})," and ",(0,t.jsx)(n.em,{children:"connectivity"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsxs)(n.p,{children:["While the current ",(0,t.jsx)(n.a,{href:"/specifications/aquadoggo/replication",children:"replication protocol"})," assumes a bi-directional communication\nchannel it would be theoretically possible to build p2panda on top of a\nbroadcast-only networking topology (for example on top of LoRa or other radio\nprotocols). The append-only nature of the underlying p2panda data type make\nthis a good fit."]})}),"\n",(0,t.jsx)(n.h2,{id:"strategies",children:"Strategies"}),"\n",(0,t.jsx)(n.p,{children:"Rather than giving strict requirements we are listing currently known,\nimplemented and recommended strategies for different networks to achieve\nconnectivity and discovery of nodes."}),"\n",(0,t.jsx)(n.p,{children:"Developers can see these recommendations as starting points for their own\napproaches, experiment with their own or fork and build on top of them."}),"\n",(0,t.jsx)(n.h3,{id:"internet-layer-with-libp2p",children:"Internet layer with libp2p"}),"\n",(0,t.jsxs)(n.p,{children:["To achieve discovery and connectivity on top of the internet layer in the\ninternet protocol suite we've successfully implemented a stack based on top of\nthe ",(0,t.jsx)(n.a,{href:"https://libp2p.io",children:"libp2p"})," protocol using ",(0,t.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/QUIC",children:"QUIC"})," with TLS encryption as the underlying\ntransport layer."]}),"\n",(0,t.jsx)(n.p,{children:"libp2p is a collection of general purpose, modular, p2p networking protocols.\nIt solves discovery of nodes in local networks (via mDNS) and the internet (via\nRendezvous nodes) and establishes connectivity between them, even when they are\nbehind firewalls or NATs (via UDP holepunching and / or Relay nodes)."}),"\n",(0,t.jsxs)(n.p,{children:["This strategy is currently implemented in our ",(0,t.jsx)(n.a,{href:"https://github.com/p2panda/aquadoggo/",children:(0,t.jsx)(n.code,{children:"aquadoggo"})})," reference\nimplementation."]}),"\n",(0,t.jsx)(n.h4,{id:"core-abstractions",children:"Core Abstractions"}),"\n",(0,t.jsxs)(n.p,{children:["libp2p comes with its own set of core abstractions and data types which are\nused throughout the system. While p2panda does ",(0,t.jsx)(n.em,{children:"not"})," make use of them in its\nown core specification, they are part of this strategy."]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/libp2p/specs/blob/master/addressing/README.md",children:"Addressing"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Working with addresses in libp2p."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/libp2p/specs/blob/master/connections/README.md",children:"Connections and\nUpgrading"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Establishing secure, multiplexed connections between nodes, possibly over\ninsecure, single stream transports."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/libp2p/specs/blob/master/peer-ids/peer-ids.md",children:"Peer Ids and\nKeys"})," -\nPublic key types & encodings, peer id calculation, and message signing\nsemantics"]}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"diagram",children:"Diagram"}),"\n",(0,t.jsx)(o.Z,{title:"Flow diagram of aquadoggo networking strategy by @glyph",url:i(9558)}),"\n",(0,t.jsx)(n.h4,{id:"transport-layer",children:"Transport Layer"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aquadoggo"})," uses ",(0,t.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/QUIC",children:"QUIC"})," as the transport\nlayer for communication between nodes"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"libp2p"})," QUIC specification: ",(0,t.jsx)(n.a,{href:"https://github.com/libp2p/specs/tree/master/quic",children:"https://github.com/libp2p/specs/tree/master/quic"})]}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"discovery",children:"Discovery"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Addresses can be added manually if they're known and static"}),"\n",(0,t.jsx)(n.li,{children:"On the same local network, discovery is achieved via mDNS"}),"\n",(0,t.jsxs)(n.li,{children:["Otherwise we're utilising ",(0,t.jsx)(n.em,{children:"Rendezvous Nodes"})," to allow discovery over the\ninternet for nodes with dynamic addresses"]}),"\n"]}),"\n",(0,t.jsx)(n.h5,{id:"mdns",children:"mDNS"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Nodes existing on the same LAN can discover each other over mDNS and then\ninitiate connections"}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"libp2p"})," mDNS discovery specification:\n",(0,t.jsx)(n.a,{href:"https://github.com/libp2p/specs/blob/master/discovery/mdns.md",children:"https://github.com/libp2p/specs/blob/master/discovery/mdns.md"})]}),"\n"]}),"\n",(0,t.jsx)(n.h5,{id:"rendezvous-nodes",children:"Rendezvous Nodes"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"A rendezvous server handles registering new nodes and making their addresses\nknown to other nodes on the same network"}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"libp2p"})," rendezvous server specification:\n",(0,t.jsx)(n.a,{href:"https://github.com/libp2p/specs/tree/master/rendezvous",children:"https://github.com/libp2p/specs/tree/master/rendezvous"})]}),"\n",(0,t.jsx)(n.li,{children:"Any node on the network can act as a rendezvous node"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"identity",children:"Identity"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"libp2p"})," relies on the identify protocol to exchange basic information\nbetween nodes. This includes identification of external addresses, exhange of\nunique identifiers and supported network protocols"]}),"\n",(0,t.jsx)(n.li,{children:"The identify protocol provides a vital mechanism for a node to learn it's\nexternal address before registering with a rendezvous server. Without this\ninformation, rendezvous registration will fail"}),"\n",(0,t.jsx)(n.li,{children:"p2panda does not have a strong recommendation around node identities. The\nidentity is derived from the key pair and hashed to not leak the original\npublic key. It is possible to generate the key pair newly on each start of a\nnode"}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"libp2p"})," identify protocol specification:\n",(0,t.jsx)(n.a,{href:"https://github.com/libp2p/specs/tree/master/identify",children:"https://github.com/libp2p/specs/tree/master/identify"})]}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"connectivity",children:"Connectivity"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Once nodes have discovered each other, then they need to be able to establish\na connection. As stated above, ",(0,t.jsx)(n.code,{children:"aquadoggo"})," uses QUIC as the transport layer\nfor all application data. However, nodes often exhibit different networking\ncapabilities depending on several factors:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Do they have a static ip?"}),"\n",(0,t.jsx)(n.li,{children:"Are they publicly accessible over the internet?"}),"\n",(0,t.jsx)(n.li,{children:"Are they behind a public or private NAT or firewall?"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"Strategies for answering these questions dynamically and negotiating how a\nconnection can be established are required"}),"\n"]}),"\n",(0,t.jsx)(n.h5,{id:"direct-connection",children:"Direct connection"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The easiest situation is that one node has a public IP address, in this case\nit can be dialed by the other node on it's libp2p multiaddress"}),"\n",(0,t.jsx)(n.li,{children:"Nodes listen on their announced multiaddresses for incoming connections"}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"libp2p"})," connection specification: ",(0,t.jsx)(n.a,{href:"https://github.com/libp2p/specs/tree/master/connections",children:"https://github.com/libp2p/specs/tree/master/connections"})]}),"\n"]}),"\n",(0,t.jsx)(n.h5,{id:"relayed-connection",children:"Relayed connection"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"If a node wishes to connect to a second node that is not publicly\naddressable, a third node with a public address can act as a relay for their\nmessages"}),"\n",(0,t.jsx)(n.li,{children:"Nodes listen on their announced relay multiaddress for incoming, relayed\nconnections"}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"libp2p"})," relay specification: ",(0,t.jsx)(n.a,{href:"https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md",children:"https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md"})]}),"\n"]}),"\n",(0,t.jsx)(n.h5,{id:"direct-connection-upgrade-through-relay-dcutr",children:"Direct Connection Upgrade through Relay (DCUtR)"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Where possible, relayed traffic will be upgraded to a direct connection"}),"\n",(0,t.jsx)(n.li,{children:"This involves a process of gathering knowledge about the nature of the NAT a\nnode is hidden behind and then negotiating a hole-punching procedure which\nultimately results in a direct connection being established"}),"\n",(0,t.jsx)(n.li,{children:"This is not always successful, using QUIC improves the chances of success"}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"libp2p"})," DCUtR specification: ",(0,t.jsx)(n.a,{href:"https://github.com/libp2p/specs/blob/master/relay/DCUtR.md",children:"https://github.com/libp2p/specs/blob/master/relay/DCUtR.md"})]}),"\n"]}),"\n",(0,t.jsxs)(n.h4,{id:"aquadoggo-networking-modes",children:[(0,t.jsx)(n.code,{children:"aquadoggo"})," networking modes"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:['In order to enable discovery and facilitate connectivity as a/for edge nodes,\nany node on the network can serve the above protocols in "client" and/or\n"server" mode. In short, an aquadoggo node can function in the following\nmodes:',"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Rendezvous server"}),"\n",(0,t.jsx)(n.li,{children:"Rendezvous client"}),"\n",(0,t.jsx)(n.li,{children:"Relay server"}),"\n",(0,t.jsx)(n.li,{children:"Relay client"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"The network modes can also be combined. For example, a node may run as both a\nrelay client and rendezvous client or both a relay server and rendezvous\nserver."}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"security-and-privacy",children:"Security and privacy"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["These strategies allow very flexible discovery and connectivity building\nblocks which vary drastically in terms of privacy and security. While\n",(0,t.jsx)(n.code,{children:"aquadoggo"})," by default opts into the most secure setting, depending on the\nsecurity and privacy requirements of an application different measures should\nbe taken into account"]}),"\n",(0,t.jsxs)(n.li,{children:["Utilising Rendezvous and Relay nodes might leak IP addresses on the internet,\npotentially with untrusted and unknown nodes. It is recommended to keep a\ntable of known IP addresses instead and only connect to them. If this is not\nan option, it is recommended to run p2panda over an anonymization layer like\nTor. If Tor is not an option it is possible to only create data in a\nfederated setting where a trusted node is statically hosted and used by\nmultiple clients. This node will ",(0,t.jsx)(n.em,{children:"not"})," forward IP addresses from clients"]}),"\n",(0,t.jsx)(n.li,{children:'Nodes can connect to each other as soon as they are discovered and speak the\nsame protocol. In case it is required to isolate your network from other\n"valid" nodes but still keeping dynamic discovery intact, a form of protected\noverlay network is recommended. This can be achieved with making use of VPNs\nor adding authentication to centralised and known rendezvous points. "Network\nkeys" and such are currently not supported by libp2p / QUIC and also not\nrecommended (redundant and expensive double encryption of transported data)'}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"tor-strategy",children:"Tor Strategy"}),"\n",(0,t.jsxs)(n.p,{children:["An integration of onion services in ",(0,t.jsx)(n.code,{children:"aquadoggo"})," is pending as soon as the Rust\nport ",(0,t.jsx)(n.code,{children:"arti"})," is ready. For now it can still be achieved with wrapping the node\naround an external onion service layer."]})]})}function p(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},2233:(e,n,i)=>{"use strict";i.d(n,{Z:()=>r});i(7294);var t=i(5944);const s={"image-frame":"image-frame_fg61","image-frame-inner":"image-frame-inner_Xabn","image-frame-title":"image-frame-title_UNlE"};var o=i(5893);function r(e){let{title:n,url:i}=e;return i?(0,o.jsxs)("div",{className:s["image-frame"],children:[(0,o.jsx)("div",{className:s["image-frame-inner"],children:(0,o.jsx)(t.Z,{alt:n,title:n,img:i})}),n&&(0,o.jsx)("div",{className:s["image-frame-title"],children:n})]}):null}}}]);