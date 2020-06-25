# Message Schema Specification

- What is the data format for messages that create, update, delete instances?

- When are they created by whom?

This section describes the data format for *instance messages*. Instance messages are used to create materialized views of their contents. An entity of a materialized view is called an *intance*.

As an example, a slothmail client is implementing the slothmail schema and allows end users to create *instance messages*, which contain the slothmail *instances* they send each other. A server reads users' slothmail *instance messages* and creates a materialized view of slothmail *instances*.

## Summary

p2panda is a protocol for publishing structured data in a semi-federated network of peers. Messages are published by p2panda *clients* using the [bamboo protocol](https://github.com/AljoschaMeyer/bamboo) and relayed to other peers either through *servers* or via direct connections. While messages are encoded by clients as *entries* on *bamboo logs*, the payload of these entries is encoded using the p2panda message schemas described in this document.

This schema specification describes a meta-schema, that is used to publish specifications for application data schemas. Each schema definition describes both the format of messages used for data exchange as well as the database schema used to retain the message content. The latter aspect can also be seen as creating materialized view from bamboo logs (inspired by the Kappa Database Architecture).

Server administrators explicitly decide which schemas to materialize on their infrastructure based on the needs of their users. Application developers can effortlessly update and extend their schemata by publishing *migrations*, which are then applied on servers that materialize these schematas.

Being able to publish custom data schemas in a p2p network allows application developers to quickly create and distribute clients in a distributed architecture. Building on the bamboo protocol allows for high-performance synchronisation and data validation. By leveraging materialized views, clients can run on ressource-restricted hardware such as mobile devices and still benefit from the advantages of a distributed networking architecture.

## Instance messages

Just like the schema itself, instances of the schema are described by messages. However, these instance messages are encoded in bamboo entries of users’ logs - not the schema log. Every instance message specifies a *versioned schema*.

Possible instance message kinds are:

- `create`: creates a database row
- `update`: updates a row
- `delete`: drops a row

Every *instance message* affects exactly one row of the schema’s table.

Every instance has an author and can only be altered by *instance messages* from this author.

All *instance messages* for one author and schema are contained in the same log.

Instance messages are encoded using [CBOR](https://cbor.io/).

### Create instance message

Applying a `create` instance message inserts one new row into the schema’s table. The message contains:

- `versioned-schema`
- a sequence of `field` contents indexed by the field's name

Instances are identified by the `sequence number` of the create instance message. This is called the instance's `instance-id`.

Applying a migration to a create instance message transforms the contents to conform to the a new schema version.

#### Examples

Example to create a slothmail message. Here, the message is created using an older version of the schema than that of the last example.

```yaml
kind: create
schema:
  - 88e1cb88a66f02f8db635ce26441cc5dac1b08420ceaac230839b755845a9ffb
  - 12
  # schema's version (sequence number)
  - 1
fields:
  - subject: |
    Hello!
    ...friend
  # fields may be empty
  - body:
  - created: 2020-05-22T11:58:50+0000
```

Note that the subject field contains a multi-line string and is specified using schema version `1`. A server that already applied the last example migration from the *schema-migrate* section, which changed the subject field to only allow single-line content, may migrate this message in order to be compatible. As the subject line would fail the validation check, it would be replaced with the default value `<Subject>`.

### Update instance message

An update instance message updates the row specified by the instance id. For one or more of the fields of the schema, the row is updated with new contents.

Applying a migration to an update instance message transforms the content that is written when applying the message.

#### Examples

Example to update the previous slothmail message, fixing the subject line to be one line only.

```yaml
kind: update
schema:
  - 88e1cb88a66f02f8db635ce26441cc5dac1b08420ceaac230839b755845a9ffb
  - 12
  - 4
instance: 98e1cb88a66f02f8db635ce26441cc5dac1b08420ceaac230839b755845a9ffb
fields:
  - subject: Hello! ...friend
```

### Delete instance message

A delete instance message drops a table row referred to by an instance id.

Applying a migration to a delete instance message may make it obsolete if the affected row is deleted by a migration.

#### Examples

Example to delete the slothmail message.

```yaml
kind: delete
instance: 98e1cb88a66f02f8db635ce26441cc5dac1b08420ceaac230839b755845a9ffb
```


