---
id: operations
title: Operations
---

- Operations represent atomic data changes.
- Operations are published as the payload of _bamboo entries_.
- Operations are identified by the hash of their bamboo entry.
- Every operation is associated with a [bamboo author](/specification/data-types/key-pairs), which is encoded in the operation's _entry_

:::info Definition: Operation ID

The _operation id_ uniquely identifies an operation. It is equal to the hash of the Bamboo entry that has the operation as its payload.

:::

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

:::info Definition: Operation Actions

There are 3 types of operation:

1. _create operations_ initialise new documents and set all of their field values.
2. _update operations_ mutate any number of fields on an existing document.
3. _delete operations_ delete an existing document.

:::

:::caution Requirement OP3

Every operation MUST have an _operation action_, which MUST be one of

- `0` - denotes a CREATE action and results in a _create operation_
- `1` - denotes an UPDATE action and results in a _update operation_
- `2` - denotes a DELETE action and results in a _delete operation_

:::

### Schema Id

- The schema of an operation may define additional requirements for the operation's action, previous and fields items.
  - See the [schema](/specification/data-types/schemas) section for more details.

:::caution Requirement OP4

Every operation MUST have a [schema id](/specification/data-types/schemas).

:::

### Previous

- _previous_ specifies where an operation should be placed when constructing the graph of operations required to materialise a document.
  - It contains an array of _operation_id_'s which identify the tip operation of any un-merged branches in this document at the time of
    publishing this operation.
  - In the case where a graph has no un-merged branches, this array will contain only one id (the resolved graph tip).
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
  - see [schema][/specification/data-types/schemas] for further specification of field names and values
- The schema defined by the schema id item of the operation specifies the name and type of each field which can be included in an operation.
- In order to deserialise typed field values, a copy of the schema is required.

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
- Clients must embed operations in bamboo entries to publish them.
- Clients can create a [document](/specification/data-types/documents) by publishing a CREATE operation.
- Clients can update a document by publishing an _update operation_.
  - Every _update operation_ leads to a new _document view_ of the document that is being updated.
- Clients can delete a document by publishing a _delete operation_.
- Nodes can [reduce](/specification/data-types/documents#reduction) operations to produce a specific _document view_ of their document.
- Clients can delete a document by publishing a _delete operation_.

:::caution Requirement OP9

Nodes MUST delete all operations of a document once it has been deleted. (_note: this should probably go into the documents section_).

:::

[cbor]: https://cbor.io/
[snake_case]: https://en.wikipedia.org/wiki/Snake_case
