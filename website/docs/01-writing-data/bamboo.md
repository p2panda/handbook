---
id: bamboo
---

# Bamboo

- in order to write data in p2panda it needs to be encoded
- p2panda uses [bamboo][bamboo_spec] to encode data
  - this handbook doesn't repeat everything that's in the bamboo spec, so it might be helpful to have a look at that (it's not too long)
- bamboo is an append-only data structure that allows encoding arbitrary data in order to share it among peers without trust in the data transmission
  - bamboo organises data by _author_
  - every author has many [_logs_](#logs), each of which contains many _entries_
  - entries are the container for individual pieces of data that we want to publish
  - the following sections explain how these concepts from bamboo are used in p2panda
- p2panda uses bamboo with [_yasmf_ hashes](https://github.com/bamboo-rs/yasmf-hash)

### Authors

- data published using bamboo always belongs to the public key that signed it, this key is called _author_ in bamboo
- people who use p2panda can have access to more than one key pair, which is why we don't call public keys _author_, as bamboo does, we call them _public key_
  - p2panda users may have more than one key because every device uses an additional key
- have a look at the [key pairs][key_pairs] section of this handbook for more detailed information on this topic

### Logs

- when a _bamboo author_ publishes data they assign it to a log, which is identified by an integer number
  - every author has 2^64 logs available to them
- in p2panda every log is used to collect a key pair's contributions to one [document][documents]
- every log contains up to 2^64 - 1 entries

### Entries

- p2panda uses Bamboo entries to record changes of data while giving us cool features like partial replication, cryptographic integrity and authenticity
  - every individual change is recorded inside an entry
  - we call these changes _operations_
- have a look at the [operations][operations] section of this handbook for more detailled information on this topic

[key_pairs]: /docs/writing-data/key-pairs
[bamboo_spec]: https://github.com/bamboo-rs/bamboo-ed25519-yasmf
[documents]: /docs/organising-data/documents
[operations]: /docs/writing-data/operations
