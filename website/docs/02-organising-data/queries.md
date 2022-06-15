---
id: queries
---

# Queries

- clients send _queries_ to nodes in order to publish new entries and query materialised documents
- queries are sent via HTTP using the [GraphQL][graphql] language
- serving a GraphQL API and handling requests is implemented in [nodes][nodes], for example [Aquadoggo][aquadoggo]
- nodes use the same GraphQL API to talk to each other, you can read more about it under [replication][replication]

## Client API

- clients can publish entries
    - before that, clients can retrieve parameters required for encoding entries if they can't compute them independently
- clients can retrieve materialised documents and document views of a given schema
    - _documents can be filtered by individual fields_
    - _linked documents can be retrieved_
    - _documents can be sorted by arbitrary fields_
    - _documents can be sorted by self-referential orderings_

### Publishing Entries

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

### Querying documents and document views

### `panda_queryEntries`

- returns entries of a given schema
    - no side effects

[aquadoggo]: https://github.com/p2panda/aquadoggo
[encoding]: /docs/writing-data/bamboo
[graphql]: https://graphql.org/
[nodes]: /docs/writing-data/clients-nodes
[replication]: /docs/networking/replication
