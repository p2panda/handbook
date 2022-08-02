---
id: operations
---

# Operations

- operations represent data changes
- operations are published as the payload of _bamboo entries_
- operations are identified by the hash of their bamboo entry
  - this is referred to as the _operation id_
- every operation is associated with a [bamboo author](/docs/writing-data/key-pairs), which is encoded in the operation's _entry_
- every operation MUST have an _operation type_, which must be one of
  - `CREATE` - results in a _create operation_
  - `UPDATE` - results in a _update operation_
  - `DELETE` - results in a _delete operation_
- every operation MUST have a [schema](/docs/writing-data/schemas)
- every operation MUST have an _operation version_
  - it describes the version of the operation specification that is followed by that operation
  - versions are encoded as integers
- every _delete_ and _update operation_ MUST have _previous operations_ with `length > 0`
  - it contains an array of _operation_id_'s which identify the tip operation of any un-merged branches in this document graph
  - in the case where a graph has no un-merged branches, this array will contain only one id (the resolved graph tip)
  - publishing an operation which identifies more than 1 graph tip, effectively merges these branches into one
- a _create operation_ MUST not have _previous operations_

## Fields

- a _create operation_ MUST contain all fields of the operation's schema
- an _update operation_ MAY contain any combination of fields from the operation's schema
- a _delete operation_ MUST NOT contain any fields

## Serialisation

- operations are serialised using [CBOR][cbor]
- all fields are serialised using [snake case][snake_case]
- all array values and map keys must be serialised in sorted order unless their order is semantic
  - all operations that have values or map keys which are not sorted even though their order has no semantic meaning are invalid

## Usage

- clients can use operations to publish data changes
- clients must embed operations in bamboo entries to publish them
- clients can create a [document](/docs/organising-data/documents#documents) by publishing a _create operation_
- clients can update a document by publishing an _update operation_
  - every _update operation_ leads to a new _document view_ of the document that is being updated
- clients can delete a document by publishing a _delete operation_
- nodes can [reduce](/docs/organising-data/reduction) operations to produce a specific _document view_ of their document
- clients can delete a document by publishing a _delete operation_ 
  - nodes MUST delete all operations of a document once it has been deleted

[cbor]: https://cbor.io/
[snake_case]: https://en.wikipedia.org/wiki/Snake_case
