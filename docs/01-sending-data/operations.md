---
sidebar_position: 4
---

# Operations

- operations encode data changes
- operations are published as the payload of _bamboo entries_
- operations are identified by the hash of their bamboo entry
  - this is referred to as the _operation id_
- every operation MUST have an _operation type_, which must be one of
  - `CREATE` - results in a _create operation_
  - `UPDATE` - results in a _update operation_
  - `DELETE` - results in a _delete operation_
- every operation MUST have a [schema](/docs/sending-data/schemas)
- every operation has an [author](/docs/sending-data/key-pairs), which is encoded in the operation's _entry_
- every operation MUST have an _operation version_
  - it describes the version of the operation specification that is followed by that operation
  - versions are encoded as integers
- every _delete_ and _update operation_ MUST have a _previous operation_
  - it identifies the [instance](/docs/receiving-data/documents-instances#instances) that is being updated or deleted
  - the previous operation MUST be the latest known operation of the [document](/docs/receiving-data/documents-instances#documents) that is being adressed
- a _create operation_ MUST NOT have a _previous operation_

## Fields

- a _create operation_ MUST contain all fields of the operation's schema
- an _update operation_ MAY contain any combination of fields from the operation's schema
- a _delete operation_ MUST NOT contain any fields

## Usage

- clients can use operations to publish data changes
- clients must embed operations in bamboo entries to publish them
- clients can create a [document](/docs/receiving-data/documents-instances#documents) by publishing a _create operation_
- clients can update an [instance](/docs/receiving-data/documents-instances#instances) by publishing a _update operation_
  - every _update operation_ leads to a new _instance_ of the document that is being updated
- clients can delete a [document](/docs/receiving-data/documents-instances#documents) by publishing a _delete operation_
- nodes can [reduce](/docs/receiving-data/reduction) operations to produce an _instance_
- nodes can delete operations once their document has been _tombstoned_
  - a document is tombstoned when it contains a _delete operation_

## Encoding

- tbd
