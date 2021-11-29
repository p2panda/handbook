---
sidebar_position: 2
---

# Key Pairs

- p2panda uses Ed25519 key pairs
- clients sign all published data with a user's key pair
- refer to [collaboration](/docs/collaboration/overview) for further topics

## Usage

- p2panda clients create key pairs for their users
  - `p2panda` includes functionality to create key pairs
- data recipients can identify the author of data from the public key and the signature on a [bamboo entry](/docs/sending-data/encoding#bamboo-)
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
