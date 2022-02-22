---
id: queries
---

# Queries

- clients send _queries_ to nodes in order to publish new entries and query materialised instances
- queries are sent as [JSON RPC 2.0][json_rpc] requests
- requests described on this page are implemented as part of [Aquadoggo][aquadoggo]
- refer to the [p2panda RPC interface][p2panda_openrpc] for a full specification of requests and responses

## Use Cases

- clients can publish entries
    - before that, clients can retrieve parameters required for encoding entries
- clients can retrieve materialised instances of a given schema
    - _instances can be filtered by individual fields_
    - _linked documents can be retrieved_
    - _instances can be sorted by arbitrary fields_
    - _instances can be sorted by self-referential orderings_

## Publishing Entries

- clients use two RPC methods for publishing entries:
    1. `panda_getEntryArguments` to retrieve parameters required for encoding an entry
    2. `panda_publishEntry` to publish a signed and encoded entry

### `panda_getEntryArguments`

- returns parameters required for encoding new entries
    - no side effects
- clients can't encode new entries without information from this endpoint because every entry needs to place itself in the first unused sequence number of a specific [_bamboo log_][encoding] and also it needs to include the hashes of specific previous entries in its encoding
    - this information is held by the node
- clients may cache the arguments required for the next entry (they are also returned by `panda_publishEntry`)

### `panda_publishEntry`

- publishes the entry supplied with the request
- returns entry arguments required for publishing the next entry for the same document

## Accessing Instances

### `panda_queryEntries`

- returns entries of a given schema
    - no side effects


[aquadoggo]: https://github.com/p2panda/aquadoggo
[encoding]: /docs/writing-data/bamboo
[json_rpc]: https://en.wikipedia.org/wiki/JSON-RPC
[p2panda_openrpc]: https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/p2panda/p2panda/main/p2panda-js/openrpc.json
