---
id: key-pairs
title: Key Pairs
---

- clients sign all published data with a user's key pair
- p2panda uses Ed25519 key pairs

## Usage

- p2panda clients create key pairs for their users
  - the p2panda library includes functionality to create key pairs
- data recipients can identify the author of data from the public key and the signature on a [bamboo entry](/specification/data-types/bamboo#entries)
  - the public key and signature are distributed alongside the data
- data recipients can verify the integrity of data using the signature on bamboo entries

## Key Management

- p2panda clients SHOULD generate a new key pair for every new usage context
  - the boundaries of a usage context are defined by
    - device storage
    - software distribution
    - trust
- p2panda clients SHOULD ensure that private keys cannot be read by adversaries
- p2panda clients SHOULD NOT require the transmission of a private key outside a usage context (e.g. to migrate a software installation)
