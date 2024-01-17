---
id: overview
title: Overview
---

- Clients send _queries_ to nodes in order to publish new entries and query materialised documents
- Queries are sent via HTTP using the [GraphQL][graphql] language
- Serving a GraphQL API and handling requests is implemented in [nodes][nodes], for example [Aquadoggo][aquadoggo]
- Large numbers are encoded as strings in the payloads (`logId` and `seqNum`) to account for the lack of support to represent u64 integers in JSON

## Client API (publishing & queries)

- The client api is the interface for communication between [node and client][nodes]
- Clients can publish entries
  - Before that, clients can retrieve parameters required for encoding entries if they can't compute them independently
- Clients can retrieve materialised [documents][documents] of a given schema
  - Documents can be filtered by individual fields
  - Linked documents can be retrieved
  - Documents can be sorted by arbitrary fields
  - Documents can be sorted by self-referential orderings
  - Documents can be queried by `document_view_id` in order to receive a [documents][view] onto its data at a specific materialised state

[aquadoggo]: https://github.com/p2panda/aquadoggo
[bamboo]: /specifications/aquadoggo/data-types/bamboo
[connection-specifications/aquadoggo]: https://relay.dev/graphql/connections.htm
[documents]: /specifications/aquadoggo/data-types/documents
[graphql]: https://graphql.org/
[latest-document-view]: /specifications/aquadoggo/data-types/documents
[nodes]: /specifications/aquadoggo/networking/clients-nodes
[operations]: /specifications/aquadoggo/data-types/operations
[pagination-specifications/aquadoggo]: https://graphql.org/learn/pagination/#pagination-and-edges
[reduction]: /specifications/aquadoggo/data-types/documents
[self-referential-relation]: /specifications/aquadoggo/data-types/schemas#relation-fields
