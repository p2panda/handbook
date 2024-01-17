<div align="center">
  <img src="https://raw.githubusercontent.com/p2panda/.github/d7bbf898819bed472ca0126784c4d985bb641ec3/assets/panda.svg" width="250" />
</div>

<h1 align="center">p2panda</h1>

<div align="center">
  <strong>A protocol for local-first applications</strong>
</div>

<div align="center">
  <h3>
    <a href="https://p2panda.org">Website</a>
    <span> | </span>
    <a href="https://p2panda.org/sdks">SDKs</a>
    <span> | </span>
    <a href="https://p2panda.org/specifications">Specification</a>
    <span> | </span>
    <a href="https://p2panda.org/about/contribute">
      Contribute
    </a>
  </h3>
</div>

<br />

p2panda is a user-friendly peer-to-peer protocol for secure, energy-efficient local-first applications. We want this protocol to be a playful tool for people to hack, build, play, and experiment with.

## Handbook

<a href="https://p2panda.org">
  <img src="https://raw.githubusercontent.com/p2panda/.github/main/assets/handbook.png" width="100" />
</a>

* [`About`](https://p2panda.org/about)
* [`Tutorials`](https://p2panda.org/tutorials)
* [`SDKs`](https://p2panda.org/sdks)
* [`Specification`](https://p2panda.org/specifications)
* [`FAQ`](https://p2panda.org/faq)

## Topics we're interested in

* 🦝 **Browser Friendliness** Lightweight clients that can easily be implemented as websites
* 🐢 **Capabilities** Fine-grained permissions and roles for users
* 🐎 **Collaboration** Data can be edited together, even when you are offline
* 🐮 **Data Sovereignty**  Users own the data they create
* 🐄 **Decentralisation** No authority over data or how it is displayed
* 🦣 **Deletion** Some data does not need to stay forever, it can even delete itself automatically after some time
* 🐰 **Energy Efficiency** Data- and energy-efficient storage and replication
* 🐨 **Identitites** A user account model that gives people options for managing one or multiple online identities across devices
* 🐼 **Local-First** Access to online services without reliable and performant internet infrastructure. Independence from the corporate cloud
* 🦉 **Privacy** Secure encryption for sensitive and private data for users and all sorts of groups
* 🐧 **Social** Computers are used by humans
* 🐸 **Warmth** Computers make it easy to get carried away by their rigidly structured ways. However, every computer also contains an undeniable spark of pure chaos. We want to capture that spark to ignite a campfire for you to gather around and get cosy

## Background

p2panda emerged out of activities around the self-curated zine [BLATT 3000](https://blatt3000.de) (2014) and subsequent festivals [VERANTWORTUNG 3000](https://blatt3000.de/verantwortung3000/) (2016) and [HOFFNUNG 3000](https://blatt3000.de/hoffnung3000/) (2017), the latter of these being the catalyst for building a custom platform designed to help communities organise in a decentralised manner, also called [HOFFNUNG 3000](https://hoffnung3000.de/).

While exploring building a p2p festival platform we met many people from the communities around Earthstar, Secure Scuttlebutt, DAT / Hypercore, Cabal, Chaos Computer Club, Fediverse, Antiuniversity Now, Pixelache trying to understand how this technology affects the way we organise ourselves.

<div align="center">
  <img src="https://raw.githubusercontent.com/p2panda/design-document/main/assets/pandas.jpg" width="500" alt="p2panda - サービス！サービス！" />
  <p>サービス！サービス！</p>
</div>

This led to a group of people interested in realising a protocol for p2p communication, which ultimately should serve as a tool to build applications, like a festival tool and more. We've been meeting regularly on Mondays since 2019 to hack p2panda and have also been active in some other projects including the [Liebe Chaos Verein](https://liebechaos.org/), organising a p2p gathering and a reading group in Berlin. Obviously we're still going to organise another festival sometime :panda_face:.

Read more about p2panda on our [website](https://p2panda.org/about)!

## Overview

**SDKs**

- [`p2panda`](https://github.com/p2panda/p2panda): Provides tools to write a client for the p2panda network. It is shipped both as a Rust crate `p2panda-rs` with WebAssembly bindings and a NPM package `p2panda-js` with TypeScript definitions running in NodeJS or any modern web browser.

**Nodes**

- [`aquadoggo`](https://github.com/p2panda/aquadoggo): GraphQL node server for the p2panda network running as a standalone application or Rust `aquadoggo` crate.

**Clients**

- [`send-to-node`](https://github.com/p2panda/send-to-node): Minimal client to send data to a p2panda node
- [`zoo-adventures`](https://github.com/p2panda/zoo-adventures): "Connect Four" Game. See it live under: https://p2panda.org
- [`mushroom-app-tutorial`](https://github.com/p2panda/mushroom-app-tutorial): Tutorial Client to learn p2panda

## Further links

- [C36C3](https://media.ccc.de/v/36c3-10756-p2panda) - Presentation at Chaos Communication Congress 2019
- [Shirokuma Cafe](https://en.wikipedia.org/wiki/Shirokuma_Cafe)
- [Mio Ebisu](https://mioebisu.neocities.org/) - Cute panda graphics
- [Laura Weber](http://www.lauraweber.net/) - Cute panda illustrations

## License

[`CC-BY-SA-4.0 License`](/LICENSE)

## Supported by

<img src="https://raw.githubusercontent.com/p2panda/.github/main/assets/ngi-logo.png" width="auto" height="80px"><br />
<img src="https://raw.githubusercontent.com/p2panda/.github/main/assets/nlnet-logo.svg" width="auto" height="80px"><br />
<img src="https://raw.githubusercontent.com/p2panda/.github/main/assets/eu-flag-logo.png" width="auto" height="80px">

*This project has received funding from the European Union’s Horizon 2020
research and innovation programme within the framework of the NGI-POINTER
Project funded under grant agreement No 871528 and NGI-ASSURE No 957073*
