---
id: queries
title: Queries
---

- The GraphQL schema of a node changes depending on the schemas that are available on the node.
- A node inserts additional queryable fields into the root query type for every schema that can be queried.
  - In addition, corresponding types for responses, pagination, ordering and filtering are generated according to the schemas' definitions.
  - Together, these allow clients to request documents including their materialized views and metadata.
  - Detailed descriptions of the generated types and queries follows below.
- Therefore, client implementations SHOULD gracefully handle being connected to a node that doesn't process a schema they would like to interact with.
- This specification defines a generic form for these dynamic GraphQL fields and types.
  - The string `<schema_id>` is used as a generic placeholder to be replaced by a concrete _schema id_.


## `<schema_id>`

- Returns a single document that uses this schema
  - Implementations must have no side effects
- The name of this field is equal to the _schema id_ of the schema it represents
- Either the `id` or `viewId` field argument must be set
  - If `id` contains a document id, the response must contain the [_latest document view_][latest-document-view] for that document
  - If `viewId` contains a document view id, the response must contain this document view
  - If both field arguments are given the view id is used
- Not every node holds all documents and especially not all document views (historical states of a document) in its database because of the decentralised nature of p2panda. in this case a "not found" error will be returned

```graphql
type QueryRoot {
  # ... other query root fields here ...

  <schema_id>(
    # id of the document to be queried
    id: DocumentId

    # specific document view id to be queried
    viewId: DocumentViewId
  ): <schema_id>
}
```

## `all_<schema_id>`

- Returns the [latest document view][latest-document-view] for many documents of a given schema
  - Implementations must have no side effects
- Deleted documents must not be included in the response unless they are explicitly included using a filter
- Response is paginated, can be sorted and filtered

```graphql
type QueryRoot {
  # ... other query root fields here ...

  # Get all <schema_id> documents with pagination, ordering and filtering.
  all_<schema_id>(
    # Filter the query based on field values
    filter: <schema_id>Filter

    # Filter the query based on meta field values
    meta: MetaFilterInput

    # Field by which items in the collection will be ordered
    orderBy: <schema_id>OrderBy

    # Direction which items in the collection will be ordered
    orderDirection: OrderDirection

    # Number of paginated items we want from this request
    first: Int = 25

    # The item we wish to start paginating from identified by a cursor
    after: Cursor
  ): <schema_id>Collection!
}
```

## types

- A node's GraphQL schema contains both statically defined and dynamically created types.
- these types may relate to query arguments for handling filtering, ordering and pagination or types present on query responses.
- dynamically created types always contain the `schema_id` of the schema they are derived from in their name, whereas static types do not.
- the following is a list of all types which can be found in a node's root GraphQL schema

### Responses

```graphql
# response from a request for a single <schema_id> document
type <schema_id> {
  # application fields of a `<schema_id>` document.
  fields: <schema_id>Fields

  # meta fields of a `<schema_id>` document.
  meta: DocumentMeta
}

# application fields of a `<schema_id>` document.
type <schema_id>Fields {
  # named fields containing the actual, materialized values of this document view. the form is defined by the regarding p2panda schema
  <field_name>: <field_type>

  # ... potentially more fields
}

# single page response returned when querying a collection of `<schema_id>` documents.
type <schema_id>Collection {
  # total number of documents available in this paginated collection.
  totalCount: Int!

  # cursor for the next page
  endCursor: String!

  # boolean value denoting whether there is a next page available on this query.
  hasNextPage: Boolean!

  # field containing the actual document fields.
  documents: [<schema_id>Item!]!
}

# single item in a paginated collection response
type <schema_id>Item {
  # application fields of a `band` document.
  fields: <schema_id>Fields

  # meta fields of a `band` document.
  meta: DocumentMeta

  # the pagination `cursor` for this `<schema_id>` document.
  cursor: String
}

# Meta fields of a document, contains id and authorship information.
type DocumentMeta {
  # document id of this document.
  documentId: DocumentId!

  # document view id of this document.
  viewId: DocumentViewId!

  # public key of the author who first created this document.
  owner: PublicKey!
}

```

### Filters

```graphql

# A filter input type for boolean field values.
input BooleanFilter {
  # Filter by equal to.
  eq: Boolean

  # Filter by not equal to.
  notEq: Boolean
}

# A filter input type for integer field values.
input FloatFilter {
  # Filter by values in set.
  in: [Integer!]

  # Filter by values not in set.
  notIn: [Integer!]

  # Filter by equal to.
  eq: Integer

  # Filter by not equal to.
  notEq: Integer

  # Filter by greater than or equal to.
  gte: Integer

  # Filter by greater than.
  gt: Integer

  # Filter by less than or equal to.
  lte: Integer

  # Filter by less than.
  lt: Integer
}

# A filter input type for float field values.
input FloatFilter {
  # Filter by values in set.
  in: [Float!]

  # Filter by values not in set.
  notIn: [Float!]

  # Filter by equal to.
  eq: Float

  # Filter by not equal to.
  notEq: Float

  # Filter by greater than or equal to.
  gte: Float

  # Filter by greater than.
  gt: Float

  # Filter by less than or equal to.
  lte: Float

  # Filter by less than.
  lt: Float
}

# A filter input type for string field values.
input StringFilter {
  # Filter by values in set.
  in: [String!]

  # Filter by values not in set.
  notIn: [String!]

  # Filter by equal to.
  eq: String

  # Filter by not equal to.
  notEq: String

  # Filter by greater than or equal to.
  gte: String

  # Filter by greater than.
  gt: String

  # Filter by less than or equal to.
  lte: String

  # Filter by less than.
  lt: String

  # Filter for items which contain given value.
  contains: String

  # Filter for items which don't contain given value.
  notContains: String
}


# A filter input type for relation field values.
input RelationFilter {
  # Filter by equal to.
  eq: DocumentId

  # Filter by not equal to.
  notEq: DocumentId

  # Filter by values in set.
  in: [DocumentId!]

  # Filter by values not in set.
  notIn: [DocumentId!]
}

# A filter input type for relation list field values.
input RelationListFilter {
  # Filter by values in set.
  in: [DocumentId!]

  # Filter by values not in set.
  notIn: [DocumentId!]
}

# A filter input type for pinned relation field values.
input PinnedRelationFilter {
  # Filter by equal to.
  eq: DocumentViewId

  # Filter by not equal to.
  notEq: DocumentViewId

  # Filter by values in set.
  in: [DocumentViewId!]

  # Filter by values not in set.
  notIn: [DocumentViewId!]
}

# A filter input type for pinned relation list field values.
input PinnedRelationListFilter {
  # Filter by values in set.
  in: [DocumentViewId!]

  # Filter by values not in set.
  notIn: [DocumentViewId!]
}

# A filter input type for document id field on meta object.
input DocumentIdFilter {
  # Filter by values in set.
  in: [DocumentId!]

  # Filter by values not in set.
  notIn: [DocumentId!]

  # Filter by equal to.
  eq: DocumentId

  # Filter by not equal to.
  notEq: DocumentId
}

# A filter input type for document view id field on meta object.
input DocumentViewIdFilter {
  # Filter by values in set.
  in: [DocumentViewId!]

  # Filter by values not in set.
  notIn: [DocumentViewId!]

  # Filter by equal to.
  eq: DocumentViewId

  # Filter by not equal to.
  notEq: DocumentViewId
}

# A filter input type for owner field on meta object.
input OwnerFilter {
  # Filter by values in set.
  in: [PublicKey!]

  # Filter by values not in set.
  notIn: [PublicKey!]

  # Filter by equal to.
  eq: PublicKey

  # Filter by not equal to.
  notEq: PublicKey
}

# Filter input containing all meta fields a collection of documents can be filtered by. Is
# passed to the `meta` argument on a document collection query or list relation fields.
input MetaFilterInput {
  # Document id filter.
  documentId: DocumentIdFilter

  # Document view id filter.
  viewId: DocumentViewIdFilter

  # Owner filter.
  owner: OwnerFilter

  # Edited filter.
  edited: BooleanFilter

  # Deleted filter.
  deleted: BooleanFilter
}

# Filters for a documents' application fields
input <schema_id>Filter {
  # field to filter by
  <field_name>: BooleanFilter | IntegerFilter | FloatFilter | StringFilter | RelationFilter | RelationListFilter | PinnedRelationFilter | PinnedRelationListFilter

  # ... potentially more fields
}

```

### Ordering

```graqhql
# Possible ordering direction for collection queries.
enum OrderDirection {
  ASC
  DESC
}

enum <schema_id>OrderBy {
  DOCUMENT_ID
  DOCUMENT_VIEW_ID
  <field_name>
  # ... potentially more fields
}

```

- Nodes generate some GraphQL types for every schema that can be queried:
  1. a type `<schema_id>` that contains fields for document metadata and the associated document view
  2. a type `<schema_id>Fields` to represent the document view's fields with the actual data contained in the document
- Document fields with the types `Boolean`, `Integer`, `Float` and `String` are represented with the corresponding GraphQL scalar types.
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

[aquadoggo]: https://github.com/p2panda/aquadoggo
[bamboo]: /specification/data-types/bamboo
[connection-specification]: https://relay.dev/graphql/connections.htm
[documents]: /specification/data-types/documents
[graphql]: https://graphql.org/
[latest-document-view]: /specification/data-types/documents#the-latest-document-view
[nodes]: /specification/networking/clients-nodes
[operations]: /specification/data-types/operations
[pagination-specification]: https://graphql.org/learn/pagination/#pagination-and-edges
[reduction]: /specification/data-types/documents#reduction
[replication]: /specification/APIs/replication
[self-referential-relation]: /specification/data-types/schemas#relation-fields
