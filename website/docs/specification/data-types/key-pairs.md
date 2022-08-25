---
id: key-pairs
title: Key Pairs
---

:::caution Requirement KY1

Key pairs MUST use ED25519 keys.

:::

Correct hexadecimal encoding (when using human-readable encoding format) (#OP1)

- A key pair is used to sign Bamboo entries and their payloads.
- The public key of a key pair is embedded in Bamboo entries and therefore always available when verifying an entry and its payload.

## Usage

- p2panda clients create key pairs for their users
- Data recipients can identify the author of data from the public key and the signature on a [bamboo entry](/specification/data-types/bamboo#entries).
  - The public key and signature are distributed alongside the data.
- Data recipients can verify the integrity of data using the signature on bamboo entries.

## Key Management

:::caution Requirement KY2

p2panda clients SHOULD generate a new key pair for every new usage context. The boundaries of a usage context are defined by 1) device storage, 2) software distribution and 3) trust.

:::

- This lowers the chance of producing a fork in a Bamboo log.
  - A Bamboo log has a fork when two entries with the same sequence number exist in it.

:::caution Requirement KY3

p2panda clients SHOULD ensure that private keys cannot be read by adversaries.

:::

:::caution Requirement KY4

p2panda clients SHOULD NOT require the transmission of a private key outside a usage context.

:::

- Transmitting a private key outside of its usage context might be attractive e.g. to migrate a software installation but it is considered a security risk, can lead to forks and hard to get right in terms of user experience.
