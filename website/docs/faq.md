---
title: FAQ
---

## Can I use p2panda already?

We're very close to a first stable core specification and reference implementation but would like a little bit more time to _use_ p2panda before we decide on a first version. You can already write applications on top of p2panda, but beware that there might be still some breaking API changes. Also please note that p2panda has not been audited yet for any security vulnerabilities.

## How about permissions?

All data can be edited and deleted by everyone by default. For the future it will be possible to use a [Key Group](/specification/authorisation). Key groups maintain ownership and permissions for many public keys of documents and allow you to form more complex permission models. We're currently finalising the specification of key groups and will begin implementation soon. If you're already concerned about permission you could filter out writes by unknown public keys in your node for example.

## Is p2panda decentralised or federated?

It can be both! We thought its good to let the developers, users and communities decide what setting is best for them.

## Can I upload images, videos, audio with p2panda?

We haven't build a "Blob" (Binary Large Object) feature into p2panda yet, though we're already having many [ideas](https://github.com/p2panda/handbook/labels/Blobs) (think BitTorrent with social and encryption features, materialization of data directly into the file system and serving it via HTTP on nodes). If you already want to use images in your p2panda applications, there is a workaround: Encode the image data as base64 and handle store it inside the operation as a string.

## Do you have CRDTs?

Yes, p2panda _Operations_ are Conflict-Resistant-Data-Types (CRDTs). The cool thing is you can define any shape of data and p2panda will figure out how to handle merge conflicts automatically.

## Why is there a "server" in a decentralised protocol?

p2panda has been designed with browser-friendliness in mind as it is still very hard to build full p2p applications running only in browsers, besides they can become slow on mobile devices when doing all of the heavy work. For this reason p2panda can be used with an external node (you can also call it "server") which does the heavy lifting for browser clients. You don't have to do this if you're interested in fully decentralised setups (you can embed a node _inside_ of your client). That being said, it is still not possible to reliably discover other nodes in a p2p network without some sort of signalling server infrastructure.

## Does p2panda encrypt data?

By default all published data is not encrypted. p2panda offers [Secret Group](/specification/encryption) to allow optional group encryption between multiple peers. For this p2panda uses [Messaging Layer Security](https://messaginglayersecurity.rocks/) (MLS) under the hood. While technically it is already possible to write encrypted applications (we will provide an example soon), we are still working on a high-level API which will make using encryption more seamless for developers.

## Does p2panda run on smartphones?

We already did some experiments with running p2panda nodes via [Termux](https://termux.dev/en/) on our Android phones with very low memory footprints and without any problems. If [Tauri](https://tauri.app/) starts supporting Android, Windows and iOS builds out-of-the-box it will be very easy to integrate a p2panda node there as well. Until then you can try the [hacky path](https://hackmd.io/XIcEwk4GSxy8APZhSa0UnA) with this document from the Tauri team (we might try it ourselves soon as well and share an example here).

## Is p2panda "offline-first"?

Yes, you can embed an p2panda [node](https://github.com/p2panda/aquadoggo) inside of your application, so it will live right next to your client, locally on your machine. With this approach you can still publish data to a node even when you are offline.

## How can I refer to another document?

If you're looking for expressing relations between different sorts of data, similar to SQL, you should read about relation fields in operations. With p2panda you can express a reference to another document which automatically gets materialised in a GraphQL query.

## Can nodes replicate data with each other?

While we're having a simple replication mechanism already implemented you can use, it is also not very ergonomic yet. Currently you need to manually specify the IP address, author and log id of the Bamboo entries you want to replicate, which is tedious. We're using this currently as a proof-of-concept and will transition to a more intuitive, scaleable and efficient approach using [qp2p](https://github.com/maidsafe/qp2p) based on QUIC.

## Can nodes already find each other on the network?

We haven't implemented discovery yet but will begin soon with simple mDNS discovery in local networks. Later on we're imagining signalling servers who will help us with getting around the limitations of [NAT traversal](https://tailscale.com/blog/how-nat-traversal-works/) in p2p networks.

## Can I delete data?

Even though p2panda is built upon an append-only log, by specification data does not need to be stored forever. p2panda aims at being data-efficient and has [deletion](/learn/entries/#deletion) built-in into the core data type without losing its cryptographic features.

## How can I keep old data?

If you want to keep historical data you can create a "pinned relation" which will "pin" the document view in its given state. Nodes will detect there is a dependency to this particular version and usually not automatically delete pinned document views.

## Wasn't there something about a festival?

Yes! We started as a group which wanted to build a p2p [festival organisation tool](https://github.com/p2panda/festival-tool) and p2panda came out of that. We will still make a festival client (on top of p2panda) and probably organise a festival sometime!

## How can I contact you?

Write us an email at [contributors@p2panda.org](mailto:contributors@p2panda.org).
