---
title: FAQ
---

## Can I use p2panda already?

You can already write full p2p applications on top of p2panda since all core features (collaborative editing, schemas, queries, discovery, replication, blobs etc.) are implemented and stable, still we do not recommend to run these applications in untrusted and open network scenarios. p2panda has not been audited yet for any security vulnerabilities and still lacks important features around security and data privacy. With this years funding we're focusing on capabilities and encryption followed by a security audit. After this period we will reach our first official release where we can assure security and privacy over user data.

## How about permissions?

All data can currently be edited and deleted by everyone. In our upcoming funding period we will be focussing on introducing a capability system to allow more fine-grained control over what permissions users have, including reading, writing and deleting data but also custom permissions which are specific to your application logic.

## Is p2panda decentralised or federated?

It can be both! We thought it's good to let the developers, users and communities decide what setting is best for them. In any case, independent of how the users finally run their nodes, they will always be able to talk to each other, whether they are hosted locally (decentralised) or shared between many clients (federated).

## Can I upload images, videos, audio with p2panda?

Yes! The blob feature is inspired by BitTorrent but with social and encryption features on top. Data is sliced into 256kb pieces and identified with a hash as it is based on our p2panda core data types. We materialize data directly into the file system and serve it via HTTP on nodes.

## Do you have CRDTs?

Yes, p2panda _Operations_ are Conflict-free Replicated Data Types (CRDTs). The cool thing is you can define any shape of data and p2panda will figure out how to handle merge conflicts automatically.

## Why is there a "server" in a decentralised protocol?

p2panda has been designed with browser-friendliness in mind as it is still very hard to build full p2p applications running only in browsers, besides they can become slow on mobile devices when doing all of the heavy work. For this reason p2panda can be used with an external node (you can also call it "server") which does the heavy lifting for browser clients. You don't have to do this if you're interested in fully decentralised setups (you can embed a node _inside_ of your client). That being said, it is still not possible to reliably discover other nodes in a p2p network without some sort of signalling server infrastructure.

## Does p2panda encrypt data?

By default all published data is not encrypted. p2panda offers [Secret Group](/specification/encryption) to allow group encryption between multiple peers. For this p2panda uses [Messaging Layer Security](https://messaginglayersecurity.rocks/) (MLS) under the hood. While technically it is already possible to write encrypted applications (we will provide an example soon), for the upcoming funding period we are working on a high-level API which will make using encryption more seamless for developers.

## Does p2panda run on smartphones?

Yes! Very well actually, [we've shipped an Android app](https://github.com/p2panda/meli/) built with flutter using p2panda with FFI bindings inside of it.

## Is p2panda "offline-first"?

Yes, you can embed an p2panda [node](https://github.com/p2panda/aquadoggo) inside of your application, so it will live right next to your client, locally on your machine. With this approach you can still publish data to a node even when you are offline.

## How can I refer to another document?

If you're looking for expressing relations between different sorts of data, similar to SQL, you should read about relation fields in operations. With p2panda you can express a reference to another document which automatically gets materialised in a GraphQL query.

## Can nodes replicate data with each other?

Yes! We have a [replication protocol](/specification/replication) which is implemented in [`aquadoggo`](https://github.com/p2panda/aquadoggo/). The nodes will automatically discover and sync with each other.

## Can nodes already find each other on the network?

Yes! Nodes can find each other in a local network via mDNS and on the internet with the help of rendesvouz nodes. Check out [`aquadoggo`](https://github.com/p2panda/aquadoggo/) which is our current node implementation.

## Can I delete data?

Our data types support deletion of different kinds, either in form of "garbage collection" (automatically detecting and removing unused data), "pruning" (removing history of a document) or "full deletion" (removing everything), even without leaving a tombstone for each deleted document. Please note that while we have ideas and specifications for these things actual deletion is not implemented yet but we're aiming for it in our next funding period. For the future we're also looking into making ephemeral documents a default, data will automatically be deleted when it has not been explicitly kept alive after a certain amount of time.

## How can I keep old data?

If you want to keep historical data you can create a "pinned relation" which will "pin" the document view in its given state. Nodes will detect there is a dependency to this particular version and usually not automatically delete pinned document views.

## Wasn't there something about a festival?

Yes! We started as a group which wanted to build a p2p [festival organisation tool](https://github.com/p2panda/festival-tool) and p2panda came out of that. We will still make a festival client (on top of p2panda) and probably organise a festival sometime!

## How can I contact you?

Write us an email at [contributors@p2panda.org](mailto:contributors@p2panda.org).
