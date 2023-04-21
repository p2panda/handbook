---
id: networking
title: Networking
---

import ImageFrame from '@site/src/components/ImageFrame';

## Introduction

- In p2panda "nodes" are the peers who participate actively on the network, storing and replicating data.
- In order to achieve this they need to be have certain capabilities, these are:
  - the ability to find the addresses of other peers on their network
  - the ability to establish channels of communication with a peer whose address they have
- Patterns needed for achieving these conditions can be described as _discovery_ and _connectivity_.
- This document outlines how p2panda implements the required functionality.

### `libp2p`

- `libp2p` is a collection of general purpose, modular, p2p networking protocols which we use to build our own stack on top of
- https://docs.libp2p.io/concepts/introduction/overview/
- `aquadoggo` uses [`rust-libp2p`](https://github.com/libp2p/rust-libp2p)

#### Primitives

- addressing / multiaddr : https://github.com/libp2p/specs/tree/master/addressing
- peer ids : https://github.com/libp2p/specs/blob/master/peer-ids/peer-ids.md

#### Node networking flow diagram

<ImageFrame
title="Flow diagram of networking logic on an aquadoggo by @glyph"
url={require('../assets/networking-flow-diagram.png')}
/>

## Scope of this document

- in this document we define the basic mechanisms for enabling peer discovery and connectivity over.
- we do not specify solutions for how peers manage and secure network membership, this can be facilitated by secret network keys and/or integration with existing secure, private networking solutions such as tor, i2p or wireguard.

## Transport Layer

- p2panda uses [QUIC](https://en.wikipedia.org/wiki/QUIC) as the transport for all application communication between peers.
- `libp2p` QUIC specification: https://github.com/libp2p/specs/tree/master/quic

## Discovery

- in a network where peers are dynamically joining, or their public addresses may be changing, some public infrastructure and discovery mechanism is required for peer bootstrapping and live discovery. Such a mechanism allows for a peer to discover the addresses of other peers via intermediary bootstrap nodes.
- any node can act as a bootstrap node once they have joined a network.

### mDNS

- peers existing on the same LAN can discover each other over mDNS and then initiate connections.
- `libp2p` mDNS discovery specification: https://github.com/libp2p/specs/blob/master/discovery/mdns.md

### Rendezvous server

- for peers who want to initiate discovery with remote peers, bootstrapping mechanisms are handled by a rendezvous servers.
- a rendezvous server handles registering new peers and making their addresses known to other peers the same network.
- `libp2p` rendezvous server specification: https://github.com/libp2p/specs/tree/master/rendezvous
- any peer on the network can act as a rendezvous peer.

#### Identify

- `libp2p` relies on the identify protocol to exchange basic information between network peers. This includes listening and external addresses, public keys and supported network protocols.
- The identify protocol provides a vital mechanism for a peer to learn it's external address before registering with a rendezvous server. Without this information, rendezvous registration will fail (another option is for the external address to be added manually in code).
- `libp2p` identify protocol specification: https://github.com/libp2p/specs/tree/master/identify

## Connectivity

- once peers have discovered each other, then they need to be able to establish a connection. As stated above, p2panda uses `QUIC` as the transport layer for all application data. However, peers often exhibit different networking capabilities depending on several factors:
  - do they have a static ip?
  - are they publicly accessible over the internet?
  - are they behind a public or private NAT?
- strategies for answering these questions dynamically and negotiating how a connection can be established are required.

### Direct connection

- the easiest situation is that one peer has a public ip address, in this case it can be dialed by the other peer on it's `multiaddr`.
- peers listen on their announced `multiaddr` for incoming connections.
- `libp2p` connection spec: https://github.com/libp2p/specs/tree/master/connections

### Relayed connection

- if a peer wishes to connect to a second peer that is not publicly addressable, a third peer with a public address can act as a relay for their messages.
- peers listen on their announced relay `multiaddr` for incoming relayed connections.
- `libp2p` relay spec: https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md

#### Autonat

- `autonat` is a `libp2p` protocol used to establish the status of a peer's NAT.
- any peer can respond to `autonat` protocol requests.
- the information retrieved here helps inform which connection strategies we should attempt.
- the autonat protocol is often used to determine whether a peer should support relayed connections via a relay server (based on NAT status).
- `libp2p` autonat specification: https://github.com/libp2p/specs/tree/master/autonat

#### Direct Connection Upgrade through Relay (DCUtR)

- where possible relayed traffic will be upgraded to a direct connection
- this involves a process of learning knowledge about the nature of the NAT a peer is hidden behind and then negotiating a hole-punching procedure which ultimately results in a direct connection being established.
- this is not always successful, but using `QUIC` which runs over UDP improves the chances of success.
- `libp2p` DCUtR specification: https://github.com/libp2p/specs/blob/master/relay/DCUtR.md

:::caution 

DCUtR over `QUIC` is not currently supported and DCUtR is not yet implemented in `aquadoggo`

:::
## `aquadoggo`

- `aquadoggo` is a p2panda node and where all the networking protocols are implemented.
- any aquadoggo peer can attempt to directly dial another peer by their `multiaddr` and hope to connect over a `QUIC` transport.
- in order to enable discovery and facilitate connectivity as a/for edge peers, any node on the network can serve the above protocols in "client" and/or "server" mode. In short, an aquadoggo node can function in the following modes:
  - rendezvous server
  - rendezvous client
  - relay server
  - relay client
- The network modes can also be combined. For example, a node may run as both a relay client and rendezvous client or both a relay server and rendezvous server.
