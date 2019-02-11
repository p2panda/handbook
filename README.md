p2panda-specification
===

This document serves as an architectural specification and design of `p2panda` for development. All content is in draft status and open for discussion.

## What is p2panda?

A collection of applications, libraries and tools for users and developers to set up groups, festivals, gatherings, events or spaces who focus on flat hierarchies, corruption prevention, self-organization, decentralization and generally alternative ways of organizing.

The basic data structures of `p2panda` are: `users`, `resources`, `locations` and `events`. Users create and share resources and locations and events which can then be used and visited by all other users.

## Goals

* Work offline and without a privileged server. `p2panda` distributes all data in a server-less peer-to-peer network structure based on the [Dat](https://datproject.org/) protocol
* Allow anonymous forms of organizing through optional usernames, `p2panda` does not require any form of authentication except of keypair verification based on self-generated cryptographic keys
* Focus on privacy through encryption (following Dat [NOISE](https://noiseprotocol.org/) protocol implementation) for organizations sharing sensitive data
* Ensure a fork-able data structure (eg. imagine a festival which can be "cloned")
* Separate user applications and core libraries in separate modules to allow alternative implementations, clients etc.
* User applications should be simple, to be used by as many people as possible / accessible and non-technical

## Semantics

* `event`, has zero to many resources and one location. An event is defined by a timeframe (*start date*, *end date*) in a location. Used resources and the location are blocked and can not be requested by others within that timeframe.
* `location`, belongs to many events. A location can be defined by a GPS position, (a physical address?) or a virtual address (an URL, 3D coordinate etc. ?)
* `resource`, belongs to many events. A resource is very loosely defined and can be anything users want to share with others (a physical object, a skill, etc.)
