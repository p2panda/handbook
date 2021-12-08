---
sidebar_position: 1
---

# Encoding

- in order to write data in p2panda it needs to be encoded
- p2panda uses bamboo to encode data

## Bamboo 🎍

- todo: short description of what bamboo is
- introduce key terms:
  - _key pair_ and _public key_
  - _bamboo author_
  - _hash_
  - _entry_
  - _log_
- p2panda uses a variation of bamboo with different hashes

## Hashes

- 512 bit hashes are considered detrimental to user experience because they take up a lot of space when displayed on screen
- therefore p2panda uses [_yasmf_ hashes](https://github.com/bamboo-rs/yasmf-hash), which currently contain blake3 hashes
