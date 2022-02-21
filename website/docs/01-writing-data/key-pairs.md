---
sidebar_position: 2
---

# Key Pairs

All entries published using p2panda are signed with an [Ed25519][ed25519] key pair that identifies the author of the entry. The private part of this key pair should be kept safe from being accessed by adversaries.

## Copying private keys

Applications should not require copying a key pair to a different device or software installation when a user wishes to keep their identity in that new location. Instead, a new key pair should be generated for every new usage context and the new key pair should be linked to the old key pair using a [key group][key_group].

## Verifying public keys

As public keys are embedded in Bamboo entries, p2panda does not require a directory of public keys. However, it may be desirable to allow users to verify a peer's public key, for example by displaying it as a QR code and providing a mechanism to scan and verify these QR codes when peers meet physically.

[ed25519]: https://ed25519.cr.yp.to/
[key_group]: /docs/collaboration/key-groups