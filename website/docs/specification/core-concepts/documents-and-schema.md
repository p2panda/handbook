---
id: documents-and-schema
title: Documents & Schema
---

## Documents

[Documents][documents] are mutable data items which live on a p2panda network. Authors can create, update and delete documents. A document might be a blog post, a wiki page, a chat message, a user account, a configuration setting, a game board. They are multi-writer capable and have in-built properties which deterministically reslove confilicting writes.

[Nodes][nodes] are responsible for persisting documents and offering them on a public API so they can be queried by clients. They also offer the public API for all write actions relating to documents.

Documents can be assigned to an identity, giving them a concept of [permissions][permissions], with the ability to add and remove other identities over the life of a document. [Encryption][encryption] is available via the use of `MLS` encryption.

## Schema

[Schema][schemas] specify the fields and values a document contains. When a document is published or updated, the request must be checked against the claimed schema. If it doesn't pass validation then the request will be rejected. This ensures all data on a p2panda network strictly follows a known schema. An application developer would publish their own schema based on the data required for their needs, or they could re-use schema already existing on their network.

[documents]: /specification/data-types/documents
[schemas]: /specification/data-types/schemas
[nodes]: /specification/networking/clients-nodes
[encryption]: /specification/core-concepts/encryption
[permissions]: /specification/core-concepts/permissions
