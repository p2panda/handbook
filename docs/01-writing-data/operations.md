---
sidebar_position: 4
---

# Operations

- operations encode data changes
- every operation has an _operation type_, which must be one of
  - `CREATE` results in a _create operation_
  - `UPDATE` results in a _update operation_
  - `DELETE` results in a _delete operation_
- every operation has a [schema](/docs/writing-data/schemas)
- every operation has an [author](/docs/writing-data/key-pairs)
- every operation has an _operation version_
  - it describes the version of the operation specification that is followed by that operation
  - versions are encoded as integers

## Usage

- clients can use operations to publish data changes
- clients must embed operations in bamboo entries to publish them
- clients can create a [document](/docs/reading-data/documents-instances) by publishing a _create operation_
- clients can update an [instance](/docs/reading-data/documents-instances) by publishing a _update operation_
  - every _update operation_ leads to a new _instance_ of the document that is being updated
- clients can delete a [document](/docs/reading-data/documents-instances) by publishing a _delete operation_
- nodes can [reduce](/docs/reading-data/reduction) operations to produce an _instance_
- nodes can delete operations once their document has been _tombstoned_
  - a document is tombstoned when it contains a _delete operation_
