---
id: replication
---

# Replication

- replication is the process by which nodes exchange data to eventually converge all to the same state
    - nodes autonomously share data with each other without central coordination
    - this makes p2panda an _eventually consistent_ database
- nodes may not be interested in all available data and can choose to receive only some data, for example by only requesting documents following a certain schema
- nodes need to implement the API specifications to make sure they are compatible with all other node and client implementations. The Node API is specified here, the Client API is further specified under [queries][queries], both reside inside of nodes

## Node API

[queries]: /docs/organising-data/queries
