"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[1477],{10:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"/2024/04/08/capabilities","metadata":{"permalink":"/blog/2024/04/08/capabilities","source":"@site/blog/2024-04-08-capabilities.md","title":"Capabilities in a p2p world","description":"TLDR; capability based access control system designs for p2panda//github.com/p2panda/capabilities/blob/main/DESIGN.md","date":"2024-04-08T00:00:00.000Z","formattedDate":"April 8, 2024","tags":[],"hasTruncateMarker":false,"authors":[],"frontMatter":{"title":"Capabilities in a p2p world"},"unlisted":false,"nextItem":{"title":"Plans 2024","permalink":"/blog/2024/01/17/roadmap-24"}},"content":"_TLDR; capability based access control system designs for p2panda: https://github.com/p2panda/capabilities/blob/main/DESIGN.md_\\n\\n## Introduction\\n\\nHello \ud83d\udc4b and welcome to the first p2panda research blog post! This is the start of series of posts where we\'ll be publicly documenting our research process. We\'ve always cared about making our system designs accessible and publishing tutorials and other learning resources. This is an effort to also make our research more transparent and hopefully useful to users and developers in the wider p2p ecosystem.\\n\\nOne of our primary tasks over the next months is to design and implement an access control system for p2panda. This is no simple matter in a leaderless peer-to-peer network. When using centralized services, we put our trust in a single provider, and delegate to them responsibility for storing data and authorizing access requests. This will likely involve agreeing user credentials (username, password etc..). By knowing these credentials it is assumed we have authority to access to my data.\\n\\nThis model is not possible (or welcome!) in peer-to-peer systems. There is no central source of authority, so we need a way for peers to communicate authority boundaries themselves, in a away which allows all peers on the network to act as \\"authorizer\\" when handling access requests. There are many well researched approaches to designing access control systems in multi-actor systems, originating not only in network technologies, but also operating system design and asynchronous programming environments, which offer solutions to this very problem. Many of these incorporate patterns from Capability-based Security [wikipedia](https://en.wikipedia.org/wiki/Capability-based_security) systems. In the rest of this article we\'ll go a little deeper into what a system like this needs to look like for p2panda, look over a few systems we\'ve spent time researching, and then share our current designs. \\n\\n## Ownership in a peer-to-peer world\\n\\nPeer-to-peer protocols such as p2panda use public-key cryptography and digital signatures to establish the identity of peers and the authenticity of messages replicated on a network. Any peer can verify that messages it receives were created by the claimed peer (public key), and that they have not been tampered with by any third parties. This technically allows peers to replicate messages freely to _anyone_, safe in the knowledge that the original author of the message can be verified and if tampering occurred it will be detected.\\n\\nWhat if we don\'t want to share data with everyone though? Even if we know it won\'t be tampered with, we understandably want a stricter system where an author has control over where their data can travel, and how peers are allowed to interact with it. If we understand \\"authorship\\" as equal to \\"ownership\\" then we can say that only an owner has \\"read\\" and \\"write\\" authority over the data they created (\\"write\\" authority being relevant to long-lived mutable data). This actually now sounds a little like our centralized service described above, there is again a \\"single service\\" which controls your data, this time it\'s _you_ though. \\n\\n## Access token basics\\n\\nIf we all kept our data to ourselves, this wouldn\'t be very interesting though, in healthy collaborative peer-to-peer networks you want to share your data with peers you trust and let them share it further too. Token based capabilities offer us patterns for making this possible. Let\'s say that I\'ve authored some blog posts which I want all my friends to be able to read, I can hand out unforgeable (signed) tokens to each of them, which states that they can \\"read\\" any posts I write. Equally, my friends can prove to _each other_ that they have been authorized (by me) to read the posts, and so can share posts between themselves when I\'m not even there. In rather simplified terms, this is how token based capabilities work.\\n\\nDon\'t take my word for it though, from [wikipedia](https://en.wikipedia.org/wiki/Capability-based_security):\\n\\n> Capability-based security is a concept in the design of secure computing systems, one of the existing security models. A capability (known in some systems as a key) is a communicable, unforgeable token of authority. It refers to a value that references an object along with an associated set of access rights. A user program on a capability-based operating system must use a capability to access an object. Capability-based security refers to the principle of designing user programs such that they directly share capabilities with each other according to the principle of least privilege, and to the operating system infrastructure necessary to make such transactions efficient and secure. Capability-based security is to be contrasted with an approach that uses traditional UNIX permissions and Access Control Lists.\\n\\n## What do we need?\\n\\nWe came to this research with a set of requirements for any capability system to be used with p2panda:\\n\\n* authors have fine-grained control over who can access and perform actions their data\\n* tokens can be distributed freely but only used by the intended recipient\\n* delay tolerant networks and offline-first operation supported\\n* tokens can be delegated and revoked\\n* role based access control patterns can be modeled\\n* hierarchical and \\"flat\\" ownership of resources can be modeled\\n\\n### Supported ownership models\\n\\nA requirement of our system is that it allows developers to build apps which model both \\"flat\\" and hierarchical ownership structures with suitable access control boundaries. \\n\\nThe below diagram sketches the access control boundaries for a festival and it\'s schedule of events. The application data has hierarchical ownership structure. There is an admin group which owns the festival and collection of events, organisers are delegated `collection/add` authority so they can add events to the collection, they own any events they create. Visitors are given `document/read` authority for the festival info and all it\'s events.\\n\\n![](https://laub.liebechaos.org/uploads/6b5055c1-70bd-4446-808b-fff3caaaa9af.png)\\n\\nIn the following diagram we can see how non-hierarchical ownership can be modeled with a photo sharing app. The app displays to the user a collection of photos, this isn\'t an \\"owned\\" collection as no peer has overall authority over it, each user will have their own photo collection. All they need is read authority for any published photos.\\n\\n![](https://laub.liebechaos.org/uploads/3c5801fc-308e-43d1-8ca7-f229f9118a2e.png)\\n\\n\\n## The research\\n\\nI\'ve spent a substantial amount of time researching capability systems over the last months, and I still feel like I\'ve only scratched the surface. Here is a selection of projects I\'ve looked into, chosen for their differing approaches and relation to our design goals.\\n\\n### CapTP / OCapN (Agoric, Spritely, Cap\'N\'Proto)\\n\\nCapTP (Capability Transport Protocol) is an object-capability protocol which allows \\"distributed object programming over mutually suspicious networks\\". It\'s  origin is in the E programming language which is described as \\"an object-capability programming language and platform for writing distributed, secure, and robust software\\". Sounds good to me so far :smile: ! There are various implementations out there, notably in Spritely, Agoric and Cap\'N\'Proto. There\'s also a (pre-)standardization effort underway for OCapN (Object Capability Network) network suite which incorporates CapTP. \\n\\nDespite the system properties feeling intuitively familiar, penetrating the details of the protocol design was actually a challenge. The reasons for this were firstly that important resources are spread across many projects (from the 90s to current day) so it took quite some searching to feel like I was getting a full picture, and secondly many of the implementations are in languages that I\'m not familiar with, so reading through codebases took some extra mental overhead. No fault to be placed anywhere for these factors (decentralization, yay!!), but it was my experience as a new-comer to the ecosystem. Once I got through that though, the very active ecosystems and resources around these projects provided excellent insight into common approaches to capability systems. Certainly looking into the patterns explored by these projects is a great way to understand where the theories around object-capability models originate and how they\'re being implemented today. There\'s a radical spirit and and ambition around much of the work in this particular capability corner which is especially inspiring. \\n\\nIn terms of the features we require, it seems that the CapTP model is aimed at environments where the protocol can run over live connections between peers. Typically a capability will last for the lifetime of a connection, but no longer. I know there are features of the protocol which can be used to extend this lifetime, something which would be needed for our use, but this is at least the starting assumption I believe.  \\n\\n#### Links\\n* [spritely institute](https://spritely.institute/)\\n* [impressively commented Cap\'N\'Proto RPC document](https://github.com/capnproto/capnproto/blob/v2/c%2B%2B/src/capnp/rpc.capnp) (best resource for CapTP overview)\\n* [E programming language](http://wiki.erights.org/wiki/Main_Page)\\n* [OCapN standardization effort](https://ocapn.org/)\\n\\n### UCAN\\n\\nUCAN (User Controlled Authorization Networks) is described as: \\"an extension of the popular JSON Web Token format specifically designed to enable ways of authorizing offline-first apps and distributed systems\\". Again, we\'re on the right track! Here research was quite straightforward, the design and core data types can be grasped by looking at their website landing page :pray:. Their token based approach felt fairly intuitive to pick-up, although not being super familiar with DIDs held me back a little. Their use of JWTs seems to be an explicit attempt to aid in adoption as it\'s a familiar format for web devs already. There\'s an active community around the specifications and implementations, with libraries available in Rust and TypeScript.\\n\\nIt\'s impressive (and I\'m grateful for) how simple and intuitive UCANs are in their design, and the specification is excellent (bonus material if you reach the end of the spec is a useful roll-call of capability systems [movers and shakers](https://github.com/ucan-wg/spec?tab=readme-ov-file#10-related-work-and-prior-art)). Of particular interest to us is their first-class support for offline-first applications and delay tolerant networking.\\n\\n#### Links\\n\\n* [UCAN homepage](https://ucan.xyz/)\\n* [UCAN specification](https://github.com/ucan-wg/spec?tab=readme-ov-file)\\n* [UCAN working group](https://github.com/ucan-wg)\\n* [Rust](https://github.com/ucan-wg/rs-ucan) & [TypeScript](https://github.com/ucan-wg/ts-ucan) implementations\\n\\n### Biscuit\\n\\n> Biscuit is a bearer token that supports offline attenuation, can be verified by any system that knows the root public key, and provides a flexible authorization language based on logic programming. It is serialized as Protocol Buffers, and designed to be small enough for storage in HTTP cookies.\\n\\nI\'ve included Biscuit in particular for it\'s interesting use of a Datalog based logic language for writing authorization policies. This really jumped out as powerful and incredibly versatile approach to defining the rules which restrict the authority of a capability.\\n\\nIn terms of features we need though, biscuit tokens cannot be distributed freely, rather the holder of a token gains authority to use it.\\n\\n#### Links\\n\\n* [homepage](https://github.com/biscuit-auth/biscuit/blob/main/SPECIFICATIONS.md)\\n* [docs](https://doc.biscuitsec.org/getting-started)\\n\\n## Our approach\\n\\nOur early designs shared many common ideas and provided almost the same features as UCAN tokens. After speaking with some community members it seems there are exciting developments on the next iteration of the specification which take inspiration from some of the descriptive policy features of biscuit as well as other changes which fit our system well. We\'ve therefore based our designs on the (new) UCAN specification where possible. It made sense that we continue to rely on our existing internal data types for identity, signing, resource addressing and encoding formats though, making p2panda tokens not inter-operable with existing UCAN implementations. \\n\\nOur designs are published in this git repository: https://github.com/p2panda/capabilities/blob/main/DESIGN.md\\n\\nAfter some final rounds of feedback we\'ll be starting on the Rust implementation.\\n\\n## Thanks\\n\\nThis research wouldn\'t have been possible without the support we received from the [NLNet](https://nlnet.nl/) foundation! Also many thanks to our friends at [SSB](https://www.scuttlebutt.nz/), [Willow](https://willowprotocol.org/), [Digital Democracy](https://www.digital-democracy.org/) and [Cable](https://github.com/cabal-club/cable) for their conversations, feedback and general sharing of excellent related work along the way.\\n\\nThanks for reading, see you next time!"},{"id":"/2024/01/17/roadmap-24","metadata":{"permalink":"/blog/2024/01/17/roadmap-24","source":"@site/blog/2024-01-17-roadmap-24.md","title":"Plans 2024","description":"p2panda received another round of funding from NLNet as part of the NGI Zero initiative for 2024.","date":"2024-01-17T00:00:00.000Z","formattedDate":"January 17, 2024","tags":[],"hasTruncateMarker":true,"authors":[],"frontMatter":{"title":"Plans 2024"},"unlisted":false,"prevItem":{"title":"Capabilities in a p2p world","permalink":"/blog/2024/04/08/capabilities"},"nextItem":{"title":"aquadoggo 0.7.0","permalink":"/blog/2023/11/17/aquadoggo"}},"content":"p2panda received another round of funding from NLNet as part of the NGI Zero initiative for 2024.\\n\\nWith this grant we want to share our plans for the upcoming months.\\n\\n\x3c!-- truncate --\x3e\\n\\n## namakemono\\n\\n## Capabilties\\n\\n## Decentralised MLS (dMLS)\\n\\n## GNOME Berlin\\n\\n## Meli Bees App"},{"id":"/2023/11/17/aquadoggo","metadata":{"permalink":"/blog/2023/11/17/aquadoggo","source":"@site/blog/2023-11-17-aquadoggo.md","title":"aquadoggo 0.7.0","description":"We just released aquadoggo v0.7.0 which has been a solid year in the making. It has the longest changelog ever.","date":"2023-11-17T00:00:00.000Z","formattedDate":"November 17, 2023","tags":[],"hasTruncateMarker":true,"authors":[],"frontMatter":{"title":"aquadoggo 0.7.0"},"unlisted":false,"prevItem":{"title":"Plans 2024","permalink":"/blog/2024/01/17/roadmap-24"}},"content":"We just released aquadoggo `v0.7.0` which has been a solid year in the making. It has the longest changelog ever.\\n\\n\x3c!-- truncate --\x3e\\n\\naquadoggo is a full p2p node implementation based on p2panda. It is a intended as a tool for making the design and build of local-first, collaborative p2p applications as simple as possible, and hopefully even a little fun!\\n\\nHere are some highlights:\\n\\n* Discovery of other nodes in local network and internet\\n* Peer-to-peer connections via UDP holepunching or via relays\\n* Replication of data efficiently with other nodes\\n* Filtered, sorted and paginated data queries via GraphQL\\n* Powerful configuration API for all sorts of needs\\n* Upload blobs and get them via HTTP\\n\\nWe took the opportunity to give the README some much deserved love:\\n\\nhttps://github.com/p2panda/aquadoggo\\n\\n.. and added pre-compiled binaries!"}]}')}}]);