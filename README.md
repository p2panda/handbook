# p2:panda_face:

p2panda is a user-friendly peer-to-peer communications protocol for secure, energy-efficient, offline- and local-first web applications. We want this protocol to be a playful tool for people to hack, build, play, and experiment with.

Messages in p2panda are signed, encrypted and published by clients using the [Bamboo](https://github.com/AljoschaMeyer/bamboo) append-only log data type which gets distributed over the network to other peers. p2panda allows for decentralised and federated network topologies or even hybrids of these and aims at running in web browsers without loosing its cryptographic features.

> **p2panda is currently very much in prototyping and specification phase, our milestones and progress can be seen below. If you're interested in any of these topics please get in touch!**

## Topics we're interested in

- **Browser friendliness**: Lightweight clients that can easily be implemented as websites.
- **Decentralization**: Networks consist of both federated or decentralised nodes.
- **Deletion**: Data can be deleted without loosing verifiability and log integrity.
- **Encryption**: Transport communication is end-to-end encrypted via SSB's Secret Handshake, data is encrypted for groups via the Messaging Layer Security (MLS) protocol.
- **Energy efficiency**: Data- and energy-efficient storage and replication.
- **Fork proof**: Automatic detection of accidentially or maliciously forked append-only logs.
- **Identities**: A user account model that gives people options for managing one or multiple online identities across devices.
- **Integrity**: Authorship of all published data can be verified through signatures.
- **Local- & offline first**: Access to online services without reliable and performant internet infrastructure. Independence from the corporate cloud.
- **Low-power electronics**: Useable on low power devices.
- **Moderation**: Decentralised content moderation for users and groups.
- **Partial replication**: Nodes do not need to download the whole log to verify them.
- **Schemas**: User data is stored in published, versioned data schemas so data can be reliably accessed across services.
- **Warmth**: Computers make it easy to get carried away by their rigidly structured ways. However, every computer also contains an undeniable spark of pure chaos. We want to capture that spark to ignite a campfire for you to gather around and get cosy.

## Background

p2panda emerged out of activities around the self-curated zine [BLATT 3000](https://blatt3000.de) (2014) and subsequent festivals [VERANTWORTUNG 3000](https://blatt3000.de/verantwortung3000/) (2016) and [HOFFNUNG 3000](https://blatt3000.de/hoffnung3000/) (2017), the latter of these being the catalyst for building a custom platform designed to help communities organise in a decentralised manner, also called [HOFFNUNG 3000](https://hoffnung3000.de/).

While exploring building a p2p festival platform we met many people from the communities around Secure Scuttlebutt, DAT / Hypercore, Cabal, Chaos Computer Club, Fediverse, Antiuniversity Now, Pixelache trying to understand how this technology affects the way we organise ourselves.

<div align="center">
  <img src="https://raw.githubusercontent.com/p2panda/design-document/main/assets/pandas.jpg" width="500" alt="p2panda - サービス！サービス！" />
  <p>サービス！サービス！</p>
</div>

This led to a group of people interested in realising a protocol for p2p communication, which ultimately should serve as a tool to build applications, like a festival tool and more. We've been meeting regularly on Mondays since 2019 to hack p2panda and have recently reached the point where we have a publicly running [demo project](https://p2panda.org/demo). We have also been active in some other projects including the [Liebe Chaos Verein](https://liebechaos.org/), organising a [p2p gathering](https://p2p-berlin.org/) and a reading group in Berlin. Obviously we're still going to organise another festival sometime :panda_face:.

## Overview

> **These libraries and applications are current work-in-progress reference implementations. See the Milestones below for current progress status.**

**Libraries**

- [`p2panda`](https://github.com/p2panda/p2panda): Provides tools to write a client for the p2panda network. It is shipped both as a Rust crate `p2panda-rs` with WebAssembly bindings and a NPM package `p2panda-js` with TypeScript definitions running in NodeJS or any modern web browser.

**Nodes**

- [`aquadoggo`](https://github.com/p2panda/aquadoggo): RPC node server for the p2panda network running as a standalone application or Rust `aquadoggo` crate.
- [`fishyfish`](https://github.com/p2panda/fishyfish): Command line interface to manage p2panda nodes.

**Clients**

- [`beep-boop`](https://github.com/p2panda/beep-boop): Chat client based on p2panda to experiment with. See it live under: https://p2panda.org/demo

## Milestones

### The past

- [x] Ed25519 key pair generation and handling
- [x] Bamboo `Entry` creation
- [x] `Entry` signing and validation
- [x] SQLite / PostgreSQL / MySQL support for data storage
- [x] WebAssembly support in the browser
- [x] `aquadoggo` HTTP and WebSocket RPC API
- [x] Publish first v0.1.0 `p2panda-rs` crate and `p2panda-js` npm package
- [x] Operation specification, creation and validation
- [x] CBOR encoding and basic CDDL validation of messages
- [x] Experimental chat demo application
- [x] Embed `aquadoggo` library in Tauri container
- [x] Stabilize `p2panda-js` API, release 0.2.0
- [x] Publish `aquadoggo` crate 0.1.0
- [x] `bamboo-rs-ed25519-yasmf` crate published
- [x] Use YASMF hashes in `p2panda-rs` and `p2panda-js`

### Now

- [x] OpenMLS group encryption capabilities in `p2panda-rs`
- [ ] p2panda first draft specification (**in progress**)
- [ ] Materialisation of data from operations (**in progress**)
- [ ] Multi-writer materialisation in `aquadoggo`(**in progress**)
- [ ] Schemas and data validation (**in progress**)
- [ ] Naive replication protocol (**in progress**)
- [ ] Shared identities with `KeyGroup` in `p2panda-rs`
- [ ] GraphQL API to query data
- [ ] Implement System Schemas in `aquadoggo`
- [ ] Implement Application Schemas in `aquadoggo`
- [ ] Multi-writer permissions/moderation in `aquadoggo`
- [ ] Transport encryption between nodes
- [ ] Manually follow other nodes
- [ ] Automatic local discovery via mDNS
- [ ] p2panda specification 1.0 release :panda_face:

### The future

- [ ] Schema migrations
- [ ] Schema backwards compatibility via lenses
- [ ] Automatic discovery via gossip protocol
- [ ] Efficient replication protocol
- [ ] Automatic deletion of unused data
- [ ] Automatic detection of forked logs
- [ ] Improved data type: Magma + Lava

## How to contribute

- We meet every Monday at 19:00 CET, for coding and planning, drop us a message if you would like to join.
- Join our chat channel _#p2panda_: https://wald.liebechaos.org/channel/p2panda
- Here you can find our meeting notes: https://wolke.liebechaos.org/s/oEErg5TMqZM9HB6
- Check out our issues, PRs and source code on GitHub: https://github.com/p2panda

## Further links

- [C36C3](https://media.ccc.de/v/36c3-10756-p2panda) Presentation at Chaos Communication Congress 2019
- [Shirokuma Cafe](https://en.wikipedia.org/wiki/Shirokuma_Cafe)
- [Laura Weber](http://www.lauraweber.net/) - Cute panda illustrations

## License

[`CC-BY-SA-4.0 License`](/LICENSE)

## Supported by

<img src="https://p2panda.org/images/ngi-logo.png" width="auto" height="80px">
<img src="https://p2panda.org/images/eu-flag-logo.png" width="auto" height="80px">

_This project has received funding from the European Union’s Horizon 2020 research and innovation programme within the framework of the NGI-POINTER Project funded under grant agreement No 871528_
