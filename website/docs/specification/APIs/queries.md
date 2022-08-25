---
id: queries
title: Queries
---

- The GraphQL schema of a node changes depending on the schemas that are available on the node.
- A node inserts additional queryable fields into the root query type for every schema that can be queried.
  - In addition, types for the responses of these fields are generated according to the schemas' definitions.
  - Together, these allow clients to request documents including their materialised views and metadata.
  - Detailed descriptions of both of these follow below.
- Therefore, client implementations SHOULD gracefully handle being connected to a node that doesn't process a schema they would like to interact with.
- This specification defines a generic form for these dynamic GraphQL fields and types.
  - The string `<schema_id>` is used as a generic placeholder to be replaced by a concrete _schema id_.

## GraphQL type

- Nodes generate two GraphQL types for every schema that can be queried:
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

## `<schema_id>`

- returns a single document that uses this schema
  - implementations must have no side effects
- the name of this field is equal to the _schema id_ of the schema it represents
- either the `id` or `viewId` field argument must be set
  - if `id` contains a document id, the response must contain the [_latest document view_][latest-document-view] for that document
  - if `viewId` contains a document view id, the response must contain this document view
  - if both field arguments are given the view id is used
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

## `all_<schema_id>`

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
[reduction]: /specification/data-types/documents#reduction
[replication]: /specification/APIs/replication
[self-referential-relation]: /specification/data-types/schemas#relation-fields
