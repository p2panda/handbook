---
id: replication
---

# Replication

- replication is the process by which nodes exchange data to eventually converge all to the same state
    - nodes autonomously share data with each other without central coordination
    - this makes p2panda an _eventually consistent_ database
- nodes may not be interested in all available data and can choose to receive only some data, for example by only requesting documents following a certain schema
- nodes need to implement the API specifications to make sure they are compatible with all other node and client implementations. The Node API is specified here, the Client API is further specified under [queries][queries], both reside inside of nodes

## Node API

```graphql
"""
Get an entry by its hash
"""
entryByHash(hash: EntryHash!): SingleEntryAndPayload

"""
Get any entries that are newer than the provided sequence_number for a given
author and log_id
"""
getEntriesNewerThanSeq(
  logId: LogId!
  author: Author!
  sequenceNumber: SequenceNumber!
  first: Int
  after: String
): EntryAndPayloadConnection!

"""
Get a single entry by its log_id, sequence_number and author
"""
entryByLogIdAndSequence(
  logId: LogId!
  sequenceNumber: SequenceNumber!
  author: Author!
): SingleEntryAndPayload

"""
Get aliases of the provided `public_keys` that you can use in future requests
to save bandwidth.
"""
authorAliases(publicKeys: [PublicKey!]!): [AliasedAuthor!]!
}
```

```graphql
scalar Entry

scalar EntryHash

scalar LogId

scalar Payload

scalar PublicKey

scalar SequenceNumber

"""
AliasedAuthor is one of either the public_key or an alias

The intention of this is to reduce bandwidth when making requests by using a
short "alias" rather than the full author public_key

To get an alias of an author, use the `author_aliases` method which will return
this type.

When using as an input to a query, exactly one of public_key or alias must be
set otherwise it is an error.
"""
type AliasedAuthor {
  """
  The author's public key
  """
  publicKey: PublicKey!

  """
  The author alias
  """
  alias: ID!
}

"""
Either the `public_key` or the `alias` of that author.
"""
input Author {
  """
  The author's public key
  """
  publicKey: PublicKey

  """
  The author alias
  """
  alias: ID
}

"""
An entry with an optional payload
"""
type EntryAndPayload {
  """
  Get the entry
  """
  entry: Entry!

  """
  Get the payload
  """
  payload: Payload
}

type EntryAndPayloadConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!

  """
  A list of edges.
  """
  edges: [EntryAndPayloadEdge]
}

"""
An edge in a connection.
"""
type EntryAndPayloadEdge {
  """
  The item at the end of the edge
  """
  node: EntryAndPayload!

  """
  A cursor for use in pagination
  """
  cursor: String!
}

type EntryArgsResponse {
  logId: String!
  seqNum: String!
  backlink: String
  skiplink: String
}

"""
Information about pagination in a connection
"""
type PageInfo {
  """
  When paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!

  """
  When paginating forwards, are there more items?
  """
  hasNextPage: Boolean!

  """
  When paginating backwards, the cursor to continue.
  """
  startCursor: String

  """
  When paginating forwards, the cursor to continue.
  """
  endCursor: String
}

type SingleEntryAndPayload {
  """
  The entry
  """
  entry: Entry!

  """
  The payload
  """
  payload: Payload

  """
  Get the certificate pool for this entry that can be used to verify the entry
  is valid.
  """
  certificatePool: [Entry!]!
}
```

[queries]: /docs/organising-data/queries
