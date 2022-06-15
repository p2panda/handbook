---
id: replication
---

# Replication

- replication is the process by which nodes exchange data to eventually converge all to the same state
    - nodes autonomously share data with each other without central coordination
    - this makes p2panda an _eventually consistent_ database
- nodes may not be interested in all available data and can choose to receive only some data, for example by only requesting documents following a certain schema
- clients use the same GraphQL API to talk to nodes, you can read more about it under [queries][queries]

## Node API

[queries]: /docs/organising-data/queries
