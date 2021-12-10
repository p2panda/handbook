---
sidebar_position: 3
---

# Data Persistence

- nodes should persist (store on a disk) as much data as possible to ensure that no information is lost that may be needed by a client or another node in the future
- data is persisted by storing _entries_, _documents_ and _instances_
- entries may be persisted when they are published or [received](/docs/networking/replication) from the network
- documents may be persisted by recording information alongside stored entries that allows retrieving them by the document they belong to
- instances may be persisted by serialising the instance's fields
- p2panda requires compatibility of all its data types with
  - PostgreSQL
  - SQLite
  - todo: specific versions?

## Instance Serialisation

- for storing instances in a database, a table is created for every schema that should be persisted
  - the table name may be constructed from the instance's schema name and a unique identifier for the schema's version (e.g. the _instance id_ of the corresponding [_metaschema_](/docs/writing-data/schemas) instance)
  - the table should have a column for every field in the schema's definition
  - the table should have a column to record the _document id_ and _instance id_ of every row
- for every instance to persist
  - a row is inserted into the table for that instance's schema
- a different procedure must be followed for some _system schemas_
