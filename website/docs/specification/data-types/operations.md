---
id: operations
title: Operations
---

- Operations represent atomic data changes.
- Operations are published as the payload of _bamboo entries_.
- Operations are identified by the hash of their bamboo entry.
- every operation is associated with a [bamboo author](/specification/data-types/key-pairs), which is encoded in the operation's _entry_

:::info Definition: Operation ID

The _operation id_ uniquely identifies an operation. It is equal to the hash of the Bamboo entry that has the operation as its payload.

:::

## Encoding Format

:::note Requirement OP1

Operations MUST be encoded using hexadecimal encoded CBOR.

:::

- CBOR is a binary encoding that is used to encode the contents of an operation and produce bytes that can be associated with a Bamboo entry, stored, and sent over a network connection.

:::note Requirement OP2

An operation MUST be encoded using [CBOR][cbor] with the following format:

`[version, action, "schema id", [previous]?, { [field key]: <field value> }?]`

:::

:::note Requirement OP2

- all array values and map keys must be serialised in sorted order and de-duplicated unless their order and occurrence is semantic
  - this is currently only required for document view ids, which are given inside of application schema ids and previous fields as well as pinned relation lists or pinned relations
  - all operations that have values or map keys which are not sorted or duplicate even though their order has no semantic meaning are invalid

:::

## Operation Version

- The operation version describes the specification that is followed by that operation
  - this write-up represents the operation specification version 1

:::note Requirement OP6

Every operation MUST have an _operation version_. An operation version MUST be a positive integer number. An operation version MUST NOT be larger than 256.

:::

:::note Requirement OP6

Unknown or unsupported operation versions MUST be rejected.

:::

- The operation version is set according to the version of the p2panda specification that is followed by that operation.

## Operation Action

- The operation action defines the kind of data change that is described by the operation.

:::note Requirement OP2

Every operation MUST have an _operation action_, which MUST be one of

- `0` - results in a CREATE operation
- `1` - results in an UPDATE operation
- `2` - results in a DELETE operation

:::

## Operation Schema Id

:::note Requirement OP3

Every operation MUST have a [schema id](/specification/data-types/schemas).

:::

- The schema of an operation may define additional requirements for the operation.
  - See the [schema](/specification/data-types/schemas) section for more details.

## Previous Operations

:::note Requirement OP7

Every DELETE and UPDATE operation MUST have _previous_ with `length > 0`. Every CREATE operation MUST NOT have _previous_.

:::

- _Previous operations_ specify where an operation should be placed when constructing the graph of operations required to materialise a document.
  - It contains an array of _operation_id_'s which identify the tip operation of any un-merged branches in this document graph.
    - This is also known as a _document_view_id_.
  - In the case where a graph has no un-merged branches, this array will contain only one id (the resolved graph tip).
  - Publishing an operation which identifies more than one graph tip effectively merges these branches into one.

:::note Requirement OP8

A create operation MUST NOT have _previous operations_.

:::

## Fields

- _Operation fields_ contain the actual data carried by an operation.
- Depending on the operation's type and schema, different requirements exist for which data must be contained in the operation.
- Fields map field names to field values
  - field names are strings
  - field values can be of type: `u64`, `f64`, `boolean`, `string`, `relation`, `relation_list`, `pinned_relation`, `pinned_relation_list`
  - see [schema][/specification/data-types/schemas] for further specification of field names and -values
- To identify the actual type of an operation value an external schema is required.

:::note Requirement OP9

A CREATE operation MUST contain all fields defined by the operation's _operation schema_.
An UPDATE operation MAY contain any combination of fields from the operation's _operation schema_.
A DELETE operation MUST NOT contain any fields.

:::

:::note Requirement OP10

    - the encoding reflects the core data types of CBOR while they MUST be interpreted as p2panda operation values when decoding with the help of a schema:
      - `string` can be interpreted as any string or a document id for a relation depending on the schema
      - `string[]` can be interpreted as a pinned relation (document view id) or a relation list (list of document ids) depending on the schema
      - `string[][]` is a pinned relation list

:::

:::note Requirement OP10

    - map names and values MUST be validated against their given schema

:::

:::note Requirement OP10

- operations MUST never contain any more array fields than the specified ones, if they do they need to be rejected

:::

## Usage

- Clients can use operations to publish data changes.
- Clients must embed operations in bamboo entries to publish them.
- Clients can create a [document](/specification/data-types/documents#documents) by publishing a CREATE operation.
- Clients can update a document by publishing an _update operation_.
  - Every _update operation_ leads to a new _document view_ of the document that is being updated.
- Clients can delete a document by publishing a _delete operation_.
- Nodes can [reduce](/specification/data-types/materialization#reduction) operations to produce a specific _document view_ of their document.
- Clients can delete a document by publishing a _delete operation_.

:::note Requirement OP12

Nodes MUST delete all operations of a document once it has been deleted. (_note: this should probably go into the documents section_).

:::

[cbor]: https://cbor.io/
[snake_case]: https://en.wikipedia.org/wiki/Snake_case
