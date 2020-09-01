# Architecture

The p2panda network consists of *clients*, which create new data, and *servers* which check if the data is valid to then store and send it further to other servers they know about. Usually a client sends its newly created data directly to a server. Depending on your preferences and choosen trade-offs, they both can run on different computers or on the same one, sometimes even within the same application if necessary!

One can roughly describe clients as *data creators* and servers as *data distributors*. Clients generate a keypair when you start them for the first time which is the most sensitive bit of information and only known to the client, usually stored locally for one user. The keypair is used to sign newly created data, similar to a signature under a letter making sure your identity is proven when sending it somewhere else. Also the keypair can be used to encrypt secret data for other recipients or decrypt received secret data which is only meant for certain users. Keypairs are therefore not only good to proof identity but also assure only the holder of it can read private messages addressed to them.

Newly created data by clients is sent directly to a server as they offer an RPC API as an interface to communicate with each other. Servers check the incoming data and make sure its well-formed, cryptographically verified (is your signature correct?) and valid before storing it in its database to be able to send it to other servers in the future (*replication*). All servers in the network together form a distributed, *eventually consistent* database of the data the clients sent to them. Servers can not create any data themselves, they just make sure the data is stored somewhere for further transmission and its content is consistent and correct.

Servers also *materialize* the data they store, which means they make it faster and easier to look into all the gathered messages. Clients can not only create data but also request the server via the RPC API to send them what it knows about a certain topic, author or kind, like "Send me all the posts from this user?" or "What are the pictures attached to this event?". Finally clients can display the responses to the user in an user interface.

**Server**

* Holds all known append-only logs. Awaits signed messages from clients which then are added to the logs via an API (database)
* Accepts queries to filter currently known data and returns it to the client via an API 
* Verifies the consistency and signature of logs and removes invalid ones
* Finds other servers (discovery)
* Replicates / syncs logs with other servers (replication)

**Client**

* Renders data to view which gets requested from Server via API
* Holds the generated keypair and sensitive informations (private key)
* Signs new messages with private key and sends signed message via API to Server

## Federated vs. decentralized setups

Since clients and servers are separatable it is possible to build different sorts of applications depending on the needs of the users.

| Feature | Federated | Decentralized |
| --- | --- | --- |
| Works offline | No | Yes |
| More trust | No* | Yes* |
| Browser friendly | Yes | No |
| Static IP | Yes* | No* |
| Can be used by many | Yes* | No* |

_*) still depending on detailed implementation, but more realistic_

With these two components a few setup configurations for p2panda are imaginable:

* Website (mobile / desktop) with external server (hosted on dedicated p2panda hardware or any other machine)
* Electron Client (or similar) which contains both server and client
* Website (mobile / desktop) which contains both server and client (not possible right now due to browser limitations / performance bottlenecks)

# TODO

* Add diagrams of different network setups
