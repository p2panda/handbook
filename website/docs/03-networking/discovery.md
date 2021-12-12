---
sidebar_position: 1
---

# Discovery

- Discovery is the process by which [nodes][clients_nodes] find other nodes and connect to them
- There is no global list of all existing nodes
    - Nodes MUST NOT be required to register or sign up anywhere in order to start connecting to other nodes

## Use Cases

- Users who run and configure a node are _node operators_
- Node operators can manually specify IP addresses of other nodes to connect to
- Node operators can choose to have their node broadcast connection parameters that allow other nodes to connect to it
- Nodes can be configured to broadcast connection parameters via DHT
- Nodes can be configured to broadcast connection parameters via mDNS

## Manual discovery

- _Node operators can specify IP addresses and ports to replicate with_

## mDNS discovery

- _Nodes broadcast via mDNS that they are ready to replicate_
- _enabled by default_

[clients_nodes]: /docs/writing-data/clients-nodes