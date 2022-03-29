---
id: documents
---

# Documents and Document Views

- _documents_ identify mutable pieces of data
  - some things that may be a document in p2panda: a blog post, a wiki page, a chat message, a user account, a configuration setting
- _document views_ represent the state of a document at a particular point in its history of edits
  - every change of a document results in a new document view

## Documents

- a document is the graph of [operations](/docs/writing-data/operations) that is constructed by starting with a _create operation_ as its root and exhaustively connecting all known _update_ and _delete operations_ that point at leafs of this graph
- a document is identified by the operation id of its create operation
  - this is also called the _document id_
- a document assumes the schema of its _create operation_
  - this is the _document schema_
- all operations in the document MUST match the _document schema_
- operations in the document can have any _operation version_

## Document Views

- a _document view_ is the result of applying a series of operations from a _document_
  - the series of operations must start with the document's _create operation_
  - see [reduction](/docs/organising-data/reduction) and [reconciliation](/docs/collaboration/reconciliation) for further details
- a document view is identified by its set of graph tips: the _document view id_
  - each graph tip is represented as an _operation id_
  - it's possible to replicate the exact state of a document from the document view id
  - the document view id grows unbounded with the number of unmerged graph tips
  - if a limited size identifier is required, the document view's _hash id_ can be used
    - to construct the hash id sort the graph tips of a document view id, concatenate their byte values and hash the result using YASMF.
- a document view has a value for all fields that are defined by its document's schema
- a document view is _deleted_ if its document contains a _delete operation_
