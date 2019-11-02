# p2:panda_face: Design & implementation

*Status Quo October 2019: Currently, the p2panda protocol schema and implementations are being designed. This includes deciding on goals, non-goals, requirements and use cases. This document will be updated once this process has been completed.*

## Overview

p2panda will be a collection of applications, libraries and tools for users, bots and developers to set up groups, festivals, gatherings, events or spaces that focus on self-organization, decentralization and generally alternative ways of organizing.

## Goals

- Work offline and without a privileged server. p2panda distributes all data in a server-less peer-to-peer network structure using a Gossip protocol.
- p2panda does not require any form of authentication except of keypair verification based on self-generated cryptographic keys.
- User applications should be simple, to be used by as many people as possible / accessible and non-technical.
- p2panda should run in a browser.
- Policies should not necessarily be decided in the technical architecture to keep p2panda as simple and uncomplicated as possible. We believe that time, space and availability policies can be discussed and announced in social ways or via other platforms (webpage).
- Separate user applications and core libraries in separate modules to allow alternative implementations, clients etc.

## Schema

The basic data structures of p2panda are: `users`, `resources`, and `events` (terminology might change soon as it is too strictly tied to festivals right now). Users create and share `resources` and `events`. Events need some set of resources to be executed. p2panda helps users coordinate the process of mapping available `resources` to the `events` that need them.

A particularly important class of resources are locations. While internally locations can be modelled as ordinary resources, the UI gives them special treatment.

This open schema that can be distributed by any kind of client that implements it. It should be easy for developers to extend the protocol and to create their own stuff with it.

- every p2panda installation is a user but bots can also be users. `user` is a cryptographic key pair stored on a device. `users` announce new `resources` or `events` and authorize `resource` requests of `resources` they created.
- `resource` is very loosely defined and can be anything users want to share with others (a physical object, a skill, etc.), `locations` are also `resources` and can be defined by a GPS position, (a physical address?) or a virtual address (a URL, 3D coordinate etc. ?). Resources can be created by `users`, the single creator of a resource becomes its `owner`.
- `authorization` is an `owner` confirming or denying a requested `resource` for an `event`. The policy by which an owner authorizes a resource is up to that owner. P2:panda_face: will initially implement the *first-come-first-served* policy and the *manual confirmation* policy.
- `festivals` are the nestable contexts that contain resources `resources`, `events` and `authorizations`. They also provide the boundaries for gossip exchange.

![Schema](https://raw.githubusercontent.com/p2panda/design-document/master/images/datatypes.jpg)

![Message feeds](https://raw.githubusercontent.com/p2panda/design-document/master/images/messages.jpg)

## Architecture

- We maintain a single-writer, append-only log per user, for which [bamboo](https://github.com/AljoschaMeyer/bamboo) can be used.
- We need a datascheme for log messages to describe announcement, changes of events and resources plus authorization of resources.
- Inspired by Secure Scuttlebut a gossip protocol is used to replicate the logs over an overlay network. The gossip Protocol implementation must run in a webbrowser and therefore uses WebRTC. This might reuse spray-wrtc, if not in implementation then in spirit.
- p2panda reads and writes messages from the logs and offers a simple web UI (via React) to manage resources and events and the authorizations.
- An API for resource authorization mechanisms makes authorization pluggable (default is first-come-first-serve but you could think of clicking a reject or confirm button, a telephone interview or having to play a computer game first).

![Authorization](https://raw.githubusercontent.com/p2panda/design-document/master/images/authorization.jpg)

## Initial Scope and Design Restrictions

p2panda is primarily intended as a platform for planning festivals. The underlying problem is that of peer-to-peer resource allocation, which is a wide-open problem space. We can not possible hope to "solve" this, in particular not with software intended for autonomous, experimental curation. To give us a realistic chance at tackling the problem(s), we deliberately restrict ourselves to a subset of the design space:

- The system assumes each resource has exactly one owner, the owner is the single source of truth regarding authorization of the resource.
- communal resources could e.g. be modeled through a user that is controlled by multiple people, possibly using an (algorithmic or social) process for collaborative decision making. To the 🐼, the end result must look like a single owner.
- The system does not hold resource owners accountable for delivering the authorized resources. Any necessary conflict resolution is a fundamentally human process, not a 🐼 one.
  - The system does not care how or why a resource was created.
  - There is no mechanism for requesting resources, you can only use the resources that are available right now.
  - Humans tend to solve this by requesting over side-channels. Since we are not an evil corporation bent on world-domination, usage of other communication mechanisms (the most prominent being "meeting and talking") is fine and even encouraged.

Further work might consist of lifting any of these constraints. There are also some other possible extensions that could be worthwhile to explore (and are far less ambitious):

- Resources that depend on other resources.
- Resources that can be authorized more than once.
  - In particular, this could be used to model access control - imagine a "festival creator ticket" resource that can be given to any number of people and is a preriquisite for creating events.
  
## Applications

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
