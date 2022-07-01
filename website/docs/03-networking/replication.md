---
id: replication
---

# Replication

- replication is the process by which nodes exchange entries and operations to eventually converge all to the same state
  - this makes p2panda an _eventually consistent_ database
  - nodes autonomously share data with each other without central coordination
- nodes may not be interested in all available data and can choose to receive only some data
  - for example from a set of authors or schemas

## Node API

- this api consists of GraphQL queries for other nodes to ask about the state of bamboo logs, entries and payloads
  - these queries are enough to build a flexible replication protocol on top
- nodes need to implement the API specifications to make sure they are compatible with all other node and client implementations. The Node API is specified here, the Client API is further specified under [queries][queries], both APIs reside inside nodes

### `entryByHash`

```graphql
"""
get an entry by its hash
"""
entryByHash(hash: EntryHash!): EncodedEntryAndOperation
```

### `entryByLogIdAndSeqNum`

```graphql
"""
get a single entry by its log id, sequence number and public key
"""
entryByLogIdAndSeqNum(
  """
  id of the log
  """
  logId: LogId!

  """
  public key of author of the log
  """
  public_key: PublicKey!

  """
  sequence number of the entry in the log
  """
  seqNum: SeqNum!
): EncodedEntryAndOperation
```

### `entriesNewerThanSeqNum`

- used as the main query for replication, see process defined further below

```graphql
"""
get any entries that are newer than the provided sequence_number for a given
public key and log_id
"""
entriesNewerThanSeqNum(
  """
  id of the log
  """
  logId: LogId!

  """
  public key of author of the log
  """
  public_key: PublicKey!

  """
  latest known sequence number. we want the entries which are newer than this,
  defaults to 0
  """
  seqNum: SeqNum

  """
  max number of items to be returned per page, defaults to 10
  """
  first: Int

  """
  cursor identifier for pagination
  """
  after: String
): EncodedEntryAndOperationConnection!
```

### Encoded entries with operation

```graphql
type EncodedEntryAndOperation {
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
  is valid
  """
  certificatePool: [EncodedEntry!]!
}
```

### Pagination

```graphql
type EncodedEntryAndOperationConnection {
  """
  information to aid in pagination
  """
  pageInfo: PageInfo!

  """
  a list of edges.
  """
  edges: [EncodedEntryAndOperationEdge]
}

"""
an edge in a connection
"""
type EncodedEntryAndOperationEdge {
  """
  the item at the end of the edge
  """
  node: EncodedEntryAndOperation!

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
  - nodes may not be interested in all available data and can choose to receive only some data, for example by only requesting operations following a certain schema

**Process**

1. Node `A` gets latest known sequence number `s` for log `k` of author `p` from own database
2. Node `A` makes a GraphQL request `entriesNewerThanSeqNum` and asks Node `B` if it has newer entries of log `k` and author `p` starting from sequence number `s`
3. Node `B` replies with a paginated list of encoded entries and operations. If it doesn't have that log or if there are no newer entries, it replies with an empty result
4. Node `A` paginates through the response until it downloaded all new entries, it validates them locally and stores them in its database. Node `A` can make use of the `certificatePool` field of `EncodedEntryAndOperation` if it doesn't have the full log locally to verify it

[qp2p]: https://github.com/maidsafe/qp2p
[queries]: /docs/organising-data/queries
