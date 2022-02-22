---
id: clients-nodes
---

# Clients and Nodes

- clients are computer programs that use the p2panda library to
  - create key pairs
  - sign and encode new data and send it to a node
  - query a node for existing data to make it available to its users
- nodes are computer programs that
  - validate and store entries received from a client that connects to it
  - exchange entries with other nodes
  - process entries to make information in them available in the shape that clients need
- client and node can be integrated in a single software package or run separate from each other - even on different machines
  - one way to integrate node and client is as a Tauri application, something that is supported by [aquadoggo][aquadoggo]
- both nodes and clients are built on the same [p2panda][p2panda] library that defines shared data structures
- every key pair is bound to exactly one client and exactly one node
  - a key pair MUST NOT publish data through any client other than the one it was created with
  - a key pair MUST NOT publish data on any node other than the one it was first used with
  - disregard of this rule carries the risk of creating forks within a public key's logs. See [Key Groups][key_groups] for a way to publish data from multiple devices without copying a private key or changing the node used.

## Nodes

- nodes do the heavy lifting
- a node can run as a daemon on a user's computer or on an always-on server
- a node can be used by many clients (federation)
  - this allows using p2panda from a browser without installing software
- [aquadoggo][aquadoggo] is the reference node implementation
- nodes offer a [JSON RPC API][queries] that is used by clients to connect and exchange data

## Clients

- clients create key pairs for their users and never transfer private keys out
  - only clients have access to users' private keys
- have a look at the [beep-boop][beep_boop] chat demo for an example of a client

[aquadoggo]: https://github.com/p2panda/aquadoggo
[p2panda]: https://github.com/p2panda/p2panda
[beep_boop]: https://github.com/p2panda/beep-boop
[key_groups]: /docs/collaboration/key-groups
[queries]: /docs/organising-data/queries
