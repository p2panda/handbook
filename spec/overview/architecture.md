# Architecture

The p2panda network consists of *clients* and *servers* which play different roles:

**Clients ...**

* maintain one or many keypairs
* use a keypair to sign new messages
* send newly created messages to a server
* use a keypair to encrypt new messages
* decrypt secret messages

**Servers ...**

* validate and verify incoming messages from clients
* store messages in a database
* offer an API for clients to request data
* find and exchange messages with other servers in the network

One can roughly describe clients as *data creators* and servers as *data distributors*. Servers function as a distributed network of databases which make sure that well-formed, cryptographically verified and valid data is stored and distributed to other servers

### Federated vs. decentralized setups

Since clients and servers are separatable it is possible to build different network topologies depending on the needs of the users.

# TODO

* Write about different ways of running p2panda, where all lives on one computer or on two
* Write about materialized views and mention the different RPCs
* Add diagrams of different network setups
