---
---

# Materialization

## Reduction

- reduction is the process of creating an _document view_ from a _document_ (c.f. [documents and views](/docs/organising-data/documents))
- it is a CRDT (conflict resistant data type)

## Algorithm

### 1. Sort operation graph

- preprocess the document graph by applying topological sorting (depth first) to linearise the operation graph
  - sorting the graph needs to be deterministic, with the path chosen to walk first being decided by a `>` comparison between the operation ids of each node ("larger" hash wins)

### 2. Reduction

- iterate over sorted list by applying the following rules:

  1. Deserialise all fields of the document's _create operation_ to produce an _document view_
  2. If the next operation in the document is an _update operation_
     - for every field in the operation
       - overwrite this field's contents on the view with the contents from the operation
  3. If the next operation in the document is a _delete operation_
     - remove the content on all fields of the view
     - mark the view deleted
  4. Stop reduction if there is no next known operation in the document
  5. Continue with step 2. otherwise

## Reconciliation

- Reconciliation is the process of resolving sequences of changes made by multiple key pairs to the same document into a final datum
- p2panda is recording _causal information_ as part of operations in order to make reconciliation effective
    - practically, [operations][operations] specify the document view that was available to their author at the time of creating the operation
    - p2panda doesn't have access to reliable information on the point in time that edits were made in, which would usually be used to reconcile sequences of edits
- See the [draft document spec](https://laub.liebechaos.org/wYzMa0w8S12iYvQommrdrA) for implementation details
