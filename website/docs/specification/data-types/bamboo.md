---
id: bamboo
title: Bamboo
---

:::note Requirement BA1

p2panda uses [Bamboo Ed25519 Yasmf][bamboo_spec] to encode data.

:::

- p2panda is built on [bamboo][bamboo_spec] as the data structure that is used to encode data.
  - This handbook doesn't repeat everything that's in the bamboo spec, so it might be helpful to have a look at that (it's not too long).
- Bamboo is an append-only data structure that allows encoding arbitrary data in order to share it among peers without trust in the data transmission.
  - Bamboo organises data by _author_
  - Every author has many [_logs_](#logs), each of which contains many _entries_.
  - Entries are containers for atomic pieces of data that we want to publish.
  - The following sections explain how these concepts from bamboo are used in p2panda

### Hashing

:::note Requirement BA2

[_Yet Another Smol Multifactor Hash_ (YASMF)][yasmf] MUST be used to produce hashes for Bamboo entries and payloads.

:::

- The original Bamboo requires [_YAMF-hashes_][yamf] to verify the integrity of entries and logs.
  - YAMF is a multiformat hash that only adds new hash functions when previous once have been discovered to be broken.
- However, p2panda uses bamboo with [_YASMF_-hashes][yasmf].
  - YASMF has the additional requirement that hash functions should be chosen that produce shorter hashes.
  - At the time of writing, YASMF only contains the Blake3b hash, which therefore is the hash function used throughout p2panda. It is fast, safe, and produces hashes that are just 32 bytes long.

### Encoding

:::note Requirement BA3

Bamboo entries MUST be encoded using hexadecimal encoding with lowercase characters. Each byte of the Bamboo entry MUST be encoded using two hexadecimal digits.

:::

- p2panda uses hex-encoding to make it nicer for humans to look at the data.

### Authors

:::info Definition: Author

A p2panda author is a human or bot who publishes data using p2panda. Authors may have more than one key pair.

:::

- Data published using Bamboo always belongs to the public key that signed it, this key is called _author_ in Bamboo.
- People and bots who use p2panda can have access to more than one key pair, which is why we don't call public keys _author_, as Bamboo does, we call them _public key_.
  - Data in p2panda belongs to the _key pair_ that signed it.
  - p2panda users may have more than one key because every device uses an additional key.
- Have a look at the [key pairs][key_pairs] section of this handbook for more detailed information on this topic.

### Logs

- When a key pair publishes data it is assigned to a Bamboo _log_, which is identified by an integer number.
  - Every key pair has 2^64 logs available to them.
- In p2panda every Bamboo log is used to collect a key pair's contributions to one [document][documents].
- Every log contains up to 2^64 - 1 entries.

### Entries

- p2panda uses Bamboo entries to record changes of data while giving us cool features like partial replication, cryptographic integrity and authenticity.
  - Every atomic change is recorded inside an entry.
  - We call these changes _operations_.
- Have a look at the [operations][operations] section of this handbook for more detailled information on this topic.

[key_pairs]: /specification/data-types/key-pairs
[bamboo_spec]: https://github.com/bamboo-rs/bamboo-ed25519-yasmf
[yamf]: https://github.com/AljoschaMeyer/yamf-hash
[yasmf]: https://github.com/bamboo-rs/yasmf-hash
[documents]: /specification/data-types/documents
[operations]: /specification/data-types/operations
