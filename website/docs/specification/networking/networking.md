---
id: networking
title: Networking
---

import ImageFrame from '@site/src/components/ImageFrame';

## Introduction

- In `p2panda` "nodes" are the peers who participate actively on the network, storing and replicating data.
- In order to achieve this certain networking guarantees need to be met:
  - peers must know or be able to discover the addresses of other peers on their network
  - peers must be able to establish channels of communication with other peers at these known addresses
- Patterns needed for achieving these conditions can be described as _discovery_ and
  _connectivity_.

:::info 

The terms "peer" and "node" are used quite interchangeably in this document! On a p2panda network, in
many cases a node will only be used by one peer, so it's fair to conflate the two. It's not
always true though, as nodes also support being shared by many peers. When talking about
networking it's not necessary to make this distinction though.

:::

### `aquadoggo`

- `aquadoggo` is the reference `p2panda` node implementation.
- It makes use of [`rust-libp2p`](https://github.com/libp2p/rust-libp2p) for it's networking layer.

### `libp2p`

- `libp2p` is a collection of general purpose, modular, p2p networking protocols which we use to build our own stack on top of
- https://docs.libp2p.io/concepts/introduction/overview/

#### Primitives

- addressing / multiaddr : https://github.com/libp2p/specs/tree/master/addressing
- peer ids : https://github.com/libp2p/specs/blob/master/peer-ids/peer-ids.md

#### Node networking flow diagram

<ImageFrame
title="Flow diagram of networking logic on an aquadoggo by @glyph"
url={require('../assets/networking-flow-diagram.png')}
/>

## Scope of this document

- In this document we define the protocols used in `aquadoggo` which allow the node to discover
  and connect to other peers.
- We don't specify yet how to restrict membership to the network or enforce any capability models.

## Transport Layer

- `aquadoggo` uses [QUIC](https://en.wikipedia.org/wiki/QUIC) as the transport for communication between peers.
- `libp2p` QUIC specification: https://github.com/libp2p/specs/tree/master/quic

## Discovery

- In the case where a peers address is static then it can be added to the node via configuration
  options.
- For peers on the same local network, then discovery can be achieved using mDNS.
- When peers are not on the same local network but are still dynamically joining the network and
  may not have static addresses, some public bootstrapping infrastructure and discovery mechanism
  is required. In `libp2p` these nodes are called "Rendezvous Servers".

### mDNS

- Peers existing on the same LAN can discover each other over mDNS and then initiate connections.
- `libp2p` mDNS discovery specification: https://github.com/libp2p/specs/blob/master/discovery/mdns.md

### Rendezvous Server

- For peers who want to initiate discovery with remote peers, bootstrapping mechanisms are handled by a rendezvous servers.
- A rendezvous server handles registering new peers and making their addresses known to other
  peers on the same network.
- `libp2p` rendezvous server specification: https://github.com/libp2p/specs/tree/master/rendezvous
- Any peer on the network can act as a rendezvous peer.

#### Identify

- `libp2p` relies on the identify protocol to exchange basic information between network peers. This includes listening and external addresses, public keys and supported network protocols.
- The identify protocol provides a vital mechanism for a peer to learn it's external address before registering with a rendezvous server. Without this information, rendezvous registration will fail (another option is for the external address to be added manually in code).
- `libp2p` identify protocol specification: https://github.com/libp2p/specs/tree/master/identify

## Connectivity

- Once peers have discovered each other, then they need to be able to establish a connection. As stated above, `aquadoggo` uses `QUIC` as the transport layer for all application data. However, peers often exhibit different networking capabilities depending on several factors:
  - do they have a static ip?
  - are they publicly accessible over the internet?
  - are they behind a public or private NAT?
- Strategies for answering these questions dynamically and negotiating how a connection can be established are required.

### Direct connection

- The easiest situation is that one peer has a public ip address, in this case it can be dialed by the other peer on it's `multiaddr`.
- Peers listen on their announced `multiaddr` for incoming connections.
- `libp2p` connection spec: https://github.com/libp2p/specs/tree/master/connections

### Relayed connection

- If a peer wishes to connect to a second peer that is not publicly addressable, a third peer with a public address can act as a relay for their messages.
- Peers listen on their announced relay `multiaddr` for incoming relayed connections.
- `libp2p` relay spec: https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md

#### Autonat

- `autonat` is a `libp2p` protocol used to establish the status of a peer's NAT.
- Any peer can respond to `autonat` protocol requests.
- The information retrieved here helps inform which connection strategies we should attempt.
- The autonat protocol is often used to determine whether a peer should support relayed connections via a relay server (based on NAT status).
- `libp2p` autonat specification: https://github.com/libp2p/specs/tree/master/autonat

#### Direct Connection Upgrade through Relay (DCUtR)

- Where possible relayed traffic will be upgraded to a direct connection
- This involves a process of learning knowledge about the nature of the NAT a peer is hidden behind and then negotiating a hole-punching procedure which ultimately results in a direct connection being established.
- This is not always successful, but using `QUIC` which runs over UDP improves the chances of success.
- `libp2p` DCUtR specification: https://github.com/libp2p/specs/blob/master/relay/DCUtR.md

:::caution 

DCUtR over `QUIC` is not currently supported and DCUtR is not yet implemented in `aquadoggo`

:::

## `aquadoggo` networking modes

- In order to enable discovery and facilitate connectivity as a/for edge peers, any node on the network can serve the above protocols in "client" and/or "server" mode. In short, an aquadoggo node can function in the following modes:
  - rendezvous server
  - rendezvous client
  - relay server
  - relay client
- The network modes can also be combined. For example, a node may run as both a relay client and rendezvous client or both a relay server and rendezvous server.
