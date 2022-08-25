---
id: apis-overview
title: Overview
---

- clients send _queries_ to nodes in order to publish new entries and query materialised documents
- queries are sent via HTTP using the [GraphQL][graphql] language
- serving a GraphQL API and handling requests is implemented in [nodes][nodes], for example [Aquadoggo][aquadoggo]
- nodes use the same GraphQL API to talk to each other, you can read more about it under [replication][replication]
- large numbers are encoded as strings in the payloads (`logId` and `seqNum`) to account for the lack of support to represent u64 integers in JSON

## Client API (publishing & queries)

- the client api is the interface for communication between [node and client][nodes]
- clients can publish entries
  - before that, clients can retrieve parameters required for encoding entries if they can't compute them independently
- clients can retrieve materialised [documents][documents] of a given schema
  - documents can be filtered by individual fields
  - linked documents can be retrieved
  - documents can be sorted by arbitrary fields
  - documents can be sorted by self-referential orderings
  - documents can be queried by `document_view_id` in order to receive a [documents][view] onto it's data at a specific materialised state

## Replication API

- this api consists of GraphQL queries for other nodes to ask about the state of bamboo logs, entries and payloads
  - these queries are enough to build a flexible replication protocol on top
- nodes need to implement the API specifications to make sure they are compatible with all other node and client implementations. The Node API is specified here, the Client API is further specified under [queries][queries], both APIs reside inside nodes

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
