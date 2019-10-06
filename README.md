# p2🐼

p2panda is a futuristic way to get together in self-organized festivals. 

A festival can be anything you want to plan with your friends, your circle, your collective – or people you have never met before: Give p2panda to your devices and create workshops, gatherings, concerts or conferences using just the computers and phones you already have – independent of any cloud infrastructure.

What is in it?

- **Decentralised Infrastructure for Self-Organized Events:** Let your festival unfold on its own. Every connected device can register venues, materials and ressources that can then be put together by everybody to plan and document a series of events.
- **Radical Authorization:** Just install a p2panda client to get started, no need to make an account, set a password, etc. Connect with other devices to start making plans together. Everybody starts out equally: Whether you are an organizer, performer or visitor is just decided by your actions and not determined by the type of account you have.
- **Offline first:** Every device has its own copy of all information, which lets p2panda work independent of an Internet connection, obliterates a cloud infrastructure and creates an ephemeral archive for every participant. p2panda clients create a peer-to-peer network to exchange and sync information.
- **Open Protocol:** Like to code? p2panda is an easy-to-extend protocol that records the connection of users, ressources and events. You can create a serendipity bot that occasionally creates random meeting events for your festival goers, or a hardware display with a live update of the festival schedule, or an archive bot that makes available a permanent copy of the festival on the world wide web or … just imagine.
- **Warmth:** Computers make it easy to get carried away by their rigidly structured ways. However, every computer also contains an undeniable sparkle of pure chaos. We want to capture that spark to ignite a campfire for you to gather around and get cosy.

## Status Quo: October 2019

Currently, the p2panda protocol schema and implementations are being designed. This includes deciding on goals, non-goals, requirements and use cases. This document will be updated once this process has been completed.

## Design and Implementation

p2panda will be a collection of applications, libraries and tools for users, bots and developers to set up groups, festivals, gatherings, events or spaces that focus on self-organization, decentralization and generally alternative ways of organizing. 

They are connected by the p2panda protocol, which is yet to be defined. It could be an extension to an existing protocol like Secure Scuttlebutt or it could be a completely new schema.

The following lists goals and non-goals for the schema and implementations in an open basket fashion. How these are prioritised is to be declared.

### Goals for the p2panda schema

- Open schema that can be distributed by any kind of client that implements it. Make it easy for devs to extend the protocol and to create their own stuff with it.
- The schema records users, ressources, authorizations, events and festivals
  - every p2panda installation is a user but bots can also be users. `user` is a cryptographic key pair stored on a device. `users` announce new `resources` or `events` and authorize `resource` requests of `resources` they created.
  - resource` is very loosely defined and can be anything users want to share with others (a physical object, a skill, etc.), `locations` are also `resources` and can be defined by a GPS position, (a physical address?) or a virtual address (a URL, 3D coordinate etc. ?). Resources can be created by `users`, the single creator of a resource becomes its `owner`.
  - authorization` is an `owner` confirming or denying a requested `resource` for an `event`. The policy by which an owner authorizes a resource is up to that owner. P2:panda_face: will initially implement the *first-come-first-served* policy and the *manual confirmation* policy.
  - festivals` are the nestable contexts that contain resources `resources`, `events` and `authorizations`. They also provide the boundaries for gossip exchange.
- An implementation should generate a unique cryptographic key-pair on every first start, this is enough to make sure that every message the key owner sends can be verified and connected to it (if someone changed the message afterwards it will fail).
- Flexibility with regards to how ressource usage is authorized. Base case would be: A user requests usage of a ressource registered to another user. The owner confirms this request manually. Other possibilites: majority vote, automatic allocation unless there are conflicts, require multiple confirmations (e.g. any two other users must confirm)
- Plurality: Since p2panda is decentralized it is not consistent by nature, meaning that every peer sees a different part and state of it.
- Anonymity: p2panda only needs the cryptographic key-pair to verify peers and therefore does not need any authentication through email address etc. - technically speaking its not anonymous (you are still being connected to your IP address for example), but even this can be solved with the SSB Tor plugin and VPNs.
- Security: p2panda should be usable for politically sensitive plannings by offering e2e encryption. This is not implemented by default but one could think of clients which uses the NOISE protocol, Tor and private messaging / e2e encryption feature of SSB.

### Goals for p2panda implementations

- Runs in a browser, app store submission must be optional
- low energy usage 
- Allows archiving: Festival servers might be shut off one day, but since the data is on everyones machine it automatically got "backed up" by many.

### Non-Goals

- If p2panda is implemented as an extension/superset of SSB, it should be created as its own network without the need to download all of the wider SSB history
- While p2panda is intended to be flexible in use, its core use case remains organising festivals happening in a physical space with a set beginning and end and mostly human participants. 

## Use cases

These use cases describe how we imagine p2panda to be used. This does not preclude other use cases – on the contrary, our design decisions should allow for flexibility and hackability.

- Let users see a festival schedule and create events for it
- Let users schedule usage of many ressources owned by a collective / organization
- Let users setup a bot that creates random meetings between other users with random assigned ressources
- p2panda is strictly speaking just a definition of data schemas which can be distributed and interpreted by any kind of client which follows this definition. However, the use, interface and purpose on how p2panda is used is not further defined, which gives some freedom in what a client actually could be. Examples:
  - A festival tool which displays a calendar and gives the user the possibility to create own events, manage and share resources with others (this is the BLATT 3000 use-case).
  - A simple widget one can display on a page / dashboard / projector to show the next events.
  - A client which holds many resources owned by a collective / organization, it could be used as a more "professional" tool to overview where items are right now and where they are being used. Also one could think of a special procedure to authorize the use of items (for example by majority vote).
  - An independent piece of software which does not require a user interface as it acts upon p2panda autonomously. It could scrape other platforms / protocols (Twitter feeds, RSS feeds, Facebook events) and remix them, or it could be an AI bot curating the festival, actually enacting upon a real infrastructure of places, people and resources.
  - An archiving client which gathers the data it gets and re-configures / displays / exports it in some other feed in some way for documentation / presentation. It could be connected to Dat and IPFS to automatically store the data there.
  - A client which organizes random meetings between users and assigns resources to these meeting events (random meeting bot).
- Since a resource is just defined by an arbitrary title, description and image, it can be anything. Examples and possible use-cases could be:
  - A festival token you only get authorized to use when you checked in at an official festival deck. Other users will see if an event has this festival token and can "trust" this event as it got "officially" confirmed. Obviously, this is a more traditional use-case of p2panda.
  - Money can be a resource (for example in 1, 10 or 100 Euro quantities) which can be requested by anyone to realize their events. A special client holding these resources could have an authorization mechanism which distributes the funds accordingly.
  - Any URL, virtual address is a resource, so events can take place in shared documents, live streams, chats etc. Also external programs can be addressed this way, for example Dat / IPFS / SSB hashes.
  - A 3D position could be a resource, which could be used for events taking place in virtual spaces, like a computer game / VR world or any other 3D environment. One could think of a sound installation where users place sound sources and 3D objects on a X/Y/Z axis.

### Client UI / UX

- Indicate the current "health" status of yourself, how much do you "replicate" your data with others right now / how connected are you with others? This is an important indicator to make users understand about their impact on the "reach ability" by others. Since everyone serves their own data it comes with a larger responsibility to distribute it yourself / make yourself available.
- Indicate the "last active" status of others (not necessarily in time). This can be an indicator on how reliable a peer is.
- Show to everyone (not only to the organizer) how much an event is confirmed, so you can get a feeling on how realistic it is that this event will take place. This is realized by showing the confirmed state of all the requested event resources. Eg. "The event is 75% confirmed".

### Further use cases

- p2panda can be used to "hijack" other festivals. Groups can enter other festivals and register their infrastructure / events etc. to enact p2panda upon it.
- Have sub-curators during a defined (festival) time-frame. Do a "call for festivals" or a "call for collectives", curating independently but interdependently their festival logic within p2panda. They can be based on competently different clients / plugins / aesthetics / ideas / philosophies, take place in different parts of the world, but still be parse-able by others as long as they follow the p2panda data structure. Another idea is to have a "call for AIs" and ask for teams who want to contribute bot curators.
- Have virtual spaces the festival can take place in, like a 3D world / game. Users can create events in X/Y/Z positions in this 3D space.
