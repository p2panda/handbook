# Schema Definitions & Migrations

- How are meta schemas created? What is their purpose and what are limitations?

- How do we define what log ids I'm writing to? Is it one log id per schema? Or many?

This section describes the data format for *schema messages*. Schema messages contain instructions for forming both a database schema and message format.

As an example, the *slothmail* schema is described in a sequence of *schema messages*, which are published by the slothmail authors on the slothmail log. (A slothmail client is then implementing this schema and allows end users to create *instance messages*, which contain the slothmail *instances* they send each other. A server reads users' slothmail *instance messages* and creates a materialized view of slothmail *instances*.)


## Creating a new schema

The `panda` command line application is used to register a new schema for the fictional *slothmail* application.

```bash
$ panda schema slothmail init --description "Send slothmail to your friends!"
🐼 Registered slothmail schema at log 12
```

The *slothmail* schema's bamboo log was initialized in the local user's log number 12.

A couple of fields are added to the schema by reading from a migration definition:

```bash
$ panda schema slothmail migrate slothmail-001.yaml
Created fields
- subject<text>
- body<text>
- created<datetime>
- recipient<panda-profile>

🐼 Published slothmail version 2
```

The *slothmail* application can now start publishing slothmail messages.

## Materializing a new schema on a server

All p2panda servers make available their user's log entries to each other. In addition to that, they can offer materialized views of some of the data contained in those logs. For this, server administrators instruct the server to index messages of a certain schema.

Here, the *slothmail* schema is indexed. It is referred to by the public key of the schema's author and the log id in which that author published the schema.

```bash
$ beep-beep-server index 88e1cb88a66f02f8db635ce26441cc5dac1b08420ceaac230839b755845a9ffb 12
🎍 Now indexing slothmail messages
```

## Initial Schema instantiation

When indexing a schema, a server executes all migrations in the schema’s log in order to create a database table capable of holding instances of the schema at its latest known version. Now, all known *instance messages* can be inserted into the database, which results in the database contents representing a view of all known instances at their latest versions.

Migrations can also be applied to messages in order to make them compatible with the current schema version. When an incoming message specifies a schema version older than the latest known schema version, all intermittent migrations are applied to this message so that it can be applied to the database. When a message specifies a schema version that is not known, the server tries to request that schema version’s entry using bamboo.

## Schema migration messages

A schema describes a database schema and a message specification through a series of schema migrations. A schema is represented by a bamboo log. Every message on the log is a schema migration. Thereby, the version number of a schema migration is the *sequence number* of the migration's log entry.

Each schema migration is one of:

- `schema-meta`: sets schema metadata
- `schema-migration`: Used by server to create or alter database tables and to migrate *instance messages*.
- `schema-revert`: Used by server to revert to an earlier version, recreating instance data, which may have been deleted or corrupted by intermittent migrations.

Schema migrations are encoded using a subset of [CDDL](https://tools.ietf.org/html/rfc8610#page-5). Examples in this draft are encoded in YAML.

### Meta schema message

A meta schema message describes the schema itself. It contains following fields. Only those marked with an X in the "Required" column are required.

| Field name | Description | Required |
| --- | --- | --- |
| name | Name of the schema | X |
| spec | Which verison of this schema meta-spec is implemented | X |
| description | Description of the schema's purpose | |
| homepage | URL pointing at a web site for the schema | |
| license | A comma-separated list of licenses that apply for the schema definition | |
| contact | An email-address for contacting the schema's authors | |

#### Examples

Minimal meta schema message for a fictional messaging format *slothmail*.

```yaml
kind: schema-meta
name: slothmail
spec: 1
```

Example using all available fields

```yaml
kind: schema-meta
name: slothmail
spec: 1
description: Send slothmail to your friends!
homepage: https://liebechaos.org/activity/slothmail
license: CC-BY-SA 2.0 <https://creativecommons.org/licenses/by-sa/2.0/>
contact: info@liebechaos.org
```

### Migrate schema message

A migrate schema message creates or alters the schema’s table and updates its rows. A migration describes changes to one or more fields. If no database table exists for the schema, a new database table is created when applying the message. Server implementations should consider that schema names are non-unique when constructing table names.

Fields may be created, updated or removed. For each created or updated field, a new data type is specified. For updated fields, a default value must be specified that is stored if conversion to the new data type fails. Each field is described by its

- action (`create`, `update`, or `remove`)
- name (unicode string)
- type (see below)
- validation (optional regex pattern)

Type must be one of:

- `varchar` (max 255 chars)
- `text`
- `integer`
- `float`
- `boolean`
- `timestamp` (ISO-8601 timestamp)
- `relation`

Every type may also be specified as an array by adding `[]` behind the type name.

A `relation` type also specifies the `versioned-schema` of its foreign key. A `relation` type may specify `cascade: true` in which case schema instances are deleted once the foreign key is deleted.

The field `validation` may contain a regular expression used to validate messages of this schema.

If a `schema-migration` message removes the last of a schema’s fields, the schema’s database table may be dropped.

#### Examples

Example to create the *slothmail* schema

```yaml
kind: schema-migration
fields:
  - subject:
    action: create
    type: text
  - body:
    action: create
    type: text
  - recipient:
    action: create
    type: relation
    schema:
      # author for the schema of the recipient field
      - d4a1cb88a66f02f8db635ce26441cc5dac1b08420ceaac230839b755845a9ffb
      # schema's log id
      - 10
      # relation is schema-version agnostic
  - created:
    action: create
    type: timestamp
```

Example to add an attachments field to the slothmail schema:

```yaml
kind: schema-migration
fields:
  - attachments:
    action: create
    type: relation[]
    schema:
      - ac1b08420ceaac230839b755845a9ffbd4a1cb88a66f02f8db635ce26441cc5d
      - 78434
```

Example to remove the attachments field and change the subject to not contain line breaks

```yaml
kind: schema-migration
fields:
  - attachments
    action: remove
  - subject
    action: update
    validation: ^[^#\r\n].*$
    default: <Subject>
```
### Revert schema message

A revert schema message reverts previous migrations and resets the database to a previous schema version (`target`). This is desirable instead of reverting by altering fields in order to restore data deleted by previous migrations.

The database is recreated by dropping the database and reapplying all known instance messages and all migrations up to the target migration. `create` and `update` instance messages, which specify a schema version later than the target version are ignored. `delete` instance messages are applied regardless of the version mismatch in order to prevent schema authors from restoring user data against their will.

#### Examples

The previous example removed the `attachments` field. During migration all slothmail attachments were deleted from slothmail instances. Simply adding the field back would not recover the deleted attachments. Here, the schema is reverted to a previous version that still had the `attachments` field, which recreates all the attachments by re-indexing all slothmail instances.

```yaml
kind: schema-revert
target: 2
```

### Some thoughts on migrations (from Andreas)

Even though I like the idea of introducing migrations inside of bamboo entries I'm still not 100% convinced this is the right way. I'll try to list up some pro/cons to understand better where my thoughts are:

* Pro: Nice way to get schemas from the "network". A little bit like a built-in "app store" on beep-beep where you can fetch your schemas from other users.
* Pro: Gives a nice opportunity to build a schema explorer client
* Con: The usability from an administrator / server-owner perspective feels complicated and this might lead to errors / mistakes. The question is: How would the flow look like in an everyday-beep-beep-use?
    1. I install beep-beep on my linux server
    2. I whitelist my public address in an command line interface on the server to make it accept incoming migrations from this address
    3. I install another tool which sends migration messages to my server
    4. I read up somewhere what migration messages are interesting for me / write my own
    5. I put them into the command line tool and hope that I executed everything in the right order and did not do any mistakes as a beginner

    ... another scenario would be to find someones public address of which I know of who posted the migrations I'm interested in but then I ..
    1. have to find that address, put it into the whitelist via command line interface
    2. make sure its still somewhere on the network and I got the data before I can start at all to use my server ..

I think there is ways to improve that UX a lot but still I wonder if it isn't easier to have a file in the folder which describes the [schema once](https://en.wikipedia.org/wiki/Schema_migration). With every change of that file the database gets wiped and rebuilt. When something went wrong I track down the problem in my file and start again. As a server admin I see directly what my server is capable of by just reading the file. Another scenario could be to have multiple schema files just in case you want to organize them that way or install "plugins" (eg. copy just another schema file in that folder and restart the server). Aaaaanother cool thing: Schema folders can be organized as git repositories.

A thing between these two solutions could be to not have single atomic migrations described by every message but actually the "final" schema per message. Thats maybe not as flexible but at least easier to grasp and somehow I can imagine "default schemas" and combinations of them will establish much more likely?

Many thoughts!
