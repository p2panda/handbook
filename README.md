# p2:panda_face:

p2panda is a user-friendly peer-to-peer communications protocol for secure, energy-efficient, offline- and local-first web applications. We want this protocol to be a playful tool for people to hack, build, play, and experiment with.

Messages in p2panda are signed, encrypted and published by clients using the Bamboo append-only log data type which gets distributed over the network to other peers. p2panda allows for decentralised or federated network topologies or even hybrids of these and aims at running in web browsers without loosing its cryptographic features.

> :panda_face: **p2panda is currently very much in prototyping and specification phase, our milestones and progress can be seen below. If you're interested in any of these topics please get in touch!**

## Topics we're interested in

* [`Browser friendliness`](/topics/browser-support.md): Lightweight clients that can easily be implemented for websites.
* [`Schemas`](/topics/schemas.md): Users suggest data schemas which can be installed on nodes, validating, storing and indexing the data for the network.
* [`Encryption`](/topics/encryption.md): Transport communication and messages are end-to-end encrypted via SSB's Secret Handshake and the Messaging Layer Security (MLS) protocol.
* [`Verification`](/topics/verification): Published data is stored in append only logs and can only be updated by its original author.
* [`Deletion`](/topics/deletion.md): Data can be deleted without loosing verifiability and log integrity.
* [`Decentralization`](/topics/decentralization.md): Network consisting of federated nodes or fully decentralised nodes.
* [`Partial replication`](/topics/replication.md): Nodes do not need to download the whole log to verify them.
* [`Devices`](/topics/devices.md): A bunch of laptops or single board computers need much less electricity than a server farm.
* [`Identities`](/topics/identities.md): People managing one or many identities across devices.
* [`Moderation`](/topics/moderation.md): Support hiding or removing content for users and groups.
* [`Local- & offline first`](/topics/local-first.md): Communicate without the global internet.
* [`Energy`](/topics/energy.md): Data- and energy-efficient storage and replication.
* [`Warmth`](/topics/warmth.md): Computers make it easy to get carried away by their rigidly structured ways. However, every computer also contains an undeniable spark of pure chaos. We want to capture that spark to ignite a campfire for you to gather around and get cosy.
* [`Fork proof`](/topics/fork-proof.md): Automatic detection of accidentially or maliciously forked append-only logs.

## Background

p2panda emerged out of activities around the self-curated zine [`BLATT3000`](https://blatt3000.de) (2014 -) and subsequent festivals [`VERANTWORTUNG3000`](https://blatt3000.de/verantwortung3000/) (2016) and [`HOFFNUNG3000`](https://blatt3000.de/hoffnung3000/) (2017), the latter of these being the catalyst for building a custom platform designed to help communities organize in a decentralised manner, also called [`HOFFNUNG3000`](https://hoffnung3000.de/). 

While exploring building a p2p festival platform we met many people from the communities around Secure Scuttlebutt, DAT / Hypercore, Cabal, Chaos Computer Club, Fediverse, Antiuniversity Now, Pixelache trying to understand how this technology affects the way we organize ourselves. 

This research led to a group of people interested in realizing a protocol for p2p communication, which ultimately should serve as a tool to build applications, like a festival organizing tool and more. 

In recent times activities have gathered around [`Liebe Chaos Verein`](https://liebechaos.org/), organizing a [p2p gathering](https://p2p-berlin.org/) and reading group in Berlin. We've been meeting almost every Monday since 2019 to hack on p2panda. Obviously we're still gunna organize another festival sometime :panda_face:.

## Overview

> :panda_face: **These libraries and applications are current work-in-progress reference implementations. See the Milestones below for current progress status.**

**Libraries**

* [`p2panda`](https://github.com/p2panda/p2panda): Provides tools to write a client for the p2panda network. It is shipped both as a Rust crate p2panda-rs with WebAssembly bindings and a NPM package p2panda-js with TypeScript definitions running in NodeJS or any modern web browser.

**Nodes**

* [`aquadoggo`](https://github.com/p2panda/aquadoggo): Node server for the p2panda network running as a command line application or embedded via the library inside your Rust program.
* [`fishyfish`](https://github.com/p2panda/fishyfish): Command line interface to manage p2panda nodes.

**Clients**

* [`beep-boop`](https://github.com/p2panda/beep-boop): Chat client based on p2panda to experiment with. See it live under: https://p2panda.org/demo.

## Milestones

* [x] ed25519 key pair generation
* [x] Bamboo Entry creation
* [x] Entry signing and encoding
* [x] SQLite / PostgreSQL / MySQL support for data storage
* [x] WebAssembly support
* [x] HTTP and WebSocket RPC API
* [x] Implement *aquadoggo* node
* [x] Publish 0.1.0 `p2panda-rs` crate and `p2panda-js` npm package
* [x] Message specification, creation and validation
* [x] Chat demo application
* [x] Embed `aquadoggo` in Tauri container
* [ ] Stabilize `p2panda-js` API, release 0.2.0 (**in progress**)
* [ ] Publish `aquadoggo` crate 0.1.0
* [ ] Naive materialization of data from logs (**in progress**)
* [ ] Schemas and data validation (**in progress**)
* [ ] Simple query interface to read data
* [ ] Manually follow other nodes
* [ ] Automatic local discovery via mDNS
* [ ] Schema migrations
* [ ] *Persona* schema to manage identities and key pairs
* [ ] Efficient materialization of data from logs
* [ ] Naive replication protocol
* [ ] Data encryption via OpenMLS
* [ ] Automatic discovery via gossip protocol
* [ ] Efficient point2point replication protocol
* [ ] Schema backwards compatibility via lenses
* [ ] p2panda specification 1.0 release :panda_face: 
* [ ] Automatic deletion of unused data
* [ ] Automatic detection of forked logs
* [ ] Filter and content moderation curated by users and groups

## How to contribute

* Chatroom *#p2panda*: https://wald.liebechaos.org/channel/p2panda
* Meeting notes: https://wolke.liebechaos.org/s/oEErg5TMqZM9HB6
* GitHub: https://github.com/p2panda
* Liebe Chaos Verein e. V.: https://liebechaos.org/

## Futher links

* Presentation at Chaos Communication Congress 2019
* Shirokuma Cafe - panda_face
* Mio Ebisu
* Laura Weber - Cute panda illustrations

## License

[`CC-BY-SA-4.0 License`](/LICENSE)
