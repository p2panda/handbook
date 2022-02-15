---
sidebar_position: 3
---

# Data Persistence

- nodes should persist (store on a disk) as much data as possible to ensure that no information is lost that may be needed by a client or another node in the future
- data is persisted by storing _entries_, _documents_ and _instances_
- entries may be persisted when they are published or [received](/docs/networking/replication) from the network
- documents may be persisted by recording information alongside stored entries that allows retrieving them by the document they belong to
- document views may be persisted by serialising the instance's fields
- p2panda requires compatibility of all its data types with
  - PostgreSQL 14
  - SQLite 3
