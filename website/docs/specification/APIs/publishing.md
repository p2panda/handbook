---
id: publishing
title: Publishing
---

- Clients use two GraphQL operations for publishing entries:
  1. [`nextArgs`](#nextargs) query to retrieve parameters required for encoding an entry
  2. [`publish`](#publish) mutation to publish a signed and encoded entry together with its payload

## `nextArgs`

- Returns parameters required for encoding new entries
  - Implementations must not have side effects
- Clients can't encode new entries without information from this endpoint because every entry needs to place itself in the first unused sequence number of a specific [_Bamboo log_][bamboo] and also it needs to include the hashes of specific previous entries in its encoding
  - This information is held by the node
- Clients may cache the arguments required for the next entry (they are also returned by `publish`)
- Clients may also persist their entry logs locally to avoid any dependency for retrieving entry arguments of nodes at all
- Clients must set the `viewId` input variable to receive arguments for encoding an `UPDATE` or `DELETE` operation.
  - Clients must not set this when they want to encode a `CREATE` operation

```graphql
query nextArgs(
  """
  public key of the author signing and encoding the next entry
  """
  publicKey: PublicKey!

  """
  any view id from the document that will be updated or deleted with the next entry. leave empty to receive arguments for creating a new document.
  """
  viewId: ViewId
): NextArguments!
```

## `publish`

- If a `publish` request is accepted by a node it must publish the entry supplied with the request by taking the following steps:
  - The node must validate the received entry and operation by checking if:
    - The entry adheres to the [bamboo specification][bamboo] and has a valid signature and log integrity
    - The operation adheres to the [operation specification][operations]
    - The operation is linked to the entry with a correct payload hash and size
  - The node should persist the entry and operation and make it available to other nodes via [replication][replication]
  - The node may [materialise][reduction] the document this new operation belongs to, resulting in a new document view
- Returns entry arguments required for publishing the next entry for the same document, similar to `nextArgs`
- Returns an error
  - When the Bamboo log, signature or document integrity could not be verified, the operation was malformed or schema not fulfilled
  - When the node is unable to persist the entry and operation at the moment

```graphql
mutation publish(
  """
  CBOR representation of a signed Bamboo entry, encoded as a hexadecimal string
  """
  entry: EncodedEntry!

  """
  CBOR representation of an p2panda operation, the payload of the Bamboo entry,
  encoded as a hexadecimal string
  """
  operation: EncodedOperation!
): NextArguments!
```

## Response

- Both `publish` and `nextArgs` return the arguments for encoding and signing the next entry as a response

```graphql
type NextArguments {
  """
  log id to be used to forge the next entry
  """
  logId: LogId!
  
  """
  sequence number to be used to forge the next entry
  """
  seqNum: SeqNum!
  
  """
  optional backlink hash to be used to forge the next entry
  """
  backlink: EntryHash
  
  """
  optional skiplink hash to be used to forge the next entry
  """
  skiplink: EntryHash
}
```

[aquadoggo]: https://github.com/p2panda/aquadoggo
[bamboo]: /specification/data-types/bamboo
[connection-specification]: https://relay.dev/graphql/connections.htm
[documents]: /specification/data-types/documents
[graphql]: https://graphql.org/
[latest-document-view]: /specification/data-types/documents#the-latest-document-view
[nodes]: /specification/networking/clients-nodes
[operations]: /specification/data-types/operations
[pagination-specification]: https://graphql.org/learn/pagination/#pagination-and-edges
[reduction]: /specification/data-types/documents#reduction
[replication]: /specification/APIs/replication
[self-referential-relation]: /specification/data-types/schemas#relation-fields
