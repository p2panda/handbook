---
id: reduction
---

# Reduction

- reduction is the process of creating an _document view_ from a _document_ (c.f. [documents and views](/docs/organising-data/documents))

## Algorithm

- preprocess the document graph by applying topological sorting to linearise the operation graph

1. Deserialise all fields of the document's _create operation_ to produce an _document view_
2. If the next operation in the document is an _update operation_
   - for every field in the operation
     - overwrite this field's contents on the view with the contents from the operation
3. If the next operation in the document is a _delete operation_
   - remove the content on all fields of the view
   - mark the view deleted
4. Stop reduction if there is no next known operation in the document
5. Continue with step 2. otherwise
