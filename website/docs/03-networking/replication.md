---
id: replication
---

# Replication

- replication is the process by which nodes exchange data to eventually converge all to the same state
    - nodes autonomously share data with each other without central coordination
    - this makes p2panda an _eventually consistent_ database
- nodes may not be interested in all available data and can choose to receive only some data, for example by only requesting documents following a certain schema
- nodes need to implement the API specifications to make sure they are compatible with all other node and client implementations. The Node API is specified here, the Client API is further specified under [queries][queries], both APIs reside inside nodes

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
  sequenceNumber: SequenceNumber!

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
  sequenceNumber: SequenceNumber!
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
An entry with an optional payload
"""
type EntryAndPayload {
  """
  get the entry
  """
  entry: Entry!

  """
  get the payload
  """
  payload: Payload
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
  node: EntryAndPayload!

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
  The entry
  """
  entry: Entry!

  """
  The payload, bytes encoded as hexadecimal string
  """
  payload: Payload

  """
  Get the certificate pool for this entry that can be used to verify the entry
  is valid.
  """
  certificatePool: [Entry!]!
}

scalar Entry

scalar EntryHash

scalar LogId

scalar Payload

scalar PublicKey

scalar SequenceNumber
```

[queries]: /docs/organising-data/queries
