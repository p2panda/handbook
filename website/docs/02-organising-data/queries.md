---
sidebar_position: 4
---

# Queries

- in order to access data from instances, clients send _queries_ to nodes and receive the queried information back
- queries are sent as [JSON RPC 2.0](json_rpc) requests

## Use cases

- clients can publish entries
    - before that, clients can retrieve parameters required for encoding entries
- clients can retrieve materialised instances of a given schema
    - _instances can be filtered by individual fields_
    - _linked documents can be retrieved_
    - _instances can be sorted by arbitrary fields_
    - _instances can be sorted by self-referential orderings_


[json_rpc]: https://en.wikipedia.org/wiki/JSON-RPC