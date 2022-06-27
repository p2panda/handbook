---
id: replication
---

# Replication

:::info not implemented
Replication is in specification phase and has not been implemented yet.
:::

- Replication is the process by which nodes exchange data
    - p2panda uses _gossip replication_: nodes autonomously share data with each other without central coordination
    - this makes p2panda an _eventually consistent_ database
- Nodes may not be interested in all available data and can choose to receive only some data

## Transport protocol

- p2panda replication protocol is based on the GraphQL query language
  - this allows developers to easily build their p2panda replication implementations in any programming language
  - this allows "leecher" node implementations in the browser which collect and persist entries but do not communicate and replicate further with other nodes

### GraphQL over HTTP

- the GraphQL queries can be made via HTTP against `<host>:2020/graphql`

### GraphQL over qp2p

- nodes can offer a [qp2p][qp2p] endpoint on port `2022` for replication via the qp2p (QUIC, TLS 1.3) protocol
- qp2p is a p2p messaging protocol sending discrete GraphQL queries over QUIC streams, it ..
  - has build-in support for the Internet Gateway Device Protocol (IGD) for automatic port forwarding for peers behind NAT-enabled routers
  - is based on the QUIC streaming protocol supporting both unidirectional and bidirectional streams
  - has a fault-tolerancy mechanism
  - makes use of connection pooling, for reusing already opened connections

### Encryption

- data over qp2p and regular HTTP transport connection is secured via TLS 1.3
- TLS certificates are self-signed certificates by default
  - this allows transport encryption without a centralised certificate authority (CA)
  - this doesn't give authentication but since p2panda data is already authenticated this doesn't need to be reflected on this level
  - optionally a p2panda node can be moved behind a reverse-proxy providing its own certificates

## Replication protocol

- the replication protocol defines the process of exchanging entries and p2panda operations on top of the GraphQL Node API

### Basic Replication

- retreives new entries from another node
- more sophisticated replication protocols can be built on top
  - the "basic replication" protocol serves as a base

**Process**

1. 

### Schema Replication

- retreives new entries from another node holding operations of a certain schema

**Process**

[qp2p]: https://github.com/maidsafe/qp2p
