---
sidebar_position: 1
---

# Documents and Instances

- documents and instances are sets of operations that operate on the same data

## Documents

- a document is the graph of [operations](/docs/writing-data/operations) that is constructed by starting with a _create operation_ as its root and exhaustively connecting all known _update_ and _delete operations_ that point at leafs of this graph
- a document is identified by the hash of the encoding of its create operation
  - this hash is also called the _document id_
- a document assumes the schema of its _create operation_
  - this is the _document schema_
- all operations in the document MUST have the _document schema_
- operations in the document can have any _operation version_

## Instances

- an _instance_ is the result of applying a series of operations from a _document_
  - the series of operations must start with the document's _create operation_
  - see [reduction](/docs/writing-data/reduction) and [reconciliation](/docs/collaboration/reconciliation) for further details
- an instance is identified by the _operation id_ of the last operation that was applied to produce it
- an instance has a value for all fields that are defined by its document's schema
- an instance is _deleted_ if its document contains a _delete operation_
