# Key Group

## Summary

The `key_group` schema is a way to group a set of public keys so that they can act as a single identity. Every member key can have different permissions limiting the extent to which they can publish operations as this single identity. Keys can only be added to a key group with a confirmation from both the key itself and an existing member key with the according permissions. Key groups can also be extended with other key groups, which extends the set of keys in the former with those from the latter. Key groups can serve as a building block for many other concepts in p2panda including identity (handles/usernames), multi-device usage, permissions and moderation.

## User stories

> Describe who is affected by your proposal and what changes they can expect by writing user stories about it. It can help to think about the questions: Why are we doing this? What use cases does it support? What is the expected outcome?

- a key group can be created using a key pair
- a key can be added to a key group
- a key can be removed from a key group
- a key group can be added to a key group
- when a key is added, specific _permissions_ can be defined for that membership
- a key's membership can be limited to publishing operations in specific schemas
- a key's membership can be limited to a specific set of operations
- Developers can use `group` to represent identity in the application by creating schemas of their application as _authorised schemas_.
- Schema authors can require that documents of their schema define a key group as their author
- Key group members can publish operations for documents that define the key group as their author
- Key group members can not publish operations for that key group's documents when their key group membership doesn't define the required permissions

### Authorised Schemas

- schemas are considered _authorised schemas_ if they contain a single field of type `author_relation` that contains either the instance id of a key group or an instance id belonging to another _authorised schema_.
- Every instance of an _authorised schema_ has a set of _authorised public keys_. This set can be created by recursively following the field of type `author_relation` and then
  - if a group is found: include all public keys of that group
  - if another _authorised schema_ is found: include all of its _authorised public keys_.
- operations of _authorised schemas_ are only materialised if they were created by a key pair included in the _authorised public keys_ of the operations's instance.

## Documentation

> This section is a more formal description of the proposal, written as if it was a sub-section of the standard (for technical proposals) or a formal process or "fine print" for process proposals. It should be unambiguous and cover all known corner-cases. Formal language (such as protobuf schemas or binary header diagrams) are appropriate here.

### Schema `key-group`

```
inverse: boolean
```

A `key_group` instance is a set of public keys. When the instance is first created it only contains the public key that the `CREATE` message was created with.

### Schema `key-group-membership-request`

```
key_group: relation(key-group)
? member: author_relation(key-group)
```

A _key group membership request_ is created in order to add a new public key (or a key group) to a key group. It says "Hey! Would you mind adding me to this key group?"

### Schema `key-group-membership`

```
key_group: author_relation(key-group)
request: hash(key-group-membership-request)
? schema: hash(schema)
accepted: boolean
can_authorise: boolean
can_create: boolean
can_update: boolean
can_delete: boolean
```

A _key group membership_ is created to _accept_ or _reject_ a group membership request.

If accepted, the key pair that created the _key group membership request_ is now included in the key group's key set.

If denied, all _key group membership requests_ by the same public key should be considered invalid and no operations published by that key should be materialised.

#### Schema `key-group-membership-limit`

```
membership: author_relation(group-membership)
public_key: string
from_hash: string
to_hash: string
```

Imagine someone has been a member of a key group for 2 years but now you want to kick them out: You can now limit their membership to a specific set of operations within that group by adding a key group membership limit. Once a limit has been created for a `key-group-membership` only operations signed by `public_key` contained in [`from_hash`:`to_hash`] will be valid. You can create any number of these limits for a group membership.

### Message Field Type `author-relation`

- The field definition looks similar to `relation`
- The hash in the `references` field must be an _authorised schema_. Any message for which this does not hold is invalid.

#### Extension to the _schema schema_ CDDL:

```
field-definition /= {
    type: "author-relation",
    name: field-name,
    references: hash
}
```

## Example: chat schemas

In this example we want to represent chat messages and their authors. Authors should have a name and a profile picture. We also want to make sure that only key pairs controlled by the author can publish chat messages that are linked to the author's name and picture.

Instances of the `account` schema have an `author` pointing at a group that contains all public keys of a user and a `picture` that contains the profile picture as a `blob`.

The `group` schema has a `name` field that we can use to represent the username but we need a way to link a profile picture to that. We create a new schema `account` that contains both an `author_relationgroup)` and a `relation(blob)`.

**Schema `account`:**

```
group: author_relation(group)
picture: relation(blob)
```

Because it has an `author_relation`, operations for this `account` schema are only valid if they are signed by one of the keys contained in the key set referred to in the `author_relation`.

Now we can create the schema for chat messages. It combines the chat message's content with a link to an instance of the `account` schema.

**Schema `chat-message`:**

```
content: string
author: author_relation(account)
```

Again, because this uses `author_relation`, operations for this schema are only valid when signed by one of the keys referred to by the `author_relation`.

How could a query for this schema look like? This is a GraphQL schema for a query that retrieves `chat-message` instances, as well as the name and picture of their authors.

```
chat-message {
    content,
    author {
        persona {
            name
        }
        picture
    }
}
```

### Recommendations for how to present personas in user space

## Rationale, alternatives and drawbacks

> Why is this design the best in the space of possible designs? What other designs have been considered and what is the rationale for not choosing them? What is the impact of not doing this? Why should we _not_ do this?

## Outlook

- a persona can be shared by multiple users
- users can block devices from asserting identity with their device
- relation to groups
- key group membership requests could be extended to allow adding key groups or keys to a group without them having to take the initiative

<!-- ### Schema `account`

```
persona: authenticatedRelation(persona)
picture: relation(file)
```

### Schema `chat-message`

```
content: string
user: authorRelation(account)
```

### Schema `group`

```
persona: relation(persona)

``` -->
