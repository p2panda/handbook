---
id: replication
title: Replication
---

- this api consists of GraphQL queries for other nodes to ask about the state of bamboo logs, entries and payloads
  - these queries are enough to build a flexible replication protocol on top
- nodes need to implement the API specifications to make sure they are compatible with all other node and client implementations.

## `entryByHash`

```graphql
"""
get an entry by its hash
"""
entryByHash(hash: EntryHash!): EncodedEntryAndOperation
```

## `entryByLogIdAndSeqNum`

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

## `entriesNewerThanSeqNum`

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

## Encoded entries with operation

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

## Pagination

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

[qp2p]: https://github.com/maidsafe/qp2p
[queries]: /specification/APIs/queries
