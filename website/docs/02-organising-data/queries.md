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
- clients can retrieve materialised documents and document views of a given schema
    - _documents can be filtered by individual fields_
    - _linked documents can be retrieved_
    - _documents can be sorted by arbitrary fields_
    - _documents can be sorted by self-referential orderings_

### Publishing Entries

- clients use two GraphQL queries for publishing entries:
    1. `nextEntryArgs` to retrieve parameters required for encoding an entry
    2. `publishEntry` to publish a signed and encoded entry together with its payload

#### `nextEntryArgs`

- returns parameters required for encoding new entries
    - no side effects
- clients can't encode new entries without information from this endpoint because every entry needs to place itself in the first unused sequence number of a specific [_bamboo log_][encoding] and also it needs to include the hashes of specific previous entries in its encoding
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
  - the entry is validated by the receiving node and persisted in a database
  - the operation is materialised on the node resulting in a new document view
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

### Querying documents and document views

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
  view_id: String
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
  view_id: String!

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

- returns many document views of a given schema
    - no side effects
- response is paginated and can be sorted and filtered

```graphql
query all_<schema_id>(
): [<schema_id>Response!]!
```

[aquadoggo]: https://github.com/p2panda/aquadoggo
[encoding]: /docs/writing-data/bamboo
[graphql]: https://graphql.org/
[nodes]: /docs/writing-data/clients-nodes
[replication]: /docs/networking/replication
