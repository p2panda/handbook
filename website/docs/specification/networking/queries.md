---
id: queries
title: Queries
---

- clients send _queries_ to nodes in order to publish new entries and query materialised documents
- queries are sent via HTTP using the [GraphQL][graphql] language
- serving a GraphQL API and handling requests is implemented in [nodes][nodes], for example [Aquadoggo][aquadoggo]
- nodes use the same GraphQL API to talk to each other, you can read more about it under [replication][replication]
- large numbers are encoded as strings in the payloads (`logId` and `seqNum`) to account for the lack of support to represent u64 integers in JSON

## Client API

- the client api is the interface for communication between [node and client][nodes]
- clients can publish entries
  - before that, clients can retrieve parameters required for encoding entries if they can't compute them independently
- clients can retrieve materialised [documents][documents] of a given schema
  - documents can be filtered by individual fields
  - linked documents can be retrieved
  - documents can be sorted by arbitrary fields
  - documents can be sorted by self-referential orderings
  - documents can be queried by document view id in order to receive a [documents][view] onto it's data at a specific materialised state

## Publishing Entries

- clients use two GraphQL operations for publishing entries:
  1. [`nextEntryArgs`](#nextentryargs) query to retrieve parameters required for encoding an entry
  2. [`publishEntry`](#publishentry) mutation to publish a signed and encoded entry together with its payload

### `nextEntryArgs`

- returns parameters required for encoding new entries
  - implementations must not have side effects
- clients can't encode new entries without information from this endpoint because every entry needs to place itself in the first unused sequence number of a specific [_bamboo log_][bamboo] and also it needs to include the hashes of specific previous entries in its encoding
  - this information is held by the node
- clients may cache the arguments required for the next entry (they are also returned by `publishEntry`)
- clients may also persist their entry logs locally to avoid any dependency for retrieving entry arguments of nodes at all
- clients must set the field's `documentId` argument to receive arguments for encoding an `UPDATE` or `DELETE` operation.
  - clients must not set this when they want to encode a `CREATE` operation

```graphql
query nextEntryArgs(
  """
  public key of the author signing and encoding the next entry
  """
  publicKey: PublicKey!

  """
  id of the document that will be updated or deleted with the next entry. leave empty to receive arguments for creating a new document.
  """
  documentId: DocumentId
): NextEntryArguments!
```

### `publishEntry`

- if a `publishEntry` request is accepted by a node it must publish the entry supplied with the request by taking the following steps:
  - the node must validate the received entry and operation by checking if:
    - the entry adheres to the [bamboo specification][bamboo] and has a valid signature and log integrity
    - the operation adheres to the [operation specification][operations]
    - the operation is linked to the entry with a correct payload hash and size
  - the node should persist the entry and operation and make it available to other nodes via [replication][replication]
  - the node may [materialise][reduction] the document this new operation belongs to, resulting in a new document view
- returns entry arguments required for publishing the next entry for the same document, similar to `nextEntryArgs`
- returns an error
  - when the bamboo log, signature or document integrity could not be verified, the operation was malformed or schema not fullfilled
  - when the node is unable to persist the entry and operation at the moment

```graphql
mutation publishEntry(
  """
  CBOR representation of a signed Bamboo entry, encoded as a hexadecimal string
  """
  entry: EncodedEntry!

  """
  CBOR representation of an p2panda operation, the payload of the Bamboo entry,
  encoded as a hexadecimal string
  """
  operation: EncodedOperation!
): NextEntryArguments!
```

### Response

- both `publishEntry` and `nextEntryArgs` return the arguments for encoding and signing the next entry as a response

```graphql
type NextEntryArguments {
  """
  log id to be used to forge the next entry
  """
  logId: LogId!

  """
  sequence number to be used to forge the next entry
  """
  seqNum: SeqNum!

  """
  optional backlink hash to be used to forge the next entry
  """
  backlink: EntryHash

  """
  optional skiplink hash to be used to forge the next entry
  """
  skiplink: EntryHash
}
```

## Querying documents

- For every schema that can be queried, nodes generate fields, which are made available on the _root query type_, as well as types to represent the schema's documents.
  - Together, these allow clients to request documents including their materialised views and metadata.
- As fields and types that contain schema-specific data are dynamically generated, every node may contain a different set of these, depending on which schemas are available.
- This specification defines a generic form for these dynamic fields and types.
  - The string `<schema_id>` is used as a generic placeholder to be replaced by a concrete _schema id_.

### GraphQL type

- Nodes generate two GraphQL types for every schema that can be queried:
  1. a type `<schema_id>` that contains fields for document metadata and the associated document view
  2. a type `<schema_id>Fields` to represent the document view's fields with the actual data contained in the document
- Document fields with the types `Boolean`, `Integer`, `Float` and `Text` are represented with the corresponding GraphQL scalar types.
- Document fields with the relation types `Relation` / `RelationList` and `PinnedRelation` / `PinnedRelationList` use the type generated for that field's schema.

```graphql
type <schema_id> {
  """
  meta information about the returned document and document view
  """
  meta: DocumentMeta,

  """
  actual data contained in the document view
  """
  fields: <schema_id>Fields,
}

type <schema_id>Fields {
  """
  named fields containing the actual, materialised values of this document
  view. the form is defined by the regarding p2panda schema
  """
  <field_name>: <field_type>

  """
  ... potentially more fields
  """
}

type DocumentMeta {
  """
  identifier of the returned document
  """
  documentId: DocumentId!

  """
  document view id contained in this response
  """
  viewId: DocumentViewId!

  """
  this field is `true` if this document has been deleted
  """
  deleted: Boolean!

  """
  this field is `true` if this document view has been updated at least once
  """
  edited: Boolean!
}
```

### `<schema_id>`

- returns a single document that uses this schema
  - implementations must have no side effects
- the name of this field is equal to the _schema id_ of the schema it represents
- either the `id` or `viewId` field argument must be set
  - if `id` contains a document id, the response must contain the [_latest document view_][latest-document-view] for that document
  - if `viewId` contains a document view id, the response must contain this document view
  - if both field arguments are given the query must return an error
- not every node holds all documents and especially not all document views (historical states of a document) in its database because of the decentralised nature of p2panda. in this case a "not found" error will be returned

```graphql
type QueryRoot {
  # ... other query root fields here ...

  <schema_id>(
    """
    id of the document to be queried
    """
    id: DocumentId

    """
    specific document view id to be queried
    """
    viewId: DocumentViewId
  ): <schema_id>
}
```

### `all_<schema_id>`

- returns the [latest document view][latest-document-view] for many documents of a given schema
  - implementations must have no side effects
- deleted documents must not be included in the response unless they are explicitly included using a filter
- response is paginated, can be sorted and filtered

**Filters**

- filters can be applied on any operation field of type `float`, `str` and `integer`
  - in special cases also `relation` and `pinned_relation` can be filtered, see self-referential relations section below
- if no filter is selected all document views following that given schema will be selected

**Ordering**

- if no ordering is selected the documents will be ordered by document id, ascending

**Pagination**

- our pagination adheres to the [connection specification][connection-specification] of graphql
  - a `cursor` is an opaque and unique identifier of every connection edge and can be implemented differently as long as it aids pagination
    - we recommend a base64 encoded document view id as a cursor
    - as stated by the [pagination specification][pagination-specification] of graphql the encoding should aid reminding developers that this data is opaque should not be relied upon

**Self-referential fields**

- if the selected `orderBy` field is a [self-referential relation][self-referential-relation] the node will return a topologically ordered list of that reference graph in the same manner as the [reduction][reduction] algorithm works
- if the selected filter field is a self-referential relation the topologically ordered list will be filtered

```graphql
type QueryRoot {
  # ... other query root fields here ...

  all_<schema_id>(
    """
    filter collection of documents
    """
    where: <schema_id>Filter

    """
    order results by field values
    """
    orderBy: <field_name>

    """
    order results in specified direction ("asc" or "desc")
    """
    orderDirection: String

    """
    max number of items to be returned per page
    """
    first: Int

    """
    cursor identifier for pagination
    """
    after: String
  ): <schema_id>Page!
}
```

```graphql
type <schema_id>Filter {
  """
  filter by public key
  """
  publicKey: PublicKey

  """
  filter by deletion status
  """
  deleted: Boolean

  """
  filter by editing status
  """
  edited: Boolean

  """
  filter by fields containing that exact value
  """
  <field_name>: <value>

  """
  filter by fields not containing that exact value
  """
  <field_name>_ne: <value>

  """
  filter by fields containing larger values
  """
  <field_name>_gt: <value>

  """
  filter by fields containing larger or equal values
  """
  <field_name>_gte: <value>

  """
  filter by fields containing lower values
  """
  <field_name>_lt: <value>

  """
  filter by fields containing lower or equal values
  """
  <field_name>_lte: <value>
}

type <schema_id>Page {
  """
  information to aid in pagination
  """
  pageInfo: <schema_id>PageInfo!

  """
  list of returned items with pagination data
  """
  edges: [<schema_id>PageEdge]
}

type <schema_id>PageInfo {
  """
  when paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!

  """
  when paginating forwards, are there more items?
  """
  hasNextPage: Boolean!

  """
  when paginating backwards, the cursor to continue.
  """
  startCursor: String

  """
  when paginating forwards, the cursor to continue.
  """
  endCursor: String
}

type <schema_id>PageEdge {
  """
  item at the end of the pagination edge
  """
  node: <schema_id>!

  """
  cursor to use in pagination
  """
  cursor: String!
}
```

[aquadoggo]: https://github.com/p2panda/aquadoggo
[bamboo]: /specification/data-types/bamboo
[connection-specification]: https://relay.dev/graphql/connections.htm
[documents]: /specification/data-types/documents
[graphql]: https://graphql.org/
[latest-document-view]: /specification/data-types/documents#the-latest-document-view
[nodes]: /specification/networking/clients-nodes
[operations]: /specification/data-types/operations
[pagination-specification]: https://graphql.org/learn/pagination/#pagination-and-edges
[reduction]: /specification/data-types/materialization#reduction
[replication]: /specification/data-types/materialization#replication
[self-referential-relation]: /specification/data-types/schemas#relation-fields
