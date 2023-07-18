---
id: networking
title: Networking
---

import ImageFrame from '@site/src/components/ImageFrame';

## Introduction

p2panda doesn't have a strict specification around it's networking layer. We
want p2panda to be used in all sorts of contexts, let it be Low-Energy
Bluetooth, LoRa, Tor, Mesh Networks, internet or anything else.

## Terminology

- In p2panda _nodes_ participate actively in the network, storing and replicating
  data with each other.
- In order to achieve this, certain networking guarantees need to be met:
  - Nodes must know or be able to discover the addresses of other nodes on
    their network
  - Nodes must be able to establish (uni- or bi-directional) channels of
    communication with other nodes at these known addresses
- Patterns needed for achieving these conditions can be described as
  _discovery_ and _connectivity_.

:::info

While the current [replication protocol] assumes a bi-directional communication
channel it would be theoretically possible to build p2panda on top of a
broadcast-only networking topology (for example on top of LoRa or other radio
protocols). The append-only nature of the underlying p2panda data type make
this a good fit.

:::

## Strategies

Rather than giving strict requirements we are listing currently known,
implemented and recommended strategies for different networks to achieve
connectivity and discovery of nodes.

Developers can see these recommendations as starting points for their own
approaches, experiment with their own or fork and build on top of them.

### Internet layer with libp2p

To achieve discovery and connectivity on top of the internet layer in the
internet protocol suite we've successfully implemented a stack based on top of
the [libp2p] protocol using [QUIC] with TLS encryption as the underlying
transport layer.

libp2p is a collection of general purpose, modular, p2p networking protocols.
It solves discovery of nodes in local networks (via mDNS) and the internet (via
Rendezvous nodes) and establishes connectivity between them, even when they are
behind firewalls or NATs (via UDP holepunching and / or Relay nodes).

This strategy is currently implemented in our [`aquadoggo`] reference
implementation.

#### Core Abstractions

libp2p comes with its own set of core abstractions and data types which are
used throughout the system. While p2panda does _not_ make use of them in its
own core specification, they are part of this strategy.

- [Addressing](https://github.com/libp2p/specs/blob/master/addressing/README.md)
  - Working with addresses in libp2p.
- [Connections and
  Upgrading](https://github.com/libp2p/specs/blob/master/connections/README.md)
  - Establishing secure, multiplexed connections between nodes, possibly over
  insecure, single stream transports.
- [Peer Ids and
  Keys](https://github.com/libp2p/specs/blob/master/peer-ids/peer-ids.md) -
  Public key types & encodings, peer id calculation, and message signing
  semantics

#### Diagram

<ImageFrame
title="Flow diagram of aquadoggo networking strategy by @glyph"
url={require('../assets/networking-flow-diagram.png')}
/>

#### Transport Layer

- `aquadoggo` uses [QUIC](https://en.wikipedia.org/wiki/QUIC) as the transport
  layer for communication between nodes
- `libp2p` QUIC specification: https://github.com/libp2p/specs/tree/master/quic

#### Discovery

- Addresses can be added manually if they're known and static
- On the same local network, discovery is achieved via mDNS
- Otherwise we're utilising _Rendezvous Nodes_ to allow discovery over the
  internet for nodes with dynamic addresses

##### mDNS

- Nodes existing on the same LAN can discover each other over mDNS and then
  initiate connections
- `libp2p` mDNS discovery specification:
  https://github.com/libp2p/specs/blob/master/discovery/mdns.md

##### Rendezvous Nodes

- A rendezvous server handles registering new nodes and making their addresses
  known to other nodes on the same network
- `libp2p` rendezvous server specification:
  https://github.com/libp2p/specs/tree/master/rendezvous
- Any node on the network can act as a rendezvous node

#### Identity

- `libp2p` relies on the identify protocol to exchange basic information
  between nodes. This includes identification of external addresses, exhange of
  unique identifiers and supported network protocols
- The identify protocol provides a vital mechanism for a node to learn it's
  external address before registering with a rendezvous server. Without this
  information, rendezvous registration will fail
- p2panda does not have a strong recommendation around node identities. The
  identity is derived from the key pair and hashed to not leak the original
  public key. It is possible to generate the key pair newly on each start of a
  node
- `libp2p` identify protocol specification:
  https://github.com/libp2p/specs/tree/master/identify

#### Connectivity

- Once nodes have discovered each other, then they need to be able to establish
  a connection. As stated above, `aquadoggo` uses QUIC as the transport layer
  for all application data. However, nodes often exhibit different networking
  capabilities depending on several factors:
  - Do they have a static ip?
  - Are they publicly accessible over the internet?
  - Are they behind a public or private NAT or firewall?
- Strategies for answering these questions dynamically and negotiating how a
  connection can be established are required

##### Direct connection

- The easiest situation is that one node has a public IP address, in this case
  it can be dialed by the other node on it's libp2p multiaddress
- Nodes listen on their announced multiaddresses for incoming connections
- `libp2p` connection specification: https://github.com/libp2p/specs/tree/master/connections

##### Relayed connection

- If a node wishes to connect to a second node that is not publicly
  addressable, a third node with a public address can act as a relay for their
  messages
- Nodes listen on their announced relay multiaddress for incoming, relayed
  connections
- `libp2p` relay specification: https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md

##### Direct Connection Upgrade through Relay (DCUtR)

- Where possible, relayed traffic will be upgraded to a direct connection
- This involves a process of gathering knowledge about the nature of the NAT a
  node is hidden behind and then negotiating a hole-punching procedure which
  ultimately results in a direct connection being established
- This is not always successful, using QUIC improves the chances of success
- `libp2p` DCUtR specification: https://github.com/libp2p/specs/blob/master/relay/DCUtR.md

#### `aquadoggo` networking modes

- In order to enable discovery and facilitate connectivity as a/for edge nodes,
  any node on the network can serve the above protocols in "client" and/or
  "server" mode. In short, an aquadoggo node can function in the following
  modes:
  - Rendezvous server
  - Rendezvous client
  - Relay server
  - Relay client
- The network modes can also be combined. For example, a node may run as both a
  relay client and rendezvous client or both a relay server and rendezvous
  server.

#### Security and privacy

- These strategies allow very flexible discovery and connectivity building
  blocks which vary drastically in terms of privacy and security. While
  `aquadoggo` by default opts into the most secure setting, depending on the
  security and privacy requirements of an application different measures should
  be taken into account
- Utilising Rendezvous and Relay nodes might leak IP addresses on the internet,
  potentially with untrusted and unknown nodes. It is recommended to keep a
  table of known IP addresses instead and only connect to them. If this is not
  an option, it is recommended to run p2panda over an anonymization layer like
  Tor. If Tor is not an option it is possible to only create data in a
  federated setting where a trusted node is statically hosted and used by
  multiple clients. This node will _not_ forward IP addresses from clients
- Nodes can connect to each other as soon as they are discovered and speak the
  same protocol. In case it is required to isolate your network from other
  "valid" nodes but still keeping dynamic discovery intact, a form of protected
  overlay network is recommended. This can be achieved with making use of VPNs
  or adding authentication to centralised and known rendezvous points. "Network
  keys" and such are currently not supported by libp2p / QUIC and also not
  recommended (redundant and expensive double encryption of transported data)

### Tor Strategy

An integration of onion services in `aquadoggo` is pending as soon as the Rust
port `arti` is ready. For now it can still be achieved with wrapping the node
around an external onion service layer.

[QUIC]: https://en.wikipedia.org/wiki/QUIC
[`aquadoggo`]: https://github.com/p2panda/aquadoggo/
[libp2p]: https://libp2p.io
[replication protocol]: /specification/replication
