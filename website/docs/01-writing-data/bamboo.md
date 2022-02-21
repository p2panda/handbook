---
sidebar_position: 1
---

# Bamboo

All data transferred in the p2panda network is contained in the [Bamboo][bamboo_spec] data structure. Bamboo is the most basic building block for everything else in p2panda so let's look at its components and how they are used in p2panda. This page doesn't try to describe Bamboo in detail though, for that we recommend looking at the [bamboo specification][bamboo_spec]. Instead we'll do a quick overview and focus on how the components of Bamboo are used in p2panda.

## Overview 🎍

Bamboo is an append-only log data structure - it allows p2panda to write data in such a way that after transferring it to other computers they can verify it hasn't been tampered with during transmission even when that transmission had many stops. Very useful for what we're up to! Bamboo also lets us verify the authorship of the data using digital signatures. Not all the data needs to be transferred at once, it can happen progressively and new data can be added later. The recipient can always reconstruct the order in which the data was originally published and whether there are any gaps in the data it has received. There are many more features and interesting properties that we'll get to later, let's continue by having a look at how data is organised in Bamboo.

### Authors

Data published using Bamboo always belongs to the public key of the cryptographic key pair that signed it, this public key is called a _Bamboo author_. Specifically this is an [Ed25519 key pair][ed25519]. Other software that uses public-key cryptography often has usability issues around transferring private keys to all machines they should be used on while also keeping them secret. In p2panda, many public keys can be linked together to form a single identity, which avoids the need to transmit private keys at all. 

This also means that in p2panda, a single human being can sign content using many different key pairs. But public keys are called "author" in Bamboo, which is confusing when one person is many authors. Therefore, p2panda does not call public keys "author", as Bamboo does, but just calls them "public key" instead. 

### Logs

The next level of data organisation is [_logs_](#logs): Every author has many logs they can write data to, 2^64 to be exact, which comes out to about 18 quintillion. It's probably safe to say you won't run out of logs! In p2panda every log is used to collect a public key's contributions to one [document][documents]. Logs are often pretty independent of each other so participants in the p2panda network that are only interested in some documents can choose to create copies only of some logs of an author and not others.

Every log then contains up to 2^64 - 1 _entries_, the smallest unit of data in Bamboo. 

### Entries

Bamboo entries are like crates that contain individual pieces of data that we want to transmit. In p2panda, every entry is associated with an atomic change to a document, something that's called an _operation_. This _payload_ is not part of the entry itself so the entry can be very tiny. This is so it can be transmitted quickly and independent of its operation payload. Entries also contain other pieces of metadata, which can be used to validate and reconstruct a Bamboo author and its logs from their entries. 

The link between an entry and its operation payload, as well as between different entries is established using hashes. p2panda uses [YASMF hashes][yasmf], which are based on [Blake3][blake3]. This is what a YASMF hash looks like:

`00204382699079de58963cba13782802e290dea52f6564b8acc6e2e5da19aebf0ad2`

Pretty, isn't it? The next chapter will go into some details about key pairs and identity.

[bamboo_spec]: https://github.com/bamboo-rs/bamboo-ed25519-yasmf
[blake3]: https://github.com/BLAKE3-team/BLAKE3#
[documents]: /docs/organising-data/documents-instances
[ed25519]: https://ed25519.cr.yp.to/
[key_pairs]: /docs/writing-data/key-pairs
[operations]: /docs/writing-data/operations
[yasmf]: https://github.com/bamboo-rs/yasmf-hash
