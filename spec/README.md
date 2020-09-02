# p2:panda_face: Specification

**Status: Almost there, just not all written down yet..** :rainbow:

## Introduction

p2panda is a protocol for publishing and reading structured data in a decentralized network of peers. Messages are signed and published by clients using [Bamboo](https://github.com/AljoschaMeyer/bamboo) data structures which get replicated over the network to other peers. p2panda allows for decentralized or federated network topologies or even hybrids of these and aims at running in webbrowsers without giving up on its cryptographic features.

## Features

- **Browser friendly:** Since clients only sign and send new data to servers they can easily be implemented for websites.
- **Open schemas:** Clients suggest data schemas and schema migrations which servers can support, by validating, storing and indexing the data for the network.
- **Encryption:** Node communication is end-to-end encrypted, on-chain messages can be encrypted for particular users (asymmetrically) or groups sharing the same key (symmetrically).
- **Single writer:** Data can only be created or changed by the same author.
- **Local deletion:** Data can partically be deleted without loosing verifiability and data integrity.
- **Partial replication:** Servers do not need to download the whole log to verify data.
- **Flexible network topologies:** Depending on the needs and choosen trade-offs of the users or communities a network can consist of federated servers or independent, fully decentralized offline-first nodes.
- **Fork proof:** Detection of forked logs and conflict resolution through voting.

## Design Goals

- **Fun:** p2p protocols can be intimidating as they bring some special problems with themselves. We believe this does not need to be reflected in the codebase neither in the APIs and documentation around this technology. We want p2panda to be fun to write code with and for.
- **Minimal:** Make use of already existing solutions and open source libraries as much as possible to keep the actual p2panda codebase small.
- **Extensible:** Keep the protocol simple, modular and open.

## Chapters

### Overview

1. [Architecture](https://github.com/p2panda/design-document/blob/master/spec/overview/architecture.md)
2. [Bamboo](https://github.com/p2panda/design-document/blob/master/spec/overview/bamboo.md)
3. [Nomenclature](https://github.com/p2panda/design-document/blob/master/spec/overview/nomenclature.md)

### Server-Client

1. [Messages](https://github.com/p2panda/design-document/blob/master/spec/server-client/messages.md)
2. [Schemas](https://github.com/p2panda/design-document/blob/master/spec/server-client/schemas.md)
3. [Queries](https://github.com/p2panda/design-document/blob/master/spec/server-client/queries.md)
4. [RPC API](https://github.com/p2panda/design-document/blob/master/spec/server-client/rpc.md)
5. [Encryption](https://github.com/p2panda/design-document/blob/master/spec/server-client/encryption.md)

### Server-Server

1. [Discovery](https://github.com/p2panda/design-document/blob/master/spec/server-server/discovery.md)
2. [Replication](https://github.com/p2panda/design-document/blob/master/spec/server-server/replication.md)

### Ideas

1. [Fork proofs](https://github.com/p2panda/design-document/blob/master/spec/ideas/fork-proofs.md)
2. [Migrations](https://github.com/p2panda/design-document/blob/master/spec/ideas/migrations.md)

# TODO

* Be consistent with `skiplinks` (instead of lipmaa links) and `logs` (instead of feeds)

### License

`Creative Commons Attribution Share Alike 4.0 International`
