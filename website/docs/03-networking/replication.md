---
id: replication
---

# Replication

- replication is the process by which nodes exchange entries and operations to eventually converge all to the same state
    - nodes autonomously share data with each other without central coordination
    - this makes p2panda an _eventually consistent_ database
- Nodes may not be interested in all available data and can choose to receive only some data

## Node API

- GraphQL queries allowing other nodes ask about the bamboo logs, entries and payloads they know about. these methods are enough to build a replication protocol on top.

```graphql
"""
get an entry by its hash
"""
entryByHash(hash: EntryHash!): SingleEntryAndPayload

"""
get any entries that are newer than the provided sequence_number for a given
author and log_id
"""
getEntriesNewerThanSeq(
  """
  id of the log
  """
  logId: LogId!

  """
  author of the log
  """
  author: Author!

  """
  latest known sequence number. we want the entries which are newer than this.
  """
  seqNum: SeqNum!

  """
  max number of items to be returned per page
  """
  first: Int

  """
  cursor identifier for pagination
  """
  after: String
): EntryAndPayloadConnection!

"""
get a single entry by its log_id, sequence_number and author
"""
entryByLogIdAndSequence(
  """
  id of the log
  """
  logId: LogId!

  """
  author of the log
  """
  author: Author!

  """
  sequence number of the entry in the log
  """
  seqNum: SeqNum!
): SingleEntryAndPayload

"""
get aliases of the provided `public_keys` that you can use in future requests
to save bandwidth
"""
authorAliases(publicKeys: [PublicKey!]!): [AliasedAuthor!]!
```

```graphql
"""
AliasedAuthor is one of either the public_key or an alias

the intention of this is to reduce bandwidth when making requests by using a
short "alias" rather than the full author public_key

to get an alias of an author, use the `author_aliases` method which will return
this type.

when using as an input to a query, exactly one of public_key or alias must be
set otherwise it is an error.
"""
type AliasedAuthor {
  """
  the author's public key
  """
  publicKey: PublicKey!

  """
  the author alias
  """
  alias: ID!
}

"""
Either the `public_key` or the `alias` of that author.
"""
input Author {
  """
  the author's public key
  """
  publicKey: PublicKey

  """
  the author alias
  """
  alias: ID
}

"""
An entry with an optional operation payload
"""
type EntryAndOperation {
  """
  get the entry
  """
  entry: EncodedEntry!

  """
  get the operation (entry payload)
  """
  operation: EncodedOperation
}

type EntryAndPayloadConnection {
  """
  information to aid in pagination
  """
  pageInfo: PageInfo!

  """
  a list of edges.
  """
  edges: [EntryAndPayloadEdge]
}

"""
An edge in a connection
"""
type EntryAndPayloadEdge {
  """
  the item at the end of the edge
  """
  node: EntryAndOperation!

  """
  a cursor for use in pagination
  """
  cursor: String!
}

"""
information about pagination in a connection
"""
type PageInfo {
  """
  when paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!

  """
  when paginating forwards, are there more items?
  """
  hasNextPage: Boolean!

  """
  when paginating backwards, the cursor to continue
  """
  startCursor: String

  """
  when paginating forwards, the cursor to continue
  """
  endCursor: String
}

type SingleEntryAndPayload {
  """
  entry bytes encoded as hexadecimal string
  """
  entry: EncodedEntry!

  """
  operation (payload of the entry) bytes encoded as hexadecimal string
  """
  operation: EncodedOperation

  """
  get the certificate pool for this entry that can be used to verify the entry
  is valid.
  """
  certificatePool: [EncodedEntry!]!
}
```

## Transport protocol

- p2panda replication protocol is based on the GraphQL query language
  - this allows developers to easily build their p2panda replication implementations in any programming language
  - this allows "leecher" node implementations in the browser which collect and persist entries but do not communicate and replicate further with other nodes

### GraphQL over HTTP

- the GraphQL queries can be made via HTTP against `<host>:2020/graphql`

### GraphQL over qp2p

- nodes can offer a [qp2p][qp2p] endpoint on port `2022` for replication via the qp2p (QUIC, TLS 1.3) protocol
- qp2p is a p2p messaging protocol sending discrete GraphQL queries over QUIC streams, it ..
  - has built-in support for the Internet Gateway Device Protocol (IGD) for automatic port forwarding for peers behind NAT-enabled routers
  - is based on the QUIC streaming protocol supporting both unidirectional and bidirectional streams
  - has a fault-tolerancy mechanism
  - makes use of connection pooling, for reusing already opened connections

### Encryption

- data over qp2p and regular HTTP transport connection is secured via TLS 1.3
- TLS certificates are self-signed certificates by default
  - this allows transport encryption without a centralised certificate authority (CA)
  - this doesn't give authentication but since p2panda data is already authenticated and designed to function in a trustless network setting, this doesn't need to be reflected on this layer
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

- nodes may not be interested in all available data and can choose to receive only some data, for example by only requesting documents following a certain schema
- nodes need to implement the API specifications to make sure they are compatible with all other node and client implementations. The Node API is specified here, the Client API is further specified under [queries][queries], both APIs reside inside nodes

[qp2p]: https://github.com/maidsafe/qp2p
[queries]: /docs/organising-data/queries
