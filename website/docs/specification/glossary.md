---
title: Glossary
---

* **Private Key**: The private key in a key pair, used for signing data.
* **Public Key**: The public key in a key pair, used to identify an author and verify signed data.
* **[Author (in Bamboo)][bamboo-author]**: The public key included in a Bamboo entry.
* **[Bamboo][bamboo]**: An append-only log data type that ensures security and authenticity of arbitrary data in order to share it in a decentralised and trustless setting.
* **[CBOR][cbor]**: Concise Binary Object Representation data format used for encoding [operations][operations].
* **[Document][documents]**: Conflict free multi-writer data type which represents most application and system data in p2panda.
* **[Entry][bamboo]**: An entry in an append only log.
* **[Hash][hash]**: The result of applying a hashing function to some data, this hash is used to uniquely identify and verify the hashed data.
* **[Hashing][hash]**: A cryptography method that converts any form of data to a unique text string.
* **[Hexadecimal Encoding][encoding]**: Human-friendly representation of binary-coded values using the hexadecimal numeral system. The p2panda GraphQL [APIs][api] require values to be hex-encoded.
* **[Key Pair][key_pairs]**: A string of data that is used to lock or unlock cryptographic functions, including authentication, authorization and encryption.
* **[Operation][operations]**: p2panda data type which describes data mutations. Collections of linked operations form causal mutation graphs which are the foundation for p2panda [Documents][documents].
* **[Yasmf][yasmf]**: A multiformat hash used in p2panda.

[api]: /specification/APIs/overview
[bamboo-author]: /specification/data-types/bamboo#author
[bamboo]: /specification/data-types/bamboo
[bamboo_spec]: https://github.com/bamboo-rs/bamboo-ed25519-yasmf
[cbor]: /specification/encoding-data#cbor
[documents]: /specification/data-types/documents
[encoding]: /specification/data-types/bamboo#encoding
[hash]: /specification/data-types/bamboo#hashing
[key_pairs]: /specification/data-types/key-pairs
[operations]: /specification/data-types/operations
[yamf]: https://github.com/AljoschaMeyer/yamf-hash
[yasmf]: https://github.com/bamboo-rs/yasmf-hash
