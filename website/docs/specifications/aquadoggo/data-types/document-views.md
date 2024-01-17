---
id: document-views
title: Document views
---

- _Document views_ represent the immutable state of a document at a particular point in its history of edits
  - Every change of a document results in a new document view
- A _document view_ is the result of applying a series of operations from a _document_
  - See [reduction][reduction] and [reconciliation][reconciliation] for further details
- A document view has a value for all fields that are defined by its document's schema unless the document has been deleted

:::info Factoid: Latest document view

The most common document view you will encounter is the current state of a document. If you query a document by its id, this is what you will get, and you won't think about document views all that much. However, the immutable nature of document views, and the ability to refer to them by their document view id are extremely useful properties which make things like _pinned relations_ possible .  

:::

## Document view id

- A document view is identified by its set of graph tips: the _document view id_
  - Each graph tip is represented as an _operation id_
  - It's possible to replicate the exact state of a document from the document view id
  - The document view id grows unbounded with the number of unmerged graph tips
  - If a limited size identifier is required, the document view's _hash id_ can be used
    - To construct the hash id sort the graph tips of a document view id, concatenate their byte values and hash the result using YASMF.

:::caution Requirement DV1

Following Requirement EN2, operations in a document view id MUST be lexicographically sorted and de-duplicated before encoding and when generating a _hash id_.

:::

:::caution Requirement DV2

All operations referenced in a document view id must originate from the same document.

:::

## The Latest Document View

- It is defined as that document view which incorporates all valid operations that are known to the node and part of the document
- As two nodes in the p2panda network may not share knowledge of the same operations, the latest document view may differ from node to node

[reconciliation]: /specifications/aquadoggo/data-types/documents
[reduction]: /specifications/aquadoggo/data-types/documents
