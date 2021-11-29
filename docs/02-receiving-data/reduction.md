---
sidebar_position: 2
---

# Reduction

- reduction is the process of creating an _instance_ from a _document_ (c.f. [documents and instances](/docs/receiving-data/documents-instances))

## Algorithm

- preprocess the document graph by applying topological sorting to linearise the operation graph

1. Deserialise all fields of the document's _create operation_ to produce an _instance_
2. If the next operation in the document is an _update operation_
   - for every field in the operation
     - overwrite this field's contents on the instance with the contents from the operation
3. If the next operation in the document is a _delete operation_
   - remove the content on all fields of the instance
   - mark the instance deleted
4. Stop reduction if there is no next known operation in the document
5. Continue with step 2. otherwise
