# p2:panda_face: Design & implementation

*Status Quo October 2019: Currently, the p2panda protocol schema and implementations are being designed. This includes deciding on goals, non-goals, requirements and use cases. This document will be updated once this process has been completed.*

## Overview

p2panda will be a collection of applications, libraries and tools for users, bots and developers to set up groups, festivals, gatherings, events or spaces that focus on self-organization, decentralization and generally alternative ways of organizing. 

They are connected by the p2panda protocol, which is yet to be defined. It could be an extension to an existing protocol like Secure Scuttlebutt or it could be a completely new schema.

The following lists goals and non-goals for the schema and implementations in an open basket fashion. How these are prioritised is to be declared.

## Setup

p2panda consists of two components which are mostly identical to the setup of a typical [SSB](https://www.scuttlebutt.nz/) application:

* **Server**, holding all data and offering an API to query and update it
* **Client**, renders requested data and sends signed new messages to the Server

With these two components a few setup configurations for p2panda are imaginable:

* Website (mobile / desktop) with external server (hosted on dedicated p2panda hardware or any other machine)
* Electron Client (or similar) which contains both server and client
* Website (mobile / desktop) which contains both server and client (not possible right now due to browser limitations / performance bottlenecks)

### Server

* Holds all known append-only logs. Awaits signed messages from clients which then are added to the logs via an API (database)
* Accepts queries to filter currently known data and returns it to the client via an API 
* Verifies the consistency and signature of logs and removes invalid ones
* Finds other servers (discovery)
* Replicates / syncs logs with other servers (replication)

### Client

* Renders data to view which gets requested from Server via API
* Holds the generated keypair and sensitive informations (private key)
* Signs new messages with private key and sends signed message via API to Server

## Schema

- Open schema that can be distributed by any kind of client that implements it. Make it easy for devs to extend the protocol and to create their own stuff with it.
- The schema records users, resources, authorizations, events and festivals
  - every p2panda installation is a user but bots can also be users. `user` is a cryptographic key pair stored on a device. `users` announce new `resources` or `events` and authorize `resource` requests of `resources` they created.
  - `resource` is very loosely defined and can be anything users want to share with others (a physical object, a skill, etc.), `locations` are also `resources` and can be defined by a GPS position, (a physical address?) or a virtual address (a URL, 3D coordinate etc. ?). Resources can be created by `users`, the single creator of a resource becomes its `owner`.
  - `authorization` is an `owner` confirming or denying a requested `resource` for an `event`. The policy by which an owner authorizes a resource is up to that owner. P2:panda_face: will initially implement the *first-come-first-served* policy and the *manual confirmation* policy.
  - `festivals` are the nestable contexts that contain resources `resources`, `events` and `authorizations`. They also provide the boundaries for gossip exchange.
- An implementation should generate a unique cryptographic key-pair on every first start, this is enough to make sure that every message the key owner sends can be verified and connected to it (if someone changed the message afterwards it will fail).
- Flexibility with regards to how resource usage is authorized. Base case would be: A user requests usage of a resource registered to another user. The owner confirms this request manually. Other possibilites: majority vote, automatic allocation unless there are conflicts, require multiple confirmations (e.g. any two other users must confirm)
- Plurality: Since p2panda is decentralized it is not consistent by nature, meaning that every peer sees a different part and state of it.
- Anonymity: p2panda only needs the cryptographic key-pair to verify peers and therefore does not need any authentication through email address etc. - technically speaking its not anonymous (you are still being connected to your IP address for example), but even this can be solved with the SSB Tor plugin and VPNs.
- Security: p2panda should be usable for politically sensitive plannings by offering e2e encryption. This is not implemented by default but one could think of clients which uses the NOISE protocol, Tor and private messaging / e2e encryption feature of SSB.

## Client UI / UX

- Indicate the current "health" status of yourself, how much do you "replicate" your data with others right now / how connected are you with others? This is an important indicator to make users understand their impact on the "reach ability" by others. Since everyone serves their own data it comes with a larger responsibility to distribute it yourself / make yourself available.
- Indicate the "last active" status of others (not necessarily in time). This can be an indicator on how reliable a peer is.
- Show to everyone (not only to the organizer) how much an event is confirmed, so you can get a feeling on how realistic it is that this event will take place. This is realized by showing the confirmed state of all the requested event resources. Eg. "The event is 75% confirmed".

## Further Goals

- Runs in a browser, app store submission must be optional
- low energy usage 
- Allows archiving: Festival servers might be shut off one day, but since the data is on everyones machine it automatically got "backed up" by many.
- If p2panda is implemented as an extension/superset of SSB, it should be created as its own network without the need to download all of the wider SSB history
- While p2panda is intended to be flexible in use, its core use case remains organising festivals happening in a physical space with a set beginning and end and mostly human participants.
