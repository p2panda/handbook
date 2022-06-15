---
id: clients-nodes
---

# Clients and Nodes

- p2panda has a clear separation of clients and nodes to allow flexible setups and make client development easier
  - nodes do the heavy lifting, they exist to allow clients to be lightweight, easier to implement and potentially running in a browser
- client and node can be integrated in a single software package or run separate from each other - even on different machines
  - one way to integrate node and client is as a [Tauri](tauri) application, something that is supported by [aquadoggo][aquadoggo]
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
- nodes offer a [GraphQL][queries] that is used by clients and other nodes to connect and exchange data

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
[key_groups]: /docs/collaboration/key-groups
[p2panda]: https://github.com/p2panda/p2panda
[queries]: /docs/organising-data/queries
[tauri]: https://tauri.studio/
