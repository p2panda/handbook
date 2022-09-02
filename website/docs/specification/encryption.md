---
id: encryption
title: Encryption
---

# Encryption: Secret Group

p2panda uses the [MLS][mls] (Messaging Layer Security) protocol for group key negotiation to establish secrets in a large group of users.

To allow flexibility for developers, p2panda offers two different settings of encryption: "Sender Ratchet Secrets" or "Long Term Secrets". Both settings give confidentiality, authenticity and post-compromise security, while the sender ratchet scheme also gives forward secrecy.

A group of users sharing that secret state is called a "secret group" in p2panda.

## Background

p2panda is essentially a decentralised database in a trustless network of computers which implies that all user data is stored on the hard disc of an unknown person. To protect data from being read without permission we introduce Secure Groups which allow secure data encryption for any size of group of p2panda users.

Encryption for a large group of users is already challenging, in a decentralized, trustless setting it gets even harder. p2panda does not "invent" its own solution but relies on the MLS "Messaging Layer Security" protocol to provide state-of-the-art secure group messaging.

Strong security guarantees do not come "for free", rather with a couple of caveats which might be confusing for the end users, for example: "Why did my history disappear when I logged in on a new machine?".

With this dichotomy in mind, p2panda's Secure Groups are designed to provide different security schemes for developers, to be able to decide for the right balance of usability and security, based on the needs of the users or communities, threat-models and use-cases.

## Security Settings

### Plaintext

Data is stored without any encryption.

**Advantages:**

- Very easy to implement
- No UX issues in terms of encryption

**Disadvantages:**

- Data (from the past) can be read by any peer in the network

**Examples:**

- Wiki
- News / Magazine
- ...

### Long Term Secrets

Long living AEAD secrets, derived from MLS exporter, used until group admin decides to rotate secret, gives Post-Compromise Security (PCS).

**Advantages:**

- Secret can be rotated to disallow removed members to read future data
- Members who join the group later can still access past data
- Client don't need to store the decrypted data anywhere

**Disadvantages:**

- Larger groups might leak easier the secret
- Attacker will have access to any past data as soon as the secret got compromised

**Examples:**

- Club Membership
- Community Chat

### Sender Ratchet Secrets

Epheremal AEAD secrets, derived from MLS Secret Tree of current group epoch, used on per-message base, gives Forward Secrecy (FS) and Post-Compromise Security (PCS).

**Advantages:**

- Provides strong security for any size of group, even very large groups
- Every message is encrypted with an individual key, attackers will not be able to read past data or future data when a key got compromised

**Disadvantages:**

- Members joining a group later will not be able to decrypt past data
- Clients have to store decrypted messages somewhere on their end as keys get useless soon

**Examples:**

- Private Chat

## System schemas

### `SecretGroup`

```
SecretGroup {
  lts_ciphersuite: LongTermSecretCiphersuite,
}
```

### `KeyPackage`

```
KeyPackage {
  // Pointer at previous KeyPackage from that author
  previous_key_package: authorized_relation(KeyPackage),

  // Signed MLS Key Package data
  mls_key_package: binary(KeyPackage) {
    payload: binary {
      // See MLS Specification Section 7. "Key Packages" for encoded data
    },
    signature: binary,
    encoded: binary,
  }
}
```

### `SecretGroupCommit`

```
SecretGroupCommit {
  // Points at the secure group this commit belongs to
  secret_group: authorized_relation(SecretGroup),

  // Points at the previous commit to bring them into an order
  previous_commit: authorized_relation(SecretGroupCommit),

  // MLS Commit Message
  mls_commit_message: binary(MlsPlaintext) {
    // See MLS Specification Section 9. "Message Framing" and 11.2. "Commit" for encoded data
  },

  // MLS Welcome Message, this is usually sent separately from the Commit to only the members who will join a group. Since we broadcast data anyway we embed the (optional) Welcome message into the `SecretGroupCommit` as well.
  mls_welcome_message: ? binary(Welcome) {
    // See MLS Specification Section 11.2.2. "Welcoming New members" for encoded data
  },

  // A list of all and past long term secrets of this group, it is encrypted by MLS for the current group epoch of this commit.
  encrypted_long_term_secrets: binary(SecretGroupMessage::MlsApplicationMessage) (
    // See Specification `SecretGroupMessage`
    ...
    ciphertext: binary(TLSVecU32) [
      binary(LongTermSecret) {
        // See Specification `LongTermSecret`
      },
    ],
  ),
}
```

## Usage of secure operation fields

```
<OperationSchema> {
  <key>: {
    secret: SecretGroupMessage {
      // See Specification `SecretGroupMessage`
    },
  },
  ...,
}
```

## Operation field Data Type

### `SecretGroupMessage`

```
enum SecretGroupMessage {
  LongTermSecretMessage(
    LongTermSecretCiphertext {
      // See Specification `LongTermSecretCiphertext`
    },
  ),
  MlsApplicationMessage(
    MlsCiphertext {
      // See MLS Specification Section 9. "Message Framing" for encoded data
    },
  ),
}
```

## Long Term Secret Data Types

### `LongTermSecret`

```
LongTermSecret {
  group_id: GroupId,
  ciphersuite: LongTermSecretCiphersuite,
  long_term_epoch: LongTermSecretEpoch,
  value: TLSByteVec8,
}
```

### `LongTermCiphertext`

```
 LongTermSecretCiphertext {
  group_id: GroupId,
  long_term_epoch: LongTermSecretEpoch,
  nonce: TlsByteVecU8,
  ciphertext: TlsByteVecU8,
}
```

### `LongTermSecretCiphersuite`

```
enum LongTermSecretCiphersuite {
  PANDA10_AES128GCM = 0x01,
  PANDA10_AES256GCM = 0x02,
  PANDA10_CHACHA20POLY1305 = 0x03,
}
```

### `LongTermSecretEpoch`

```
LongTermSecretEpoch(u64)
```

## Group evolution

### Create group

1. A client chooses a `LongTermSecretCiphersuite` and announces a new secret group by creating a new `SecureGroup` instance. The resulting hash of this instance is used as the `group_instance_id`.
2. Together with the `group_instance_id` (used as the MLS group id) and a newly generated MLS `KeyPackage` from the owner, a new MLS group is established (see [MLS Specification 10. "Group Creation"](https://messaginglayersecurity.rocks/mls-protocol/draft-ietf-mls-protocol.html#name-group-creation)). The used key package is created and directly used and does not need to be published on the network.
3. The secret group establishes its internal `LongTermSecretEpoch` counter at `0`, generates a first `LongTermSecret`. Every `SecretGroup` holds at least one long term secret, even when this group is not using any.

### Long Term Secret Generation / Rotation

Creating the first or rotating a long term secret follows the same procedure. A long term secret MUST only be generated by the owner of the `SecretGroup`.

New long term secrets are not directly announced in the network after generation. Only when the MLS group evolves in its epoch with a `SecretGroupCommit`, the newly generated long term secrets are encrypted and broadcasted to all group members.

Every generation MUST result in a new, unique secret. It is not recommended to generate more than one long term secret before creating a new `SecretGroupCommit` as the secret group does not gain more security from it.

1. Increment the internal `LongTermSecretEpoch` counter by `1`.
2. Derive an AEAD key for the given `LongTermSecretCiphersuite` by using the internal MLS exporter with the following label: "long_term_secret" (constant value) + current long term secret epoch (incrementing nonce).
3. Store the used `group_instance_id`, long term secret ciphersuite, AEAD key and long term secret epoch in a `LongTermSecret` object.

### Add / Remove / Update group members

A `SecretGroupCommit` MUST only be generated by the owner of the `SecreGroup`.

Adding, removing or updating group members yield a `SecretGroupCommit` which is then announced on the network for all secret groups members to update their internal MLS group state and learn about the latest long term secrets.

1. Add / Remove / Update MLS group members (see [MLS Specification 11. "Group Evolution"](https://messaginglayersecurity.rocks/mls-protocol/draft-ietf-mls-protocol.html#name-group-evolution)), optionally using `SecretGroupProposals` on the network for the given secret group.
2. The resulting MLS Commit message MUST be directly processed by the group owner to establish the new internal group state and key material for this MLS epoch.
3. All currently given `LongTermSecrets` at this point are collected in an array, sorted by epoch number and encoded via TLS.
4. The encoded TLS payload is encrypted using the "Sender Ratchet Secret" of the groups new MLS state.
5. The result is wrapped in a `SecretGroupMessage` holding a `MlsCiphertext`.
6. Containing the MLS commit in plaintext, an optional MLS `Welcome` message (only when adding group members) and the `SecretGroupMessage` with the encrypted long term secrets the `SecretGroupCommit` is announced on the network as a new instance.
7. The `SecretGroupCommit` MUST point at the previous commit instance, expect of when it is the first.

### Processing commits

All group members, except of the group owner need to process `SecretGroupCommit` instance.

1. Take MLS commit from `SecretGroupCommit` and apply it to MLS group to establish the new group state.
2. Check if the member is still part of the group after the commit, if yes we can decrypt the encoded long term secrets payload knowing the new group state. The resulting plaintext is an array of all known `LongTermSecrets`.
3. Store all new long term secrets, remove duplicates (same `LongTermSecretEpoch`).

### Join existing group

Invited group members can join a secret group by applying the given `SecretGroupCommit` instance which MUST contain a `Welcome` message for the new members.

1. Take MLS welcome from `SecretGroupCommit` and use it to establish MLS group state.
2. Decrypt the encoded long term secrets payload knowing the new group state. The resulting plaintext is an array of all known `LongTermSecrets`.
3. Store all new long term secrets.

### Announce members

Clients can announce themselves on the network by publishing `KeyPackage` instances containing key material which is used by MLS to invite new members into a secret group.

1. Use p2panda `PublicKey` as an unique `Credential` identifier for a secret group member. Use p2panda `PrivateKey` to sign new MLS key packages.
2. Generate new `KeyPackage` and publish it as instance.

### Encryption

#### Sender Ratchet Secrets

1. Encrypt Operation field values using the MLS "Sender Ratchet" encryption mechanism (see [MLS Specification 9.3. "Sender Data Encryption"](https://messaginglayersecurity.rocks/mls-protocol/draft-ietf-mls-protocol.html#name-sender-data-encryption))
2. Wrap resulting MLS Ciphertext in `SecretGroupMessage`.

#### Long Term Secrets

1. Get AEAD key from latest `LongTermSecret` (the one with the highest `LongTermSecretEpoch`).
2. Increment internal AEAD nonce counter by one.
3. Generate a new AEAD nonce for the given `LongTermSecretCipersuite` using the MLS exporter with the following label: "long_term_nonce" (constant value) + public key of client + current AEAD nonce (incremental).
4. Encrypt given Operation field value with AEAD nonce, key and encryption method.
5. Wrap resulting `LongTermSecretCiphertext` in `SecretGroupMessage`.

### Decryption

#### Sender Ratchet Secrets

1. Extract `group_instance_id` and `epoch` from `SecretGroupMessage` and make sure it matches with current MLS group state.
2. Download and process new `SecretGroupCommits` for the `SecretGroup` when given.
3. Decrypt protected Operation field values with known MLS group secrets.

#### Long Term Secrets

1. Extract `group_instance_id`, `LongTermSecretEpoch`, AEAD nonce and ciphertext from `SecretGroupMessage`.
2. Download and process new `SecretGroupCommits` for the `SecretGroup` when given.
3. Look up `LongTermSecret` for the given epoch.
4. Decrypt protected Operation field values with AEAD key and used AEAD nonce.

## Materialization

**Client**

1. I'm starting a p2panda client
2. I'm downloading instances via GraphQL of something this client is interested in
3. I detect that some values of these instances are encrypted
4. I read what `SecretGroup` instance these ciphertexts belong to
5. I query which commit addresses me, download all `SecretGroupCommits` from that point on
6. I process the Welcome message via `new_from_welcome` in that `SecretGroupCommit` which addresses me
7. I decrypt the instance field value

**Node**

The Welcome message contains information about who gets added (see `KeyPackageRef` in Section 11.2.2).

1. During materialization the node would look at every `SecretGroupCommit`
2. Check if its an Add, Remove or Update Commit
3. If its an Add Commit, it would look into the Welcome message and attached `KeyPackageRef` values
4. It would store these information in the database and make them queryable

## Design notes

- It is theoretically possible to remove secrets or even reset all secrets during a new MLS group epoch for special scenarios (for example the group decides to not allow any new members to access previous data). The protocol does not prescribe any integrity of the long term secrets, though the default implementation will keep all secrets for now.
- `SecretGroupCommit` operations can only be created by one key pair to keep risk of merge conflicts as small as possible (see notes below on "Group admin centralisation")
- Explain why we encrypt only message values and leak meta data: Node / Client separation
- Mention burner key pairs: https://decentpatterns.xyz/library/disposable-identity/
- Mention why we sign things multiple times (MLS signatures + p2panda signatures)

## Potential issues

- Group admin centralisation:
  - Group starvation when group admin client is not responsive
  - Group admin can ignore update proposals and lower security of the group
  - Note: it is theoretically possible to design a multi-writer setting around secret group commits to decentralize group admins but this comes with other problems (eventual consistency gets even harder)
  - One scenario is to start a new group with the same secrets
- Clients which are not informed about the latest MLS group epoch could encrypt messages based on outdated secrets. Clients could keep past MLS group states to account for messages encrypted in previous epochs, for example in cases of network partition
- MLS application messages are generated with an internal ordering which has a certain tolerance. This out-of-order tolerance should be fairly high in p2panda settings
- `KeyPackage` instances have an `LifeTimeExtension` which is timestamp based, this timestamp can theoretically be ignored in a trustless setting
- InitKeys could potentially be reused. Clients should send a DELETE operation to key packages after they've joined a group.

[mls]: https://messaginglayersecurity.rocks/
[secret_groups]: https://laub.liebechaos.org/BmT9pLorTOeu5SsV-4vp6w
