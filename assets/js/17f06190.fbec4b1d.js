"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[5471],{7721:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>d});var i=s(5893),t=s(1151);const o={id:"replication",title:"Replication"},a=void 0,r={id:"specifications/aquadoggo/replication",title:"Replication",description:"Introduction",source:"@site/docs/specifications/aquadoggo/replication.md",sourceDirName:"specifications/aquadoggo",slug:"/specifications/aquadoggo/replication",permalink:"/specifications/aquadoggo/replication",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"replication",title:"Replication"},sidebar:"specifications",previous:{title:"Networking",permalink:"/specifications/aquadoggo/networking/"},next:{title:"Canonical Encoding",permalink:"/specifications/aquadoggo/encoding-data"}},c={},d=[{value:"Introduction",id:"introduction",level:2},{value:"Assumptions",id:"assumptions",level:3},{value:"Encoding",id:"encoding",level:2},{value:"1. Announcement",id:"1-announcement",level:2},{value:"<code>Announce</code> message",id:"announce-message",level:3},{value:"2. Replication",id:"2-replication",level:2},{value:"<code>SyncRequest</code> message",id:"syncrequest-message",level:3},{value:"2.1. Identifying divergent state",id:"21-identifying-divergent-state",level:3},{value:"Range-based set reconciliation",id:"range-based-set-reconciliation",level:4},{value:"2.2. Synchronization of data",id:"22-synchronization-of-data",level:3},{value:"<code>Entry</code> message",id:"entry-message",level:4},{value:"Validation",id:"validation",level:4},{value:"Finalisation",id:"finalisation",level:4},{value:"<code>SyncDone</code> message",id:"syncdone-message",level:5},{value:"Live Mode",id:"live-mode",level:3},{value:"Log Height Mode",id:"log-height-mode",level:3},{value:"<code>Have</code> message",id:"have-message",level:4}];function l(e){const n={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["A core data type of p2panda are ",(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/bamboo",children:"bamboo"})," append-only logs which contain sequences of application events. We build multi-writer ",(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/documents",children:"documents"})," on top of these logs."]}),"\n",(0,i.jsx)(n.li,{children:"Append-only logs are very useful in a p2p setting for achieving eventual consistency of data between peers on the network. Remotely connected peers can perform a simple log-height negotiation and then exchange only the data the other peer is missing."}),"\n",(0,i.jsx)(n.li,{children:"This document specifies how p2panda implements and expands on this replication protocol, including an announcement layer and efficient synchronization of multiple logs."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"assumptions",children:"Assumptions"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["This document makes a number of assumptions on subjects outside of it's scope. These include:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Discovery: it is assumed peers can discover the addresses of other peers on their network."}),"\n",(0,i.jsx)(n.li,{children:"Connectivity: it is assumed that peers can establish reliable, ordered and bi-directional transport channels"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["p2panda uses the ",(0,i.jsx)(n.code,{children:"libp2p"})," framework for discovery and other p2p networking mechanisms with QUIC as the transport. Further details are given in the ",(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/networking",children:"networking"})," section."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"encoding",children:"Encoding"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"p2panda uses CBOR for encoding all replication messages."}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"1-announcement",children:"1. Announcement"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The goal of replication is two peers converging to the same state, over data they are mutually interested in. This involves some sort of announcement mechanisms which aids finding peers who are interested in the same data."}),"\n",(0,i.jsx)(n.li,{children:"Data in a p2panda network can be categorised in form of schemas. Schemas are dedicated to support specific applications. A node expresses its support of an application by supporting the required schemas, trying to actively find and gather all new data from them."}),"\n",(0,i.jsx)(n.li,{children:"Before two peers begin the replication process they must first identify other peers which may hold data they are interested in."}),"\n",(0,i.jsxs)(n.li,{children:["To do this they publish an ",(0,i.jsx)(n.code,{children:"Announce"}),' message which contains the schemas that they support. Doing this is like saying "I am interested in receiving and sharing any data associated with these ',(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/schemas",children:"schemas"}),'".']}),"\n",(0,i.jsxs)(n.li,{children:["Throughout this document we introduce two exemplary peers, Peer A and Peer B, which replicate with each other:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Peer A has a set A of ",(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/documents",children:"documents"})," of ",(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/schemas",children:"schemas"})," S"]}),"\n",(0,i.jsx)(n.li,{children:"Peer B has another, diverging set B of documents of schema S"}),"\n",(0,i.jsxs)(n.li,{children:["Peer A announces they are interested in documents of schema S by publishing an ",(0,i.jsx)(n.code,{children:"Announce"})," message"]}),"\n",(0,i.jsxs)(n.li,{children:["Peer B eventually receives the ",(0,i.jsx)(n.code,{children:"Announce"})," message from Peer A, comparing it to its own interest"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Peers can actively ",(0,i.jsx)(n.em,{children:"push"})," data to other peers who announced their interest"]}),"\n",(0,i.jsxs)(n.li,{children:["Peers do not need to publish ",(0,i.jsx)(n.code,{children:"Announce"})," messages to the network to participate in replication. They can still actively monitor announcements on the network and establish connection as soon as they see fit."]}),"\n",(0,i.jsx)(n.li,{children:"The mechanism for sending and receiving announcement messages in the network is out of scope of this document, a very suitable pattern is publish-subscribe."}),"\n"]}),"\n",(0,i.jsxs)(n.h3,{id:"announce-message",children:[(0,i.jsx)(n.code,{children:"Announce"})," message"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"[\n    <message_type=0 {u64}>,\n    <version {u64}>,\n    <timestamp {u64}>,\n    [<schema_id {string}>, ...]\n]\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"message_type"})," is ",(0,i.jsx)(n.code,{children:"0"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"version"})," is the version of the replication protocol the peer supports, all following messages and mechanisms are related to that version. The first version is ",(0,i.jsx)(n.code,{children:"1"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"timestamp"})," represents the UNIX timestamp of the moment the announcement message has been created. Strictly speaking it does not need to be a real timestamp but MUST always be larger than the previously published one."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"schema_id[]"})," is a list of ",(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/schemas",children:"schemas"})," ids the peer is announcing its interest in."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Every peer is represented by exactly only one announcement state. On arrival of a new ",(0,i.jsx)(n.code,{children:"Announce"})," message the previous state gets replaced with the latest one."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["To understand which ",(0,i.jsx)(n.code,{children:"Announce"})," message is the latest, the receiving peer compares the new ",(0,i.jsx)(n.code,{children:"timestamp"})," with the current one. If an ",(0,i.jsx)(n.code,{children:"Announce"})," message arrived with a smaller or equal ",(0,i.jsx)(n.code,{children:"timestamp"})," it gets ignored, if it is larger the new state replaces the old one."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Through this peers can safely broadcast announcements while still making sure that the order is preserved, even when messages arrive out-of-order or too late."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:['Peers can "unannounce" their interest in certain data by removing the ',(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/schemas",children:"schemas"})," id in the new announcement messages. They can remove all announcements by simply sending an announcement message without any ",(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/schemas",children:"schemas"})," ids."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["In the future this message can also include additional parameters, where data can be included or excluded based on the public key of an author or a certain sub-set of the data based on ",(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/documents",children:"documents"})," ids, even specific requirements like text searches are imaginable (\"I'm interested in data containing the word x in ",(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/schemas",children:"schemas"}),' S"), similar to the filters of the current ',(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/documents",children:"documents"})," GraphQL API."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"2-replication",children:"2. Replication"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Replication is the process of two peers synchronizing the data they hold locally, eventually arriving at the state where both peers hold the same data."}),"\n",(0,i.jsxs)(n.li,{children:["In p2panda this mechanism is initiated by a ",(0,i.jsx)(n.code,{children:"SyncRequest"})," message and is then followed by two distinct replication phases:","\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Identification of the diverging state"}),"\n",(0,i.jsx)(n.li,{children:"Exchange of data."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["After learning about the other peers interests through the ",(0,i.jsx)(n.code,{children:"Announce"})," message, Peer B can initiate replication with Peer A by sending a message to initiate replication. This replication session can concern a sub-set of the announced schemas."]}),"\n",(0,i.jsx)(n.li,{children:"Over time many replication session can take place following one announcement, individually concerning different sub-sets of the announcement."}),"\n",(0,i.jsx)(n.li,{children:"Peer A and Peer B can have multiple sync sessions at the same time."}),"\n",(0,i.jsx)(n.li,{children:"If an already existing sync session was requested between the same peers concerning the same schemas, it gets ignored."}),"\n"]}),"\n",(0,i.jsxs)(n.h3,{id:"syncrequest-message",children:[(0,i.jsx)(n.code,{children:"SyncRequest"})," message"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"[\n    <message_type=1 {u64}>,\n    <session_id {u64}>,\n    <mode {u64}>,\n    [<schema_id {string}>, ...]\n]\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"message_type"})," is ",(0,i.jsx)(n.code,{children:"1"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"session_id"})," is an identifier used throughout the replication session to identify messages for this session. This helps the peers to connect the messages to the right session, especially when multiple sessions take place at the same time with the same peer. The session id starts with ",(0,i.jsx)(n.code,{children:"0"})," and is incremented by ",(0,i.jsx)(n.code,{children:"1"})," for every session and every peer. Session IDs can be reset after enough time of inactivity between two peers and usually don't need to be persisted."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"mode"})," where ",(0,i.jsx)(n.code,{children:"0"})," is ",(0,i.jsx)(n.em,{children:"Log Height"})," mode and ",(0,i.jsx)(n.code,{children:"1"})," is using ",(0,i.jsx)(n.em,{children:"Set Reconciliation"})," mode"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"schema_id[]"})," allows us to identify the range of ",(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/documents",children:"documents"})," we are interested in synchronizing (ie. all ",(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/documents",children:"documents"})," associated with this set of schemas)."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Every item in this list needs to be contained in the latest announcement state. If one ",(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/schemas",children:"schemas"})," id inside the ",(0,i.jsx)(n.code,{children:"SyncRequest"})," message of Peer B is not part of the announcement of Peer A, the request gets ignored."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"21-identifying-divergent-state",children:"2.1. Identifying divergent state"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["If we announced these ",(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/schemas",children:"schemas"})," then we move onto identifying any divergent state, this involves the following steps:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Calculate tuples of ",(0,i.jsx)(n.code,{children:"(PublicKey, LogId, SeqNum)"})," for ",(0,i.jsx)(n.em,{children:"all"})," authors who made contributions to any document associated with the ",(0,i.jsx)(n.a,{href:"/specifications/aquadoggo/data-types/schemas",children:"schemas"})," we are synchronizing."]}),"\n",(0,i.jsx)(n.li,{children:"Sort this resulting list in lexical order (from here on we will refer to this sorted list as the sync range)."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"In this step we want to efficiently identify all data which one peer may hold which the other does not yet have. This is a two way process, where ultimately both peers may need something from the other."}),"\n",(0,i.jsxs)(n.li,{children:["With this range we now want to identify any divergent state between peers:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Missing logs"}),"\n",(0,i.jsx)(n.li,{children:"Logs with more entries / higher sequence number"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"The naive way of achieving this would be for both peers to send the complete range to each other. They would then be able to calculate locally any state that diverged. This would result in unbounded lists of data being continually shared across the network, and has been proven in other p2p protocols to be a highly inefficient pattern."}),"\n",(0,i.jsx)(n.li,{children:'p2panda employs a messaging protocol called "range-based set reconciliation" to efficiently identify sub-ranges within our sync range which differ between peers.'}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"range-based-set-reconciliation",children:"Range-based set reconciliation"}),"\n",(0,i.jsxs)(n.p,{children:["Thesis proposing the protocol: ",(0,i.jsx)(n.a,{href:"https://github.com/AljoschaMeyer/master_thesis",children:"https://github.com/AljoschaMeyer/master_thesis"}),"\nProtocol implementation in TypeScript: ",(0,i.jsx)(n.a,{href:"https://github.com/earthstar-project/range-reconcile",children:"https://github.com/earthstar-project/range-reconcile"})," and Rust: ",(0,i.jsx)(n.a,{href:"https://github.com/keks/unionize",children:"https://github.com/keks/unionize"})]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"range-reconcile"})," implementation p2panda makes use of has a number of requirements we satisfy in this specification, these are:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Deterministically sorted range of items to be synced"}),"\n",(0,i.jsx)(n.li,{children:"Encoding format for messages"}),"\n",(0,i.jsx)(n.li,{children:"Lifting monoid"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"p2panda sorts it's set items in lexical order."}),"\n",(0,i.jsxs)(n.li,{children:["Messages concerning set reconciliation are encoded in the following form:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"EmptySet"})," message","\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"[\n    <message_type=20 {u64}>,\n    <session_id {u64}>,\n    <can_respond {bool}>\n]\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"LowerBound"})," message","\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"[\n    <message_type=21 {u64}>,\n    <session_id {u64}>,\n    [<public_key {string}>, <log_id {u64}>, <seq_num {u64}>]\n]\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Payload"})," message","\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"[\n    <message_type=22 {u64}>,\n    <session_id {u64}>,\n    <value {[<public_key {string}>, <log_id {u64}>, <seq_num {u64}>]}>,\n    <can_respond {bool}>?,\n    <upper_bound {[<public_key {string}>, <log_id {u64}>, <seq_num {u64}>]}>?\n]\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"EmptyPayload"})," message","\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"[\n    <message_type=23 {u64}>,\n    <session_id {u64}>,\n    <upper_bound {[<public_key {string}>, <log_id {u64}>, <seq_num {u64}>]}>\n]\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Done"})," message","\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"[\n    <message_type=24 {u64}>,\n    <session_id {u64}>,\n    <upper_bound {[<public_key {string}>, <log_id {u64}>, <seq_num {u64}>]}>\n]\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Fingerprint"})," message","\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"[\n    <message_type=25 {u64}>,\n    <session_id {u64}>,\n    <lift_type {TODO}>,\n    <upper_bound {[<public_key {string}>, <log_id {u64}>, <seq_num {u64}>]}>\n]\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Terminal"})," message","\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"[\n    <message_type=26 {u64}>,\n    <session_id {u64}>,\n]\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["All messages contain a ",(0,i.jsx)(n.code,{children:"session_id"})," which was determined during ",(0,i.jsx)(n.code,{children:"SyncRequest"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"The lifting monoid we use is based on the xxHash hashing algorithm."}),"\n",(0,i.jsx)(n.li,{children:"From this point on set reconciliation progresses until divergent state is identified. To read more about the messaging protocol please refer to the above documents."}),"\n",(0,i.jsx)(n.li,{children:"Set reconciliation and exchange of actual append-only log entries can take place at the same time as we're gaining knowledge about the other peer's state continously."}),"\n",(0,i.jsxs)(n.li,{children:["When a Peer B receives an ",(0,i.jsx)(n.code,{children:"EmptySet"})," message right from the beginning, the Peer B is asked to send all entries of the requested schemas to Peer A."]}),"\n",(0,i.jsxs)(n.li,{children:["After set reconciliation completed, both peers need to determine the logs which have not been mentioned by the other peer yet. The remaining ",(0,i.jsx)(n.code,{children:"Entry"})," messages are then sent."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"22-synchronization-of-data",children:"2.2. Synchronization of data"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Whenever a peer receives a ",(0,i.jsx)(n.code,{children:"Payload"})," then it must locally determine exactly which log entries it needs to send the other peer in order for them to converge towards the same state. It does this by:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Retrieve a log from it's local store identified by the ",(0,i.jsx)(n.code,{children:"public_key"})," and ",(0,i.jsx)(n.code,{children:"log_id"})," received in the payload","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["If no log is found, then we ",(0,i.jsx)(n.em,{children:"know"})," the other peer has data we don't know about and we can assume ",(0,i.jsx)(n.em,{children:"they"})," will send it to ",(0,i.jsx)(n.em,{children:"us"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["If a log is found and our local ",(0,i.jsx)(n.code,{children:"seq_num"})," is less than the received one we ",(0,i.jsx)(n.em,{children:"know"})," the other peer has data we don't know about and we can assume ",(0,i.jsx)(n.em,{children:"they"})," will send it to ",(0,i.jsx)(n.em,{children:"us"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["If a log is found and our local ",(0,i.jsx)(n.code,{children:"seq_num"})," is greater than the received one we ",(0,i.jsx)(n.em,{children:"know"})," we have data the other peer doesn't and we should send it to them."]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"This diffing process can take place already during set reconcilation. Sending the actual entry data can also happen simultaneously."}),"\n",(0,i.jsxs)(n.li,{children:["Whenever a peer receives an ",(0,i.jsx)(n.code,{children:"EmptySet"})," at the beginning of set reconciliation it needs to send all entry data related to the requested schemas directly"]}),"\n"]}),"\n",(0,i.jsxs)(n.h4,{id:"entry-message",children:[(0,i.jsx)(n.code,{children:"Entry"})," message"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"[\n    <message_type=2 {u64}>,\n    <session_id {u64}>,\n    <entry {bytes}>,\n    <operation {bytes}>\n]\n"})}),"\n",(0,i.jsx)(n.h4,{id:"validation",children:"Validation"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["On receiving an entry the remote peer should perform all expected validation checks of the contained data.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Next to the already specified validation checks for Bamboo Entries and p2panda Operations we need to additionally check:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Is the data related to what was requested"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"finalisation",children:"Finalisation"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"After set reconciliation finished we can finally determine which logs have not been mentioned at all by the other peer. Both peers determine the missing logs for the other peer and send all related entries."}),"\n",(0,i.jsxs)(n.li,{children:["When all data was finally sent (including the missing logs) the peer sends a ",(0,i.jsx)(n.code,{children:"SyncDone"})," message. When both peers received each others ",(0,i.jsx)(n.code,{children:"SyncDone"})," messages they can consider the replication as finished."]}),"\n",(0,i.jsxs)(n.li,{children:["If both ",(0,i.jsx)(n.code,{children:"SyncDone"})," messages have the ",(0,i.jsx)(n.code,{children:"live_mode"})," flag set to ",(0,i.jsx)(n.code,{children:"true"}),' they can continue communication with each other, in an upgraded "live mode".']}),"\n"]}),"\n",(0,i.jsxs)(n.h5,{id:"syncdone-message",children:[(0,i.jsx)(n.code,{children:"SyncDone"})," message"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"[\n    <message_type=3 {u64}>,\n    <session_id {u64}>,\n    <live_mode {bool}>\n]\n"})}),"\n",(0,i.jsx)(n.h3,{id:"live-mode",children:"Live Mode"}),"\n",(0,i.jsxs)(n.p,{children:["Two peers talking to each other for the first time, first starting with set reconciliation, replicating all data and then after finishing this upgrading to live mode. At one point (for example because the routing algorithm decided to change peers) we can close that communication as well by sending a ",(0,i.jsx)(n.code,{children:"SyncDone"})," message again, but with ",(0,i.jsx)(n.code,{children:"live_mode"})," set to false."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"SyncRequest\n.. A LOT OF SET RECONCILIATION MESSAGES .. A LOT OF `Entry` messages .. (different log heights)\n.. A LOT OF `Entry` messages .. (missing logs)\nSyncDone live_mode=true\n.. A LOT OF `Entry` messages ..\nSyncDone live_mode=false\n"})}),"\n",(0,i.jsx)(n.p,{children:"Two peers talking to each other, but opting out of live mode straight away, only replicate once over set reconciliation."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"SyncRequest\n.. A LOT OF SET RECON MESSAGES .. A LOT OF `Entry` messages .. (different log heights)\n.. A LOT OF `Entry` messages .. (missing logs)\nSyncDone live_mode=false\n"})}),"\n",(0,i.jsx)(n.h3,{id:"log-height-mode",children:"Log Height Mode"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["If for any reason it is un-desireable for a node implementation to support the recommended replication method using Set Reconciliation, then they can still participate in the network by supporting only Log Height replication by sending a ",(0,i.jsx)(n.code,{children:"Have"})," message directly after receiving a ",(0,i.jsx)(n.code,{children:"SyncRequest"})," message."]}),"\n",(0,i.jsxs)(n.li,{children:["Log Height mode should be announced in the peers ",(0,i.jsx)(n.code,{children:"Announce"})," message."]}),"\n",(0,i.jsxs)(n.li,{children:["A ",(0,i.jsx)(n.code,{children:"Have"})," message should contain a set of ",(0,i.jsx)(n.em,{children:"all"})," public key, log id, seq num tuples the peer holds for the requested sync range."]}),"\n"]}),"\n",(0,i.jsxs)(n.h4,{id:"have-message",children:[(0,i.jsx)(n.code,{children:"Have"})," message"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"[\n    <message_type=10 {u64}>,\n    <session_id {u64}>,\n    <log_height {[<public_key {string}>, <log_id {u64}>, <seq_num {u64}>, ...]}>\n]\n"})})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>a});var i=s(7294);const t={},o=i.createContext(t);function a(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);