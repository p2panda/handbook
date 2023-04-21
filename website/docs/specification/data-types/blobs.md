---
id: blobs
title: Blobs
---

The blob specification describes system [schemas][schemas] and validation conditions used when publishing binary application data. Blobs require their own materialization logic and these system [schemas][schemas] allow a node to distinguish blob [documents][documents] from other application data and behave accordingly. Conceptually, blobs can be considered to be "attachments" on other [documents][documents]. It is not intended that blobs alone serve as a general purpose content delivery system. We expect blobs to be attached to other [documents][documents] via relation fields, replication and materialization logic can be optimized based on this assumption. See the [blob http specification][blob-http] to read how blobs are materialized and served on a node.

## System schemas

### `blob_v1`

`length`: length of file in bytes (u64)  
`mime_type` IANA mime-type (string)  
`pieces`: list of pieces which make up this blob (pinned relation list of `blob_piece_v1`)  

#### Validation

- the claimed `length` of a `blob_v1` document should be validated on publishing
    - this can be done by collecting all claimed pieces and calculating total length
    - OR only validating that each `blob_piece_v1` is the correct length and then validating the `length` value by checking the number of items in the `pieces` list
- the claimed `mime_type` should be validated
- validating blob pieces differs if they arrive through `publish` and via `replication`
    - `publish`: all blob pieces should already exist before publishing the `blob`
    - `replication`: a `blob` must exist with a relation to the `pieces` before the pieces are accepted. This means we don't accept arbitrary blob data until we know the blob hash id, as we may want to choose to lazy load a blob's actual data.
- if a validation step fails, an error should be returned to the client and _all related `blob_piece_v1` and the `blob_v1` entries should be deleted_

### `blob_piece_v1`

`data`: bytes contained in this blob piece

#### Validation

- all blob pieces must be of maximum 256KB size

## Notes on Storage

- `blob_v1` and `blob_piece_v1` data is persisted on a node
- materialization logic differs from other documents, see the [blob http specification][blob-http] to read more 

## Notes on Replication

- Nodes can choose to ignore blobs when they exceed certain minimum or maximum length requirements or have unsupported mime types
- Nodes can choose to only replicate blob pieces when there is at least one relation to the blob itself from other documents

[schemas]: /specification/data-types/schemas
[documents]: /specification/data-types/documents
[blob-http]: /specification/APIs/blob-http
