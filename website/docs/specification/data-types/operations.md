---
id: operations
title: Operations
---

- Operations represent atomic data changes.
- Operations are published as the payload of _Bamboo entries_.
- Operations are identified by the hash of their Bamboo entry.
- Every operation is associated with a [Bamboo author][key-pairs], which is encoded in the operation's _entry_

:::info Definition: Operation ID

The _operation id_ uniquely identifies an operation. It is equal to the hash of the Bamboo entry that has the operation as its payload.

:::

```
struct Operation {
  /// Version of this operation.
  version: NonZeroU64,

  /// Describes if this operation creates, updates or deletes data.
  action: OperationAction,

  /// The id of the schema for this operation.
  schema_id: String,

  /// Optional document view id containing the operation ids directly preceding this one in the
  /// document.
  previous_operations?: String{68}[],

  /// Optional fields map holding the operation data.
  fields?: HashMap<String, OperationValue>,
}
```

## Encoding Format

- CBOR is a binary encoding that is used to encode the contents of an operation and produce bytes that can be associated with a Bamboo entry, stored, and sent over a network connection.
- Operations are encoded as arrays of items, described in more detail below.

:::caution Requirement OP1

An operation MUST be encoded using hexadecimal encoded [CBOR][cbor] with the following format:

`[version, action, schema_id, [previous]?, { [field_key]: <field_value> }?]`

Operations MUST NOT contain any additional items.

:::

## Items

### Version

- The operation version is the version of the p2panda specification that is followed by that operation.

:::caution Requirement OP2

Every operation MUST have an _operation version_. An operation version MUST be a positive integer number. An operation version MUST NOT be larger than 256.

:::

### Action

- The operation action defines the kind of data change that is described by the operation.

```
enum OperationAction {
  CREATE,
  UPDATE,
  DELETE,
}
```

:::info Definition: Operation Actions

There are 3 types of operation:

1. CREATE operations initialise new documents and set all of their field values.
2. UPDATE operations mutate any number of fields on an existing document.
3. DELETE operations delete an existing document.

:::

:::caution Requirement OP3

Every operation MUST have an _operation action_, which MUST be one of

- `0` - denotes a CREATE action and results in a CREATE operation
- `1` - denotes an UPDATE action and results in a UPDATE operation
- `2` - denotes a DELETE action and results in a DELETE operation

:::

### Schema Id

- The schema of an operation may define additional requirements for the operation's action, previous and fields items.
  - See the [schema][schema] section for more details.

:::caution Requirement OP4

Every operation MUST have a [schema id][schema]

:::

### Previous

- _previous_ specifies where an operation should be placed when constructing the graph of operations required to materialise a document.
  - It contains an array of _operation_id_'s which identify the tip operation of any unmerged branches in this document at the time of
    publishing this operation.
  - In the case where a graph has no unmerged branches, this array will contain only one id (the resolved graph tip).
  - Publishing an operation which identifies more than one graph tip effectively merges these branches into one.

:::caution Requirement OP5

DELETE and UPDATE operations MUST have _previous_ with `length > 0`. CREATE operations MUST NOT have _previous_.

:::

### Fields

- _Operation fields_ contain the actual data carried by an operation.
- Depending on the operation's action and schema, different requirements exist for which data must be contained in the operation.
- Fields map field names to field values
  - field names are strings
  - field values can be of type: `u64`, `f64`, `boolean`, `string`, `relation`, `relation_list`, `pinned_relation`, `pinned_relation_list`
  - see [schema][schema] for further specification of field names and values
- The schema defined by the schema id item of the operation specifies the name and type of each field which can be included in an operation.
- In order to deserialise typed field values, a copy of the schema is required.

```
enum OperationValue {
  Boolean(Bool),
  Integer(I64),
  Float(F64),
  String(String),
  Relation(String{68}),
  RelationList(String{68}[]),
  PinnedRelation(String{68}[]),
  PinnedRelationList(String{68}[][]),
}
```

:::caution Requirement OP6

A CREATE operation MUST contain all fields defined by the operation's _operation schema_.
An UPDATE operation MAY contain any combination of fields from the operation's _operation schema_.
A DELETE operation MUST NOT contain any fields.

:::

:::caution Requirement OP7

The encoding reflects the core data types of CBOR while they MUST be interpreted as p2panda operation values when decoding with the help of a schema:

- `string` can be interpreted as any string or a document id for a relation depending on the schema
- `string[]` can be interpreted as a pinned relation (document view id) or a relation list (list of document ids) depending on the schema
- `string[][]` is a pinned relation list

:::

:::caution Requirement OP8

The type of all operation field values MUST match the corresponding field in the operation's schema.

:::

## Usage

- Clients can use operations to publish data changes.
- Clients must embed operations in Bamboo entries to publish them.
- Clients can create a [document][document] by publishing a CREATE operation.
- Clients can update a document by publishing an UPDATE operation.
  - Every UPDATE operation leads to a new _document view_ of the document that is being updated.
- Clients can delete a document by publishing a DELETE operation.
- Nodes can [reduce][reduce] operations to produce a specific _document view_ of their document.
- Clients can delete a document by publishing a DELETE operation.

:::caution Requirement OP9

Nodes MUST delete all operations of a document once it has been deleted.

:::

[cbor]: https://cbor.io/
[document]: /specification/data-types/documents
[key-pairs]: /specification/data-types/key-pairs
[reduce]: /specification/data-types/documents#reduction
[schema]: /specification/data-types/schemas
[snake_case]: https://en.wikipedia.org/wiki/Snake_case
