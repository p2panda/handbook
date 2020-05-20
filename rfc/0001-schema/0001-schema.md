# RFC 0001: Schema

A schema describes a PostgreSQL database schema and a message specification through a series of schema migrations. Each schema migration is an entry on a bamboo log. Every schema has a version number, which is identical to the hash of the last message in its log.

Each schema migration is one of:

- meta schema message: updates schema metadata
- migrate schema message: creates or alters a table and updates instance messages
- revert schema message: revert the schema to a previous version, recreating instances

Instances of the schema are also described by messages. However, these instance messages are encoded in entries of users’ logs - not the schema log. Every message specifies a schema, schema version, and is one of:

- create instance message: inserts a row
- update instance message: updates a row
- delete instance message: drops a row

## Initial Schema instantiation

When instantiating a schema, a server executes all migrations in the schema’s log. This creates a database table capable of holding instances of the schema. After each migration, all known instance messages pertaining to the current version are applied. At the end of instantiation, the table and its contents are all reflecting the schema’s latest known version.

Migrations can also be applied to messages in order to make them compatible with the current schema version. When a message is received that specifies a schema version older than the latest known version, all known migrations are applied to this message so that it can be applied to the database. When a message specifies a schema version that is not known, the server tries to request that schema version’s entry using bamboo.

## Schema migration messages

### Meta schema message

A meta schema message may specify any of:

- ascii-name (64 chars, non-unique)
- display-name (optional)
- description
- homepage
- bugs: for reporting issues with the schema
- license: a comma-separated list of licenses
- contact: a contact address in any medium preferred by the author
- dependencies: an array of versioned schemas this schema depends on
- spec-version: which version of this schema spec is implemented

These values may be used to display information about the schema to the user and to guide implementations of other processes. All values are optional, a default display name is generated from the log id.

### Migrate schema message

A migrate schema message creates or alters the schema’s table and updates its rows. A migration describes changes to one or more fields. If no database table exists for the schema, a new database table is created when applying this message. The table name may not be equal to any of the meta message’s fields such as ascii-name because that might lead to conflicts when more than one author creates a schema with the same name.

Fields may be created, updated or removed. For each created or updated field, a new data type is specified. For updated fields, a default value must be specified that is stored if conversion to the new data type fails. Each field is described by its

- name
- type
- validation

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

### Revert schema message

A revert schema message reverts previous migrations and resets the database to a previous state. This is desirable instead of updating fields in order to restore data deleted by previous migrations.

A revert message specifies a target version, which is to be restored. No message in the schema’s log between the revert schema message and the target version’s migrate schema message may be another revert schema messages that targets an earlier version than the original target. If this is the case the revert schema message is ignored.

The database is recreated by dropping the database and reapplying all known instance messages and all migrations up to the target migration for the schema. Create and update instance messages that specify a schema version later than the migration’s target version are ignored. Delete instance messages are applied regardless of the version mismatch in order to prevent schema authors from restoring user data against their will.

## Instance messages

Each instance message affects one row of the schema’s table. An instance message may only apply to rows whose author equals that of the instance message.

### Create instance message

Applying a create instance message inserts one new row into the schema’s table. The message contains:

- versioned-schema
- content for each of the schema’s fields

The hash of the entry that encodes a create instance message becomes the primary key (instance id) of the new row.

Applying a migration to a create instance message transforms the contents to conform to the new schema version.

### Update instance message

An update instance message updates the row specified by the instance id. For one or more of the fields of the schema, the row is updated with new contents.

Applying a migration to an update instance message transforms the content that is written when applying the message.

### Delete instance message

A delete instance message drops a table row referred to by an instance id.

Applying a migration to a delete instance message may make it obsolete if the affected row is deleted by a migration.
