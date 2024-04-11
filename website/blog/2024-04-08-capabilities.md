---
title: Access control in a p2p world
authors: 
  name: Sam Andreae
---

_TLDR; capability based access control system designs for p2panda: [Read Design Document on GitHub](https://github.com/p2panda/access-control)_

## Introduction

Hello 👋 and welcome to the first p2panda research blog post! This is the start of a series of posts where we'll be publicly documenting our research process. We've always cared about making our system designs accessible and publishing tutorials and other learning resources. This is an effort to also make our research more transparent and hopefully useful to users and developers in the wider p2p ecosystem.

One of our primary tasks over the next months is to design and implement an access control system for p2panda. This is no simple matter in a leaderless peer-to-peer network. When using centralized services, we put our trust in a single provider, and delegate to them responsibility for storing data and authorizing access requests. This will likely involve agreeing user credentials (username, password etc.). By knowing these credentials it is assumed we have authority to access my data.

This model is not possible (or welcome!) in peer-to-peer systems. There is no central source of authority, so we need a way for peers to communicate authority boundaries themselves, in a way which allows all peers on the network to act as "authorizer" when handling access requests. There are many well researched approaches to designing access control systems in multi-actor systems, originating not only in network technologies, but also operating system design and asynchronous programming environments, which offer solutions to this very problem. Many of these incorporate patterns from Capability-based Security [wikipedia](https://en.wikipedia.org/wiki/Capability-based_security) systems. In the rest of this article we'll go a little deeper into what a system like this needs to look like for p2panda, look over a few systems we've spent time researching, and then share our current designs.

## Authoring and owning data

Peer-to-peer protocols such as p2panda use public-key cryptography and digital signatures to establish the identity of peers and the authenticity of messages replicated on a network. Any peer can verify that messages it receives were created by the claimed peer (public key), and that they have not been tampered with by any third parties. This technically allows peers to replicate messages freely to _anyone_, safe in the knowledge that the original author of the message can be verified and if tampering occurred it will be detected.

What if we don't want to share data with everyone though? Even if we know it won't be tampered with, we understandably want a stricter system where an author has control over where their data can travel, and how peers are allowed to interact with it. If we understand "authorship" as equal to "ownership" then we can say that only an owner has "read" and "write" authority over the data they created ("write" authority being relevant to long-lived mutable data). This actually now sounds a little like our centralized service described above, there is again a "single service" which controls your data, this time it's _you_ though. 

## Access token basics

If we all kept our data to ourselves, this wouldn't be very interesting though, in healthy collaborative peer-to-peer networks you want to share your data with peers you trust and let them share it further too. Token based capabilities offer us patterns for making this possible. Let's say that I've authored some blog posts which I want all my friends to be able to read, I can hand out unforgeable (signed) tokens to each of them, which states that they can "read" any posts I write. Equally, my friends can prove to _each other_ that they have been authorized (by me) to read the posts, and so can share posts between themselves when I'm not even there. In rather simplified terms, this is how token based capabilities work.

Don't take my word for it though, from [wikipedia](https://en.wikipedia.org/wiki/Capability-based_security):

> Capability-based security is a concept in the design of secure computing systems, one of the existing security models. A capability (known in some systems as a key) is a communicable, unforgeable token of authority. It refers to a value that references an object along with an associated set of access rights. A user program on a capability-based operating system must use a capability to access an object. Capability-based security refers to the principle of designing user programs such that they directly share capabilities with each other according to the principle of least privilege, and to the operating system infrastructure necessary to make such transactions efficient and secure. Capability-based security is to be contrasted with an approach that uses traditional UNIX permissions and Access Control Lists.

## What do we need?

We came to this research with a set of requirements for any capability system to be used with p2panda:

* Authors have fine-grained control over who can access and perform actions their data
* Tokens can be distributed freely but only used by the intended recipient
* Delay tolerant networks and offline-first operation supported
* Tokens can be delegated and revoked
* Role based access control patterns can be modelled
* Hierarchical and "flat" ownership of resources can be modelled

### Supported ownership models

A requirement of our system is that it allows developers to build apps which model both "flat" and hierarchical ownership structures with suitable access control boundaries. 

The below diagram sketches the access control boundaries for a festival and its schedule of events. The application data has a hierarchical ownership structure. There is an admin group which owns the festival and collection of events, organisers are delegated `collection/add` authority so they can add events to the collection, they own any events they create. Visitors are given `document/read` authority for the festival info and all its events.

```
owner=admins────────────────────────┐
visitor:read                        │
│                                   │
│          FESTIVAL INFO            │
│                                   │
│    owner=admins──────────────┐    │
│    organiser:add             │    │
│    │                         │    │
│    │         EVENTS          │    │
│    │                         │    │
│    │   owner=organiser───┐   │    │
│    │   │                 │   │    │
│    │   │      EVENT      │   │    │
│    │   │                 │   │    │
│    │   └─────────────────┘   │    │
│    │                         │    │
│    │   owner=organiser───┐   │    │
│    │   │                 │   │    │
│    │   │      EVENT      │   │    │
│    │   │                 │   │    │
│    │   └─────────────────┘   │    │
│    │                         │    │
│    │   owner=organiser───┐   │    │
│    │   │                 │   │    │
│    │   │      EVENT      │   │    │
│    │   │                 │   │    │
│    │   └─────────────────┘   │    │
│    │                         │    │
│    │                         │    │
│    └─────────────────────────┘    │
│                                   │
└───────────────────────────────────┘
```

In the following diagram we can see how non-hierarchical ownership can be modelled with a photo sharing app. The app displays to the user a collection of photos, this isn't an "owned" collection as no peer has overall authority over it, each user will have their own photo collection. All they need is "read" authority for any published photos.

```
owner=anna─────────┐   owner=billie───────┐
me:read            │   me:read            │
│                  │   │                  │
│      PHOTO       │   │      PHOTO       │
│                  │   │                  │
│                  │   │                  │
└──────────────────┘   └──────────────────┘

owner=claire───────┐   owner=diana────────┐
me:read            │   me:read            │
│                  │   │                  │
│      PHOTO       │   │      PHOTO       │
│                  │   │                  │
│                  │   │                  │
└──────────────────┘   └──────────────────┘
```

## Research

I've spent a substantial amount of time researching capability systems over the last months, and I still feel like I've only scratched the surface. Here is a selection of projects I've looked into, chosen for their differing approaches and relation to our design goals.

### CapTP / OCapN (Agoric, Spritely, Cap'N'Proto)

CapTP (Capability Transport Protocol) is an object-capability protocol which allows "distributed object programming over mutually suspicious networks". Its origin is in the E programming language which is described as "an object-capability programming language and platform for writing distributed, secure, and robust software". Sounds good to me so far :smile: ! There are various implementations out there, notably in Spritely, Agoric and Cap'N'Proto. There's also a (pre-)standardization effort underway for OCapN (Object Capability Network) network suite which incorporates CapTP. 

Despite the system properties feeling intuitively familiar, penetrating the details of the protocol design was actually a challenge. The reasons for this were firstly that important resources are spread across many projects (from the 90s to current day) so it took quite some searching to feel like I was getting a full picture, and secondly many of the implementations are in languages that I'm not familiar with, so reading through codebases took some extra mental overhead. No fault to be placed anywhere for these factors (decentralization, yay!!), but it was my experience as a new-comer to the ecosystem. Once I got through that though, the very active ecosystems and resources around these projects provided excellent insight into common approaches to capability systems. Certainly looking into the patterns explored by these projects is a great way to understand where the theories around object-capability models originate and how they're being implemented today. There's a radical spirit and ambition around much of the work in this particular capability corner which is especially inspiring. 

In terms of the features we require, it seems that the CapTP model is aimed at environments where the protocol can run over live connections between peers. Typically a capability will last for the lifetime of a connection, but no longer. I know there are features of the protocol which can be used to extend this lifetime, something which would be needed for our use, but this is at least the starting assumption I believe.  

#### Links

* [Spritely Institute](https://spritely.institute/)
* [Impressively commented Cap'N'Proto RPC document](https://github.com/capnproto/capnproto/blob/v2/c%2B%2B/src/capnp/rpc.capnp) (best resource for CapTP overview)
* [E programming language](http://wiki.erights.org/wiki/Main_Page)
* [OCapN standardization effort](https://ocapn.org/)

### UCAN

UCAN (User Controlled Authorization Networks) is described as: "an extension of the popular JSON Web Token format specifically designed to enable ways of authorizing offline-first apps and distributed systems". Again, we're on the right track! Here research was quite straightforward, the design and core data types can be grasped by looking at their website landing page :pray:. Their token based approach felt fairly intuitive to pick-up, although not being super familiar with DIDs held me back a little. Their use of JWTs seems to be an explicit attempt to aid in adoption as it's a familiar format for web devs already. There's an active community around the specifications and implementations, with libraries available in Rust and TypeScript.

It's impressive (and I'm grateful for) how simple and intuitive UCANs are in their design, and the specification is excellent (bonus material if you reach the end of the spec is a useful roll-call of capability systems [movers and shakers](https://github.com/ucan-wg/spec?tab=readme-ov-file#10-related-work-and-prior-art)). Of particular interest to us is their first-class support for offline-first applications and delay tolerant networking.

#### Links

* [UCAN homepage](https://ucan.xyz/)
* [UCAN specification](https://github.com/ucan-wg/spec?tab=readme-ov-file)
* [UCAN working group](https://github.com/ucan-wg)
* [Rust](https://github.com/ucan-wg/rs-ucan) & [TypeScript](https://github.com/ucan-wg/ts-ucan) implementations

### Biscuit

> Biscuit is a bearer token that supports offline attenuation, can be verified by any system that knows the root public key, and provides a flexible authorization language based on logic programming. It is serialized as Protocol Buffers, and designed to be small enough for storage in HTTP cookies.

I've included Biscuit in particular for its interesting use of a Datalog based logic language for writing authorization policies. This really jumped out as a powerful and incredibly versatile approach to defining the rules which restrict the authority of a capability.

In terms of features we need though, biscuit tokens cannot be distributed freely, rather the holder of a token gains authority to use it.

#### Links

* [Homepage](https://github.com/biscuit-auth/biscuit/blob/main/SPECIFICATIONS.md)
* [Documentation](https://doc.biscuitsec.org/getting-started)

## Our approach

Our early designs shared many common ideas and provided almost the same features as UCAN tokens. After speaking with some community members it seems there are exciting developments on the next iteration of the specification which take inspiration from some of the descriptive policy features of biscuit as well as other changes which fit our system well. We've therefore based our designs on the (new) UCAN specification where possible. It made sense that we continue to rely on our existing internal data types for identity, signing, resource addressing and encoding formats though, making p2panda tokens not interoperable with existing UCAN implementations. 

Our designs are published in this git repository: https://github.com/p2panda/access-control

After some final rounds of feedback we'll be starting on the Rust implementation.

## Thanks

This research wouldn't have been possible without the support we received from the [NLNet](https://nlnet.nl/) foundation! Also many thanks to our friends at [SSB](https://www.scuttlebutt.nz/), [Willow](https://willowprotocol.org/), [Digital Democracy](https://www.digital-democracy.org/) and [Cable](https://github.com/cabal-club/cable) for their conversations, feedback and general sharing of excellent related work along the way.

Thanks for reading, see you next time!
