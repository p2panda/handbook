# RFC 0001: Schema

A schema describes data that is stored and indexed on a server. It defines  message types that can be created by clients in the network. From another perspective one could understand a schema as a specification of materialized views over all bamboo logs (inspired by Kappa Database Architecture). Having the possibility to define custom schemas for the server allows for a flexible and fast introduction of new message types, use-cases and clients in the network.

Each schema can be installed, changed or removed on a server by running schema migrations. A schema migration is a message type by itself and is stored as an entry on a bamboo log. Each schema migration message consists of a simple description of message fields including their names and types.

## Terminology

- **entry**: An entry in a [bamboo log](https://github.com/AljoschaMeyer/bamboo)
- **message**: A p2panda message contained in an entry, can be either a *schema message* or an *instance message*
- **schema message**: Contains instructions used to define a database schema and a specification for *instance messages*.
- **instance message**: Contains instructions that can be applied to a database schema in order to instantiate *instances*.
- **instance**: A row in a database that represents an object within a p2panda-based application

## Overview

A schema describes a database schema and a message specification through a series of schema migrations. A schema is represented by a bamboo log. Every message on the log is a schema migration. Thereby, the version number of a schema is defined by the *sequence number* of the migration's log entry.

Each schema migration is one of:

- meta schema message: updates schema metadata
- migrate schema message: creates or alters a table and updates instance messages
- revert schema message: revert the schema to a previous version, recreating instances

Instances of the schema are also described by messages. However, these instance messages are encoded in entries of users’ logs - not the schema log. Every instance message specifies a schema, schema version, and is one of:

- create instance message: inserts a row
- update instance message: updates a row
- delete instance message: drops a row

## Initial Schema instantiation

When instantiating a schema, a server executes all migrations in the schema’s log. This creates a database table capable of holding instances of the schema. After each migration, all known instance messages pertaining to the current version are applied. At the end of instantiation, the table and its contents are all reflecting the schema’s latest known version.

Migrations can also be applied to messages in order to make them compatible with the current schema version. When a message is received that specifies a schema version older than the latest known version, all known migrations are applied to this message so that it can be applied to the database. When a message specifies a schema version that is not known, the server tries to request that schema version’s entry using bamboo.

## Schema migration messages

### Meta schema message

A meta schema message may specify any of:

| field name | description | required |
| --- | --- | --- |
| name | Name of the schema | X |
| spec | Which verison of this schema meta-spec is implemented | X |
| description | Description of the schema's purpose | |
| homepage | URL pointing at a web site for the schema | |
| license | A comma-separated list of licenses that apply for the schema definition | |
| contact | An email-address for contacting the schema's authors | |

These values may be used to display information about the schema to the user and to guide implementations of other processes. All values are encoded as unicode strings.

#### Examples

Minimal meta schema message for a fictional messaging format *slothmail*.

```
kind: meta-schema
name: slothmail
spec: 1
```

Example using all fields

```
kind: meta-schema
name: slothmail
spec: 1
description: Send sloth mail to your friends!
homepage: https://liebechaos.org/activity/slothmail
license: CC-BY-SA 2.0 <https://creativecommons.org/licenses/by-sa/2.0/>
contact: info@liebechaos.org
```

### Migrate schema message

A migrate schema message creates or alters the schema’s table and updates its rows. A migration describes changes to one or more fields. If no database table exists for the schema, a new database table is created when applying this message. The table name may not be taken from any of the field properties such as `name` because that might lead to conflicts when more than one author creates a schema with the same name.

Fields may be created, updated or removed. For each created or updated field, a new data type is specified. For updated fields, a default value must be specified that is stored if conversion to the new data type fails. Each field is described by its

- action (`create`, `update`, or `remove`)
- name (unicode string)
- type (see below)
- validation (optional regex pattern)

Type must be one of:

- varchar
- text
- integer
- float
- blob (max 512KB)
- boolean
- timestamp
- relation

Every type may also be specified as an array.

A relation type also specifies the schema and version of its foreign key. A relation type may specify a cascade in which case rows are deleted once the foreign key is deleted.

The primary key of created tables is always set to the hash of the entry that contains the create instance message for this row. With this hash it is always possible to request the instance referred to using bamboo.

The created table specifies an author for each row, which is the pubkey that created the row’s instance.

Validation may be a regular expression used to validate messages of this schema.

If an update schema message removes the last of a schema’s fields, the schema’s database table is dropped.

#### Examples

Example to create the slothmail schema

```
kind: migrate-schema
fields:
  - subject:
    action: create
    type: text
  - body:
    action: create
    type: text
  - author:
    action: create
    type: relation
    schema: d4a1cb88a66f02f8db635ce26441cc5dac1b08420ceaac230839b755845a9ffb-12
  - created:
    action: create
    type: timestamp
```

Example to add an attachments field to the slothmail schema:

```
kind: migrate-schema
fields:
  - attachments:
    action: create
    type: relation[]
    schema: ac1b08420ceaac230839b755845a9ffbd4a1cb88a66f02f8db635ce26441cc5d-78434
```

Example to remove the attachments field and change the subject to not contain line breaks

```
kind: migrate-schema
fields:
  - attachments
    action: remove
  - subject
    action: update
    validation: ^[^#\r\n].*$
    default: <Subject>
```

### Revert schema message

A revert schema message reverts previous migrations and resets the database to a previous state. This is desirable instead of updating fields in order to restore data deleted by previous migrations.

The database is recreated by dropping the database and reapplying all known instance messages and all migrations up to the target migration for the schema. Create and update instance messages that specify a schema version later than the migration’s target version are ignored. Delete instance messages are applied regardless of the version mismatch in order to prevent schema authors from restoring user data against their will.

#### Examples

An example to revert the slothmail schema to version 2:

```
kind: revert-schema
version: 2
```

## Instance messages

Each instance message affects one row of the schema’s table. An instance message may only apply to rows whose author equals that of the instance message.

### Create instance message

Applying a create instance message inserts one new row into the schema’s table. The message contains:

- versioned-schema
- content for each of the schema’s fields

The hash of the entry that encodes a create instance message becomes the primary key (instance id) of the new row.

Applying a migration to a create instance message transforms the contents to conform to the new schema version.

#### Examples

Example to create a slothmail message.

```
kind: create
schema: 
  - 88e1cb88a66f02f8db635ce26441cc5dac1b08420ceaac230839b755845a9ffb-12
  - 1
fields:
  - subject: >
    Hello!
    ...friend
  - body: 
  - author: afe1cb88a66f02f8db635ce26441cc5dac1b08420ceaac230839b755845a9fac
  - created: 2020-05-22T11:58:50+0000
```

Note that the subject field contains a multi-line string. A server that already applied the migration that changed the subject field to only allow single-line content may migrate this message in order to be compatible. As the subject line would fail the validation check, it would be replaced with the default value `<Subject>`.

### Update instance message

An update instance message updates the row specified by the instance id. For one or more of the fields of the schema, the row is updated with new contents.

Applying a migration to an update instance message transforms the content that is written when applying the message.

#### Examples

Example to update the previous slothmail message, fixing the subject line to be one line only.

```
kind: update
schema:
  - 88e1cb88a66f02f8db635ce26441cc5dac1b08420ceaac230839b755845a9ffb-12
  - 3
instance: 98e1cb88a66f02f8db635ce26441cc5dac1b08420ceaac230839b755845a9ffb
fields:
  - subject: Hello! ...friend
```

### Delete instance message

A delete instance message drops a table row referred to by an instance id.

Applying a migration to a delete instance message may make it obsolete if the affected row is deleted by a migration.

#### Examples

Example to delete the slothmail message.

```
kind: delete
instance: 98e1cb88a66f02f8db635ce26441cc5dac1b08420ceaac230839b755845a9ffb
```