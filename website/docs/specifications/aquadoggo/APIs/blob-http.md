---
id: blob-http
title: Blob HTTP service
---

This document describes how Blobs are materialized to the filesystem and served from a node over HTTP endpoints.

## Materialization

- When a `blob_v1` document and all it's `blob_piece_v1` pieces are present on a node it can be materialized and served to client applications over a HTTP endpoint
- Unlike other documents which are materialized into tables in a database, blobs are materialized directly on the filesystem
- Even if all pieces are present, a blob is only materialized when it is referenced in a relation field by another document
- As these relations can be either _pinned_ or _unpinned_ we support materializing a blob by both it's document id and document view id
    - When a blob is referenced in a `relation` or `relation_list` field then it should be materialized to it's latest view
    - When a blob is referenced in a `pinned_relation` or `pinned_relation_list` field it should be materialized to the requested view id
    - Once the correct view id has been established, a blob should be materialized by collecting all it's `blob_piece_v1` documents, concatenating them, and storing them on the filesystem at the following path: `/blob/<DOCUMENT_ID>/<DOCUMENT_VIEW_ID>`

## Serving over HTTP

- A static file HTTP server should watch the blob directory and serve all files via an HTTP endpoint like so: `https://myaquadoggo.net/blob/<DOCUMENT_ID>/<DOCUMENT_VIEW_ID>`
- Additionally, in order to support serving documents by their document id, the HTTP service should forward requests arriving at `https://myaquadoggo.net/blob/<DOCUMENT_ID>` to the location of the documents latest materialized view
