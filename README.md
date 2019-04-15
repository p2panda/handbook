p2panda design document
===

This document serves as an architectural specification and design of `p2panda` for development. All content is in draft status and open for discussion.

## What is p2panda?

`p2panda` is **p2:panda_face:**

A collection of applications, libraries and tools for users and developers to set up groups, festivals, gatherings, events or spaces that focus on flat hierarchies, corruption prevention, self-organization, decentralization and generally alternative ways of organizing.

The basic data structures of `p2panda` are: `users`, `resources`, and `events`. Users create and share resources and events. Events need some set of resources to be executed. P2:panda_face: helps users coordinate the process of mapping available resources to the events that need them.

A particularly important class of resources are locations. While internally locations can be modelled as ordinary resources, the UI gives them special treatment.

It can be interesting for:

* Houseprojects, Hackerspaces or places which have multiple rooms and tools to share internally.
* Organisations, initiatives or (art) projects which are active over whole cities, regions or the world.
* Conferences, museums, galleries, festivals which want to experiment with alternative ways of curation.
* Multiple collectives and initiatives reusing places and resources in different cities at different times.
* Fun or esoteric things like a festival in only virtual spaces or even *no* places.

## Goals

* Work offline and without a privileged server. `p2panda` distributes all data in a server-less peer-to-peer network structure using a [Gossip](https://en.wikipedia.org/wiki/Gossip_protocol) protocol.
* `p2panda` does not require any form of authentication except of keypair verification based on self-generated cryptographic keys.
* User applications should be simple, to be used by as many people as possible / accessible and non-technical.
* `p2panda` should run in a browser.
* Policies should not necessarily be decided in the technical architecture to keep `p2panda` as simple and uncomplicated as possible. We believe that time, space and availability policies can be discussed and announced in social ways or via other platforms (webpage).
* Separate user applications and core libraries in separate modules to allow alternative implementations, clients etc.
* Ensure a fork-able data structure (eg. imagine a festival which can be "cloned").

## Semantics

* `resource` is very loosely defined and can be anything users want to share with others (a physical object, a skill, etc.), `locations` are also `resources` and can be defined by a GPS position, (a physical address?) or a virtual address (a URL, 3D coordinate etc. ?). Resources can be created by `users`, the single creator of a resource becomes its `owner`.
* `event`, which requests zero or more resources for a specific timeframe. Once a resoure has been given to an event, it can not be used by other events in the same timeframe.
* `user` is a cryptographic key pair stored on a device. `users` announce new `resources` or `events` and authorize `resource` requests of `resources` they created.
* `authorization` is an `owner` confirming or denying a requested `resource` for an `event`. The policy by which an owner authorizes a resource is up to that owner. P2:panda_face: will initially implement the *first-come-first-served* policy and the *manual confirmation* policy.
* `festivals` are the nestable contexts that contain resources `resources`, `events` and `authorizations`. They also provide the boundaries for gossip exchange.

## Architecture

* We maintain a single-writer, append-only log per user, for which [bamboo](https://github.com/AljoschaMeyer/bamboo) is used.
* We need a datascheme for log messages to describe announcement, changes of `events` and `resources` plus authorization of `resources`.
* Inspired by [Secure Scuttlebut](https://www.scuttlebutt.nz/) a gossip protocol is used to replicate the logs over an overlay network. The gossip Protocol implementation must run in a webbrowser and therefore uses WebRTC. This might reuse [spray-wrtc](https://ran3d.github.io/spray-wrtc/), if not in implementation then in spirit.
* `p2panda` reads and writes messages from the logs and offers a simple web UI (via React) to manage `resources` and `events` and the `authorizations`.
* An API for resource authorization mechanisms makes `authorization` pluggable (default is *first-come-first-serve* but you could think of clicking a reject or confirm button, a telephone interview or having to play a computer game first :smile:).

## Initial Scope and Design Restrictions

P2:panda_face: is primarily intended as a platform for planning festivals. The underlying problem is that of peer-to-peer resource allocation, which is a wide-open problem space. We can not possible hope to "solve" this, in particular not with software intended for autonomous, experimental curation. To give us a realistic chance at tackling the problem(s), we deliberately restrict ourselves to a subset of the design space:

- The system assumes each resource has exactly one owner, the owner is the single source of truth regarding authorization of the resource.
  - communal resources could e.g. be modeled through a *user* that is controlled by multiple people, possibly using an (algorithmic or social) process for collaborative decision making. To the :panda_face:, the end result must look like a *single* owner.
- The system does not hold resource owners accountable for delivering the authorized resources. Any necessary conflict resolution is a fundamentally human process, not a :panda_face: one.
- The system does not care *how* or *why* a resource was created.
- There is no mechanism for *requesting* resources, you can only use the resources that are available right now.
  - Humans tend to solve this by requesting over side-channels. Since we are not an evil corporation bent on world-domination, usage of other communication mechanisms (the most prominent being "meeting and talking") is fine and even encouraged.

Further work might consist of lifting any of these constraints. There are also some other possible extensions that could be worthwhile to explore (and are far less ambitious):

- Resources that depend on other resources.
- Resources that can be authorized more than once.
  - In particular, this could be used to model access control - imagine a "festival creator ticket" resource that can be given to any number of people and is a preriquisite for creating events.

## References

* [HOFFNUNG 3000](https://github.com/adzialocha/hoffnung3000) - Platform for self-curated festivals
* [Shirokuma Cafe](https://en.wikipedia.org/wiki/Shirokuma_Cafe) - :panda_face:
