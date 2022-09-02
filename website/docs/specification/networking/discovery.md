---
id: discovery
title: Discovery
---

:::caution Not implemented

Discovery is in specification phase and has not been implemented yet. We're aiming at different, configurable discovery methods: Manual, mDNS and via signalling servers.

:::

- Discovery is the process by which [nodes][clients_nodes] find other nodes and connect to them
- There is no global list of all existing nodes
    - Nodes MUST NOT be required to register or sign up anywhere in order to start connecting to other nodes

## Use Cases

- Users who run and configure a node are _node operators_
- Node operators can manually specify IP addresses of other nodes to connect to
- Node operators can choose to have their node broadcast connection parameters that allow other nodes to connect to it
- Nodes can be configured to broadcast connection parameters via DHT
- Nodes can be configured to broadcast connection parameters via mDNS

[clients_nodes]: /specification/networking/clients-nodes
