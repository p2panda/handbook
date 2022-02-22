---
title: Overview
hide_table_of_contents: true
---

<div className="img-landing">
  <img src="/handbook/img/panda2by2.png" role="decoration" />
  <h1>p2panda</h1>
</div>

p2panda is a user-friendly peer-to-peer communications protocol for secure, energy-efficient, offline- and local-first web applications. We want this protocol to be a playful tool for people to hack, build, play, and experiment with.

Data changes in p2panda are signed, encrypted and published by clients using the [Bamboo](https://github.com/AljoschaMeyer/bamboo) append-only log data type which gets distributed over the network to other peers. p2panda allows for decentralised and federated network topologies or even hybrids of these and aims at running in web browsers without loosing its cryptographic features.

:::info
p2panda is currently very much in prototyping and specification phase, our milestones and progress can be seen [on Github](https://github.com/p2panda/handbook#milestones). If you're interested in any of these topics please get in touch!
:::

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

## Supported by

<img src="https://p2panda.org/images/ngi-logo.png" style={{ height: 80 }} />
<img src="https://p2panda.org/images/eu-flag-logo.png" style={{ height: 80, paddingLeft: '1em' }} />

_This project has received funding from the European Union’s Horizon 2020 research and innovation programme within the framework of the NGI-POINTER Project funded under grant agreement No 871528_
