---
id: blob-http
title: Blob HTTP service
---

This document describes how `blobs` are materialized to the filesystem and served from a node over `http` endpoints.

## Materialization

- when a `blob_v1` document and all it's `blob_piece_v1` pieces are present on a node it can be materialized and served to client applications over a `http` endpoint
- unlike other documents which are materialized into tables in a database, blobs are materialized on the filesystem
- even if all pieces are present, a blob is only materialized when it is referenced in a relation field by another document
- as these relations can be either _pinned_ or _unpinned_ we support materializing a blob by both it's document id and document view id
    - when a blob is referenced in a `relation` or `relation_list` field then it should be materialized to it's latest view
    - when a blob is referenced in a `pinned_relation` or `pinned_relation_list` field it should be materialized to the requested view id
    - once the correct view id has been established, a blob should be materialized by collecting all it's `blob_piece_v1` documents, concatenating them, and storing them on the filesystem at the following path: `/blob/<DOCUMENT_ID>/<DOCUMENT_VIEW_ID>`

## Serving over `HTTP`
- a http static file server should watch the blob directory and serve all files via an http endpoint like so: `https://myaquadoggo.net/blob/<DOCUMENT_ID>/<DOCUMENT_VIEW_ID>`
- additionally, in order to support serving documents by their `document_id` the http service should forward requests arriving at `https://myaquadoggo.net/blob/<DOCUMENT_ID>` to the location of the documents latest materialized view
