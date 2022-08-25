---
id: documents
title: Documents
---

- A Document is a high-level mutable, multi-writer data type constructed from a linked graph of [operations](/specification/data-types/operations).
- Through a deterministic process the graph can be reduced to a single key-value map.
- Any two documents (replicas) which contain the same collection of operations will resolve to the same value.
- A document is identified by the operation id of its root _create operation_ (aka _document_id_).
- A document assumes the schema of its root _create operation_
- A document is made up of operations published by one or many authors
  - Branches in a document's graph occur when two authors publish operations concurrently
- Every operation has a `previous` field containing a `document_view_id` which refers to document state _at the moment the operation was encoded_
  - These `previous` references make up the edges in a graph, the operations being the nodes.
  - The graph describes the causal relationship between all operations in a document.

:::info Fun fact
Some things that may be a document in p2panda: a blog post, a wiki page, a chat message, a user account, a configuration setting, a game board.
:::

:::note Requirement DO1

A document MUST contain exactly one _create_operation_.  
A document's operation graph MUST NOT contain any cycles.  
A document MUST NOT contain an operation who's `previous` refers to an operation not present in the documet's graph.

:::

## Viewing a document

- When viewing documents, it's state must be reduced to a single key-value map, this process involves two steps:

:::info Definition: Materialisation
Although here we describe the resolving an operation graph as a property of the data type _document_ it can also be seen as the process of _materialisation_. This is a term borrowed from database terminology, where views on data can be materialised into virtual tables. This is a useful concept in p2panda and one that is used often.  
:::

### 1. Reconciliation

- The first step we take is to sort and linearise the document's graph of operations deterministically.
- We do this by applying a topological depth-first sorting algorithm which meets the following requirements:

:::note Requirement DO2

Sorting MUST start from the documents CREATE operation.  
An operation which refers to the current operation in it's `previous` field MUST be sorted next.  
If multiple operations refer to the current, the one with the lowest `document_id` MUST be sorted next.  
All operations in the graph MUST be sorted exactly once.  
When visiting a branch, all operations it contains MUST be visited and sorted before continuing to the rest of the graph.

:::

### 2. Reduction

- The second and final step is to reduce the linearlised list of operations into a single key-value map by applying the following rules:

  1. Deserialise all fields of the document's _create operation_ to produce a _document view_
  2. If the next operation in the document is an _update operation_
     - for every field in the operation
       - overwrite this field's contents on the view with the contents from the operation
  3. If the next operation in the document is a _delete operation_
     - remove the content on all fields of the view
     - mark the view delete
     - stop reduction here
  4. Stop reduction if there is no next known operation in the document
  5. Continue with step 2. otherwise
