---
id: clients-nodes
title: Clients and nodes
---

- p2panda has a clear separation of clients and nodes to allow flexible setups and make client development easier
  - nodes do the heavy lifting, they exist to allow clients to be lightweight, easier to implement and potentially running in a browser
- client and node can be integrated in a single software package or run separate from each other - even on different machines
  - one way to integrate node and client is as a [Tauri][tauri] application, something that is supported by [aquadoggo][aquadoggo]
- both nodes and clients are built on the same [p2panda][p2panda] library that defines shared data structures
- every key pair is bound to exactly one client and exactly one node
  - a key pair MUST NOT publish data through any client other than the one it was created with
  - a key pair MUST NOT publish data on any node other than the one it was first used with
  - disregard of this rule carries the risk of creating forks within a public key's logs. see [Key Groups][key_groups] for a way to publish data from multiple devices without copying a private key or changing the node used.

## Nodes

- nodes are computer programs that
  - awaits signed operations from clients
  - verifies the consistency, format and signature of operations and rejects invalid ones
  - stores operations of the network in a database
  - materializes document views on top of the known operations
  - answers filterable and paginated data queries
  - discovers other nodes in local network and internet
  - replicates data with other nodes
- a node can run in different settings which allows it to work offline or online
  - inside an application on the user's computer
    - a dedicated node for only this particular client
    - this allows running a node as a backend, while the frontend can be a web-view, realized with [Tauri][tauri]
  - on a dedicated server which is always online
    - this allows using p2panda from a browser without installing software
    - a node hosted online can be used by many clients (federation)
  - as a daemon on a user's computer
    - multiple p2panda clients could talk to one node on the same computer
- [aquadoggo][aquadoggo] is the reference node implementation
- nodes offer a GraphQL API that is used by [clients][queries] and other [nodes][replication] to connect and exchange data

:::caution Requirement NO1

Entries arriving via the [publish][publishing] and [replication][replication] APIs MUST be validated against BA1

:::

:::caution Requirement NO2

Operations arriving via the [publish][publishing] and [replication][replication] APIs MUST be validated against all OP requirements

:::

:::caution Requirement NO3

Operations arriving via the [publish][publishing] APIs SHOULD be validated against DO1 - D03

:::

:::info Node Validation Behaviour

Although NO1 and NO2 must be fulfilled by a node for all entries arriving via the public APIs, the ablity to perform this validation and the expected behaviour will differ depending on whether the entry arrives via the [publish][publishing] or [replication][replication] APIs. In the case of the former, all requirements should be validated on arrival against existing entries & operations known to this node, and in the case of a validation failure the entry should be rejected. Where entries are arriving via replication, it may not be possible to immediately perform validation because required data may not have arrived at the node yet.

:::

## Clients

- clients are computer programs that use the p2panda library to
  - create key pairs
  - sign and encode new data and send it to a node
  - query a node for existing data to make it available to its users
- clients create key pairs for their users and never transfer private keys out
  - only clients have access to users' private keys
- have a look at the [beep-boop][beep_boop] chat demo for an example of a client

[aquadoggo]: https://github.com/p2panda/aquadoggo
[beep_boop]: https://github.com/p2panda/beep-boop
[key_groups]: /specification/core-concepts/permissions
[p2panda]: https://github.com/p2panda/p2panda
[queries]: /specification/APIs/queries
[replication]: /specification/APIs/replication
[publishing]: /specification/APIs/publishing
[tauri]: https://tauri.studio/
