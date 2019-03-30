p2panda-specification
===

This document serves as an architectural specification and design of `p2panda` for development. All content is in draft status and open for discussion.

## What is p2panda?

`p2panda` is **p2:panda_face:**

A collection of applications, libraries and tools for users and developers to set up groups, festivals, gatherings, events or spaces who focus on flat hierarchies, corruption prevention, self-organization, decentralization and generally alternative ways of organizing.

The basic data structures of `p2panda` are: `users`, `resources`, `locations` and `events`. Users create and share resources and locations and events which can then be used and visited by all other users.

It can be interesting for:

* Houseprojects, Hackerspaces or places which have multiple rooms and tools to share internally
* Organisations, initiatives or (art) projects which are active over whole cities, regions or the world
* Conferences, museums, galleries, festivals which want to experiment with alternative ways of curation
* Multiple collectives and initiatives reusing places and resources in different cities at different times
* Fun or esoteric things like a festival in only virtual spaces or even *no* places

## Goals

* Work offline and without a privileged server. `p2panda` distributes all data in a server-less peer-to-peer network structure using a [Gossip](https://en.wikipedia.org/wiki/Gossip_protocol) protocol
* `p2panda` does not require any form of authentication except of keypair verification based on self-generated cryptographic keys
* Focus on privacy through encryption for organizations sharing sensitive data
* Ensure a fork-able data structure (eg. imagine a festival which can be "cloned")
* Resources, locations and events are part of a "world-festival" and can be (re-)used by others in a different time
* Separate user applications and core libraries in separate modules to allow alternative implementations, clients etc.
* User applications should be simple, to be used by as many people as possible / accessible and non-technical
* `p2panda` should run in a browser
* Policies should not necessarily be decided in the technical architecture to keep `p2panda` as simple and uncomplicated as possible. We believe that time, space and availability policies can be discussed an announced in social ways or via other platforms (webpage).

## Semantics

* `event`, has zero to many resources. Think of an `event` as an tuple of `resources` with the special qualities of having an `event` *without* an `location` or an `event` at multiple `locations`. In addition to this tuple, an event is defined by a timeframe (*start date*, *end date*). Used resources are blocked and can not be requested by others within that timeframe.
* `resource`, belongs to many events. A resource is very loosely defined and can be anything users want to share with others (a physical object, a skill, etc.), `locations` are also `resources` and can be defined by a GPS position, (a physical address?) or a virtual address (an URL, 3D coordinate etc. ?)
* `user` is a cryptographic key pair stored on a device. `users` announce new `resources` or `events` and authorize `resource` requests of `resources` they created.
* `owner` is a `user` who announced a newly created `resource`
* `authorization` is an `owner` confirming or denying an requested `resource` for an `event`. The autorization mechanism is pluggable (default is *first come first serve*).
* `festivals` are scoped `events`. Every created `festival` shares a default *world festival context*. Think of `festivals` as subsets of the global "world festival".

## Architecture

* We need a datascheme for log messages to describe announcement, changes of `events` and `resources` plus authorization of `resources`.
* A single-writer, append-only log with no partial replication is needed, for which [bamboo](https://github.com/AljoschaMeyer/bamboo) is used.
* Inspired by [Secure Scuttlebut](https://www.scuttlebutt.nz/) a gossip protocol is used to replicate messages over an overlay network. Peers *relay* messages to other peers, even though they are not meant for them, to guarantee that messages arrive faster. The gossip Protocol implementation runs in a webbrowser and uses therefore WebRTC.
* `p2panda` reads and writes messages based on the specified dataschemes (*subjective render approach*) and offers a simple web UI (via React) to manage `resources` and `events` and the `authorization`. We use `pull-streams`.
* An API for authorization mechanisms makes `authorization` pluggable (default is *first-come-first-serve* but you could think of clicking a reject or confirm button, a telephone interview or having to play a computer game first :smile:).

## References

* [HOFFNUNG 3000](https://github.com/adzialocha/hoffnung3000) - Platform for self-curated festivals
