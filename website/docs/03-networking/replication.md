---
sidebar_position: 2
---

# Replication

:::info not implemented
Replication is in specification phase and has not been implemented yet.
:::

- Replication is the process by which nodes exchange data
    - p2panda uses _gossip replication_: nodes autonomously share data with each other without central coordination
    - this makes p2panda an _eventually consistent_ database
- Nodes may not be interested in all available data and can choose to receive only some data