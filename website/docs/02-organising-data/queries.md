---
id: queries
---

# Queries

- clients send _queries_ to nodes in order to publish new entries and query materialised documents
- queries are sent via HTTP using the [GraphQL][graphql] language
- serving a GraphQL API and handling requests is implemented in [nodes][nodes], for example [Aquadoggo][aquadoggo]
- nodes use the same GraphQL API to talk to each other, you can read more about it under [replication][replication]
- large numbers are encoded as strings in the payloads (`logId` and `seqNum`) to account for the lack of support to represent u64 integers in JSON

## Client API

- clients can publish entries
    - before that, clients can retrieve parameters required for encoding entries if they can't compute them independently
- clients can retrieve materialised [documents][documents] of a given schema
    - documents can be filtered by individual fields
    - linked documents can be retrieved
    - documents can be sorted by arbitrary fields
    - documents can be sorted by self-referential orderings
    - documents can be queried by `document_view_id` in order to receive a [documents][view] onto it's data at a specific materialised state

### Publishing Entries

- clients use two GraphQL queries for publishing entries:
    1. `nextEntryArgs` to retrieve parameters required for encoding an entry
    2. `publishEntry` to publish a signed and encoded entry together with its payload

#### `nextEntryArgs`

- returns parameters required for encoding new entries
    - no side effects
- clients can't encode new entries without information from this endpoint because every entry needs to place itself in the first unused sequence number of a specific [_bamboo log_][bamboo] and also it needs to include the hashes of specific previous entries in its encoding
    - this information is held by the node
- clients may cache the arguments required for the next entry (they are also returned by `publishEntry`)
- clients may also persist their entry logs locally to avoid any dependency for retrieving entry arguments of nodes at all

```graphql
query nextEntryArgs(
  """
  public key of the author forging the next entry
  """
  publicKey: String!

  """
  document id the operation wants to mutate. leave empty when document was not
  created yet
  """
  documentId: String
): EntryArgsResponse!

type EntryArgsResponse {
  """
  log id to be used to forge the next entry
  """
  logId: String!

  """
  sequence number to be used to forge the next entry
  """
  seqNum: String!

  """
  optional backlink hash to be used to forge the next entry
  """
  backlink: String

  """
  optional skiplink hash to be used to forge the next entry
  """
  skiplink: String
}
```

#### `publishEntry`

- publishes the entry supplied with the request
  - the entry is validated by the receiving node and persisted in a database. the data gets validated by checking if:
    - the entry adheres to the [bamboo specification][bamboo] and has a valid signature and log integrity
    - the operation adheres to the [operation specification][operations]
    - the operation is linked to the entry with a correct payload hash and size
  - the operation may be materialised on the node resulting in a new document view
- returns entry arguments required for publishing the next entry for the same document, similar to `nextEntryArgs`
- returns an error when the bamboo log, signature or document integrity could not be verified, the operation was malformed or schema not fullfilled


```graphql
mutation publishEntry(
  """
  CBOR representation of a signed Bamboo entry, encoded as a hexadecimal string
  """
  entryEncoded: String!

  """
  CBOR representation of an p2panda operation, the payload of the Bamboo entry,
  encoded as a hexadecimal string
  """
  operationEncoded: String!
): PublishEntryResponse!

type PublishEntryResponse {
  """
  log id to be used to forge the next entry
  """
  logId: String!

  """
  sequence number to be used to forge the next entry
  """
  seqNum: String!

  """
  optional backlink hash to be used to forge the next entry
  """
  backlink: String

  """
  optional skiplink hash to be used to forge the next entry
  """
  skiplink: String
}
```

### Querying documents

- not every node holds all documents and especially not all document views (historical states of a document) in its database because of the decentralised nature of p2panda. in this case a "not found" error will be returned
- since schemas can be created by clients in the p2panda network the regarding GraphQL schemas are dynamically created as the network changes. p2panda uses _schema ids_ to refer to documents of certain type, in this specification we use `<schema_id>` as a placeholder

#### `<schema_id>`

- returns one document view of a given schema
    - no side effects
- either a `id` or `view_id` needs to be specified

```graphql
query <schema_id>(
  """
  id of the document to be queried
  """
  id: String

  """
  specific view id of the document to be queried, this returns the document
  state at a certain point in time
  """
  viewId: String
): <schema_id>Response!
```

```graphql
type <schema_id>Response {
  """
  meta information about the queried document view
  """
  meta: <schema_id>ResponseMeta,

  """
  actual data contained in this document view
  """
  fields: <schema_id>ResponseFields,
}

type <schema_id>ResponseMeta {
  """
  list of public keys which edited this document view
  """
  publicKeys: [String!]!

  """
  identifier of the whole document
  """
  id: String!

  """
  identifier of the document at this point in time
  """
  viewId: String!

  """
  flag indicating if this document has been deleted
  """
  deleted: Boolean!

  """
  flag indicating if this document view has been updated at least once
  """
  edited: Boolean!
}

type <schema_id>ResponseFields {
  """
  named fields containing the actual, materialised values of this document
  view. the form is defined by the regarding p2panda schema
  """
  <field_name>: <field_type>

  """
  ... potentially more fields
  """
}
```

#### `all_<schema_id>`

- returns zero to many documents (the "latest" document views) of a given schema
    - no side effects
- response is paginated, can be sorted and filtered

**Filters**

- filters can be applied on any operation field of type `float`, `string` and `integer`
  - in special cases also 'relation' and 'pinned-relation' can be filtered, see self-referential relations section below
- if no filter is selected all document views following that given schema will be selected

**Ordering**

- if no ordering is selected the document views will be ordered by document id, ascending

**Pagination**

- our pagination adheres to the [connection specification][connection-specification] of graphql
  - a `cursor` is an opaque and unique identifier of every connection edge and can be implemented differently as long as it aids pagination
    - we recommend a base64 encoded document view id as a cursor
    - as stated by the [pagination specification][pagination-specification] of graphql the encoding should aid reminding developers that this data is opaque should not be relied upon

**Self-referential fields**

- if the selected `orderBy` field is a [self-referential relation][self-referential-relation] the node will return an topologically ordered list of that reference graph in the same manner as the [reduction][reduction] algorithm works
- if the selected filter field is a self-referential relation the topologically ordered list will be filtered

```graphql
query all_<schema_id>(
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
): <schema_id>PageResponse!
```

```graphql
type <schema_id>Filter {
  """
  filter by public key
  """
  publicKey: String

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

type <schema_id>PageResponse {
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
  node: <schema_id>Response!

  """
  cursor to use in pagination
  """
  cursor: String!
}
```

[aquadoggo]: https://github.com/p2panda/aquadoggo
[bamboo]: /docs/writing-data/bamboo
[connection-specification]: https://relay.dev/graphql/connections.htm
[documents]: /docs/organising-data/documents
[graphql]: https://graphql.org/
[nodes]: /docs/writing-data/clients-nodes
[operations]: /docs/writing-data/operations
[pagination-specification]: https://graphql.org/learn/pagination/#pagination-and-edges
[reduction]: /docs/organising-data/reduction
[replication]: /docs/networking/replication
[self-referential-relation]: /docs/writing-data/schemas#relation-fields
