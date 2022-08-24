---
id: operations
title: Operations
---

- Operations represent atomic data changes.
- Operations are published as the payload of _bamboo entries_.
- Operations are identified by the hash of their bamboo entry.

:::info Definition: Operation ID

The _operation id_ uniquely identifies an operation. It is equal to the hash of the Bamboo entry that has the operation as its payload.

:::

## Encoding

:::note Requirement OP1

Operations MUST be encoded using hexadecimal encoded CBOR.

:::

- CBOR is a binary encoding that is used to encode the contents of an operation and produce bytes that can be associated with a Bamboo entry, stored, and sent over a network connection.

:::note Requirement OP2

An operation must be encoded as a CBOR array containing the following items in this exact order:

1. Version
2. Action
3. Schema
4. Previous (optional)
5. Fields (optional)

:::

## Operation Action

- The operation action defines the kind of data change that is described by the operation.

:::note Requirement OP2

An operation MUST have an operation action. An operation action MUST be one of `CREATE`, `UPDATE`, `DELETE`.

:::

- Every operation action results in a different kind of operation:
  - `CREATE` - results in a _create operation_
  - `UPDATE` - results in a _update operation_
  - `DELETE` - results in a _delete operation_

## Operation Schema

:::note Requirement OP3

Every operation MUST have a schema.

:::

- The schema of an operation may define additional requirements for the operation.
  - See the [schema](/specification/data-types/schemas) section for more details.

## Operation Version

:::note Requirement OP6

Every operation MUST have an _operation version_. An operation version MUST be a positive integer number. An operation version MUST NOT be larger than 256.

:::

- The operation version is set according to the version of the p2panda specification that is followed by that operation.

## Previous Operations

:::note Requirement OP7

Every _update operation_ and every _delete operation_ MUST have _previous operations_. The previous operations of an operation MUST contain all _graph tips_ of the operation's document.

:::

- _Previous operations_ specify where an operation should be placed when constructing the graph of operations required to materialise a document.
  - It contains an array of _operation_id_'s which identify the tip operation of any un-merged branches in a document graph.
  - On the case where a graph has no un-merged branches, this array will contain only one id (the resolved graph tip).
  - Publishing an operation which identifies more than one graph tip effectively merges these branches into one.

:::note Requirement OP8

A create operation MUST NOT have _previous operations_.

:::

## Fields

- _Operation fields_ contain the actual data carried by an operation.
- Depending on the operation's type and schema, different requirements exist for which data must be contained in the operation.

:::note Requirement OP9

A _create operation_ MUST contain all fields defined by the operation's _operation schema_.

:::

:::note Requirement OP10

An _update operation_ MAY contain any combination of fields from the operation's _operation schema_.

:::

:::note Requirement OP11

A _delete operation_ MUST NOT contain any fields.

:::

## Usage

- Clients can use operations to publish data changes.
- Clients must embed operations in bamboo entries to publish them.
- Clients can create a [document](/specification/data-types/documents#documents) by publishing a _create operation_.
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
