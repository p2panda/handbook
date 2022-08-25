---
id: materialization
title: Materialization
---

- the process of materialization takes in a `document` and produces a single readable `document_view`
  - these views can either be the current document state, or a specific state from the past refered to by it's `document_view_id`
- materialization can be described into two discreet steps: reconciliation & reduction

## 1. Reconciliation

- a document is made up of operations published by one or many authors
  - a fork in the graph occurs if two authors publish operations concurrently
- every operation has a `previous` field containing a `document_view_id` which refers to document state _at the moment it was published_
  - these `previous` references make up the edges in a graph, the operations being the nodes
  - this graph can be said to trace the causal relation between all operations in a document
- the first step we take in materializing a document is to sort and linearise it's graph of operations deterministically
- we do this by applying a topological depth-first sorting algorithm:
  - sorting MUST start from the documents CREATE operation
  - an operation which refers to the current operation in it's `previous` field MUST be visited next
  - if multiple operations refer to the current, the one with a `<` `document_id` MUST be visited next
  - when visiting a branch, all operations it contains must be visited and sorted before continuing to the rest of the graph
  - ANY operation which references a `document_view_id` not present in this graph MUST not be visited

## 2. Reduction

- iterate over sorted list by applying the following rules:

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