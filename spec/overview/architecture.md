# General Architecture

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

`@TODO: Write about materialized views and mention the different RPC APIs`
`@TODO: Add diagrams of different network setups`

## Federated vs. decentralized setups

Since clients and servers are separatable it is possible to build different network topologies depending on the needs of the users.

`@TODO: Write about different ways of running p2panda, where all lives on one computer or on two`

## Possible problems

* **Malicious servers:** Servers are trusted nodes in the p2panda network and can potentially be malicious actors, allowing invalid messages to be stored in the database and serving invalid data to the clients. To migitate the risk clients only trust one server each which should follow the specification, having strict validation mechanisms in place.

* **Data loss:** Servers hold the data of the network which puts a higher risk of data-loss on them. A healthy p2panda network should consist of many servers replicating data with each other to minimize the chances of loosing data as it is ideally distributed on multiple nodes and can be retreived again.
