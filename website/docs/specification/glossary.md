---
title: Glossary
---

**[CBOR][cbor]**: Concise Binary Object Representation data format used for encoding [operations][operations].

**[hex-encoding][encoding]**: human-friendly representation of binary-coded values using the hexadecimal numeral system. The `p2panda` GraphQL [APIs][api]: require values to be hex-encoded.

**[Bamboo][bamboo]**: an append-only log data type that ensures security and authenticity of arbitrary data in order to share it in a decentralised and trustless setting.

**[Hashing][hash]**: a cryptography method that converts any form of data to a unique text string.

**[Hash][hash]**: the result of applying a hashing function to some data, this hash is used to uniquely identify and verify the hashed data.

**[Yasmf][yasmf]**: a multiformat hash used in `p2panda`.

**[Author (in bamboo)][bamboo-author]**: the public key included in a bamboo entry.

**[Key Pair][key_pairs]**: a string of data that is used to lock or unlock cryptographic functions, including authentication, authorization and encryption.

**Private Key**: the private key in a key pair, used for signing data.

**Public Key**: the public key in a key pair, used to identify an author and verify signed data.

**[Entry][bamboo]**: an entry in an append only log.

**[Operation][operations]**: `p2panda` data type which describes data mutations. Collections of linked operations form causal mutation graphs which are the foundation for `p2panda` [Documents][documents].

**[Document][documents]**: conflict free multi-writer data type which represents most application and system data in `p2panda`.

**Document View**

**Materialisation**

**[Author]**

**[Schema]**

**[application data]**

**[system data]**

[cbor]: /specification/encoding-data#cbor
[bamboo]: /specification/data-types/bamboo
[hash]: /specification/data-types/bamboo#hashing
[encoding]: /specification/data-types/bamboo#encoding
[bamboo-author]: /specification/data-types/bamboo#author
[key_pairs]: /specification/data-types/key-pairs
[bamboo_spec]: https://github.com/bamboo-rs/bamboo-ed25519-yasmf
[yamf]: https://github.com/AljoschaMeyer/yamf-hash
[yasmf]: https://github.com/bamboo-rs/yasmf-hash
[documents]: /specification/data-types/documents
[operations]: /specification/data-types/operations
[api]: /specification/APIs/overview
