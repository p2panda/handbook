---
id: permissions
title: Permissions
---

## Key Group

The `key_group` schema is a way to group a set of public keys so that they can act as a single identity. Every member key can have different permissions limiting the extent to which they can publish operations as this single identity. Keys can only be added to a key group with a confirmation from both the key itself and an existing member key with the according permissions. Key groups can also be extended with other key groups, which extends the set of keys in the former with those from the latter. Key groups can serve as a building block for many other concepts in p2panda including identity (handles/usernames), multi-device usage, permissions and moderation.
lish operations for that key group's documents when their key group membership doesn't define the required permissions.

## Use Case

- A key group can be created using a key pair.
- A key can be added to a key group, making it a _member_.
- A key can be removed from a key group.
- A key group can be added to a key group, making it a _member_.
- Specific _permissions_ can be defined for members of a key group.
  - A membership can be limited to publishing operations in specific schemas.
  - A membership can be limited to specific operation actions (e.g. excluding `DELETE` actions).
- Specific _permissions_ can be defined for individual keys of a key group.
- Developers can make key groups the owners of a schema's documents by creating an _authorised schema_.
  - Key group members can publish operations for documents that define the key group as their owner.
  - Key group members can not publish operations for that key group's documents when their key group membership doesn't define the required permissions.

## Authorised Schemas

- authorised schemas define a key group as the owner of documents created with them
  - use an authorised schema when you want to enable all key group members with according permissions to update or delete that document
  - documents created from authorised schemas are called _authorised documents_
- schemas are _authorised schemas_ if they contain a single field of type `owner` that contains
  - either the document view id of a key group
  - or the document view id of another authorised document.
- Every document of an _authorised schema_ has a set of _authorised public keys_. This set can be created by looking at the document pointed at by the `owner` type field:
  - if it points at an authorised document, continue from there
  - if a key group is found: that key group's keys are the document's authorised public keys.
- operations of _authorised schemas_ are only materialised if they were created by a key pair included in the _authorised public keys_ of the operations's document and if that key pair membership has the required permissions for the operation.
