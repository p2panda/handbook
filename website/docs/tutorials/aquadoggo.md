---
title: 'Tutorial: Set up a local node'
---

This tutorial walks you through setting up a locally running p2panda node on your computer and shows you how you can configure it and interact with it via the GraphQL playground.

It's good to know how to run your own node if you want to start developing p2panda clients. You can try out new schemas and applications with them or just experiment!

We will use the reference node implementation [`aquadoggo`](https://github.com/p2panda/aquadoggo) for this, which is a command line application written in Rust.

:::note What is a _node_?

Nodes are the actual participants in an p2panda network: They validate and store data coming from clients and make sure to send it to other nodes.

Nodes are usually agnostic to the applications using them, this means that one node could potentially support hundreds of different p2panda applications. Having one node running on your computer is therefore already enough! You can read more about nodes in the regarding [Learn](/learn/networks) section.

:::

## What do I need?

- Terminal
- Browser

## Download `aquadoggo`

Let's download `aquadoggo`! For this we first download the whole git repository with the source code inside:

Head over to the [Releases](https://github.com/p2panda/aquadoggo/releases) page to download the pre-compiled binary for your platform. This tutorial was written using `v0.7.0`.

Or on the command line:

```bash
# Download and unpack aquadoggo v0.7.0
curl -L https://github.com/p2panda/aquadoggo/releases/download/v0.7.0/aquadoggo-v0.7.0-x86_64-unknown-linux-gnu.tar.gz | tar -xz
```

For the rest of the tutorial we will run aquadoggo simply using the command `./aquadoggo`. If required, in your own commands adjust this to match the name of the binary you downloaded or rename it to accordingly.

## Start the node

To start the node now you only have to run the following command. Make sure you're in the directory where you downloaded the aquadoggo binary!

```bash
./aquadoggo
```

You should see roughly this output:

```
                       ██████ ███████ ████
                      ████████       ██████
                      ██████            ███
                       █████              ██
                       █     ████      █████
                      █     ██████   █ █████
                     ██      ████   ███ █████
                    █████         ██████    █
                   ███████                ██
                   █████████   █████████████
                   ███████████      █████████
                   █████████████████         ████
              ██████    ███████████              ██
          ██████████        █████                 █
           █████████        ██          ███       ██
             ██████        █            █           ██
                ██       ██             ███████     ██
              ███████████                      ██████
████████     ████████████                   ██████
████   ██████ ██████████            █   ████
  █████████   ████████       ███    ███████
    ████████             ██████    ████████
█████████  ████████████████████████   ███
█████████                      ██

aquadoggo v0.7.0

No config file provided

Configuration

Allow schema IDs: * (any schema id)
Database URL: memory (data is not persisted)
mDNS: enabled
Private key: ephemeral (not persisted)
Relay mode: disabled

Node is ready!

Go to http://0.0.0.0:2020/graphql to use GraphQL playground
Peer id: 12D3KooWRfiHJzaRAoBAEkS4g9n9EP5x7muN6QXqpALH3HRBxEdn
Node is listening on 0.0.0.0:2022
```

Well done!! You have a running `aquadoggo` node :-)

Let's unpack the output a little. There's a cute panda riding an aquadoggo of course, then version, then a warning about us not providing a config file, followed by some (default) configuration values. We wanted it to be simple to get started and playing around with `aquadoggo` so a easy-to-use default configuration is provided. With this configuration the node can be considered "ephemeral" as it doesn't persist any data between runs. Additionally it is configured to discover other nodes on the local network, ask them what schema they know about, and start supporting these schema itself. Although unlikely to be the behavior you want in a production environment, it is quite handy for getting started during development.

### See more logs

We can quit the node by pressing `CTRL` + `C` in the regarding terminal. Let's start it again, but this time with more logging enabled:

```bash
./aquadoggo --log-level=info
```

As well as the above, you should now get these more detailed logs:

```
[2024-01-22T15:44:50Z INFO  aquadoggo::manager] Start materializer service
[2024-01-22T15:44:50Z INFO  aquadoggo::materializer::worker] Register reduce worker with pool size 16
[2024-01-22T15:44:50Z INFO  aquadoggo::materializer::worker] Register dependency worker with pool size 16
[2024-01-22T15:44:50Z INFO  aquadoggo::materializer::worker] Register schema worker with pool size 16
[2024-01-22T15:44:50Z INFO  aquadoggo::materializer::worker] Register blob worker with pool size 16
[2024-01-22T15:44:50Z INFO  aquadoggo::materializer::worker] Register garbage_collection worker with pool size 16
[2024-01-22T15:44:50Z INFO  aquadoggo::manager] Start http service
[2024-01-22T15:44:50Z INFO  aquadoggo::manager] Start network service
[2024-01-22T15:44:50Z INFO  aquadoggo::network::service] Networking service initializing...
[2024-01-22T15:44:50Z INFO  aquadoggo::network::service] Network service ready!
[2024-01-22T15:44:50Z INFO  aquadoggo::manager] Start replication service
```

If you want to see even more you can change the log verbosity from `info` to `debug` or even `trace`, but then you will see a whole flood of information you might not always need.

:::tip Even more logging

If you're curious to see _even_ more then you can enable logging for _everything_ (that is, even logs from dependencies) via: `RUST_LOG=debug cargo run`.

:::

## GraphQL playground

How can we actually check that the node is running? When starting `aquadoggo` it will automatically open an HTTP server on port `2020` with an GraphQL API. On top of that it offers a playground for us to already play with the GraphQL API. We can visit it by opening our browser and going to:

```
http://localhost:2020/graphql
```

### Send a query

Maybe you have never worked with [GraphQL](https://graphql.org/) before but we can just send some queries to the node for fun. You can enter a query in the left area of the playground and click the large _Play_ button in the middle. This will send the query to the node and its JSON response will show in the right area.

Try this following query by entering it in the left textarea and clicking the _Play_ button:

```graphql
{
  all_schema_definition_v1 {
    documents {
      fields {
        name
        description
      }
    }
  }
}
```

It will return the following, relative unspectacular response in the right area:

```json
{
  "data": {
    "all_schema_definition_v1": []
  }
}
```

Still, this is already doing a lot! With this query we asked our `aquadoggo` if it knows any schemas and since we have just started it it doesn't know any yet! This is why the response is empty .. It's soon time to teach the `aquadoggo` some tricks but this is part of the next [how to create a schema tutorial](/tutorials/fishy). For now we get to know the doggo a little bit better.

### Documentation

You can see, this is already how we can interact with the node at any time, we can simply just write queries in the playground using our browser! When building a p2panda client you do nothing else: The client sends GraphQL queries to the node and handles the JSON responses! If you're curious now on how to build a client you can check out this [how to build a client tutorial](/tutorials/mushroom-app).

There are a couple of more queries you can find when you click on the _Docs_ tab in the right sidebar. Next to the `all_schema_definition_v1` query you find others, for example
`all_schema_field_definition_v1` or `schema_definition_v1` etc.... Later you will find more queries here you created yourself by introducing new schemas to the node!

:::note What are all these queries?

These queries serve to find out which schemas exist, they will be used by [clients](https://p2panda.org/specification/APIs/queries) ("Client API"). Surely there will be more queries coming in the future.

:::

## Configuration

Now we learned how to start a node and how to interact with it via GraphQL! Let's see now how we can configure and adjust it to our particular needs. This is mainly a collection of _cool tricks_ and not a full documentation of `aquadoggo`, also you probably might not need all of this in the beginning, but maybe it comes in handy soon!

:::info

If you like spoilers and just want to dive into the full config options then our [example config.toml file](https://github.com/p2panda/aquadoggo/blob/main/aquadoggo_cli/config.toml) is a good place to start!

:::

### Persistent storage

In most cases we will want to persist our nodes identity and database on the filesystem. In order to configure this behavior we the use the `--database-url`, `--blobs-base-path` and `--private-key` command line arguments.

This is how we would configure the node with an `SQLite` database, blob storage and a private key all stored at a suitable path for a Linux machine:

```bash
./aquadoggo \
  --database-url="sqlite:$HOME/.local/share/aquadoggo/db.sqlite3" \
  --blobs-base-path="$HOME/.local/share/aquadoggo" \
  --private-key="$HOME/.local/share/aquadoggo/private-key.txt"
```

`aquadoggo` supports both `SQLite` and `PostgreSQL` databases, more on this later.

### Delete node data

Especially during development you might want to delete your database, blobs and even your identity. You can do this by simply removing the data directory:

```bash
rm -rf $HOME/.local/share/aquadoggo
```

Make sure that `aquadoggo` is not running anymore before you delete that folder.

:::caution Watch out!

This is _really_ deleting everything you stored in your node _and_ your node key pair.

:::

### PostgreSQL or SQLite

`aquadoggo` allows you to use an SQLite _or_ PostgreSQL database. SQLite is the default and really amazing as it does not require you to set up an actual database software. This is why it is so easy to just start an `aquadoggo`. It is also very useful for embedding `aquadoggo` for example _inside_ of an application where you don't want the users to also take care of the database, all should just work "out of the box".

Sometimes you want to use PostgreSQL though, maybe because you are planning to host your `aquadoggo` on a server where it will be used by hundreds of users at the same time. For this of course you need a [running PostgreSQL database](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04).

Just change the `--database-url` command line argument to now use a PostgreSQL database:

```bash
# Use an external PostgreSQL database
./aquadoggo --database-url="postgresql://postgres:postgres@localhost:5432/aquadoggo"
```

:::tip Explore SQLite

If using an [SQLite](https://www.sqlite.org/index.html) database, and you have an `sqlite3` client installed you can explore the database like that:

```bash
# Explore the SQLite database (on Linux)
sqlite3 $HOME/.local/share/aquadoggo/aquadoggo-node.sqlite3
```

:::

:::info Migrations

`aquadoggo` checks if there are any pending SQL migrations on every start up. If it detects missing migrations it will run it automatically against the given database.

:::

### HTTP port

By default `aquadoggo` starts an HTTP server on port `2020`. If you want to change this you can use the `--http-port` command line argument like this

```bash
# This changes the http endpoint to http://localhost:4040
./aquadoggo --http-port=4040
```

This is useful if for whatever reason your port `2020` is already occupied or if you want to run _more than one_ aquadoggo.

### Allowed Schema IDs

By default, your `aquadoggo` doesn't restrict the schema it replicates and materializes, it is interested in _anything_ it may come in contact with on the network. If you want to restrict this, you can do so by defining a list of `allowed-schema-ids`.

```bash
# This node will replicate documents for these two schema and build custom GraphQL API for queries.
./aquadoggo \
  --allow-schema-ids="mushrooms_0020c3accb0b0c8822ecc0309190e23de5f7f6c82f660ce08023a1d74e055a3d7c4d" \
  --allow-schema-ids="mushroom_findings_0020aaabb3edecb2e8b491b0c0cb6d7d175e4db0e9da6003b93de354feb9c52891d0"
```

### Discovery

Node discovery is configurable through the arguments `--mdns`, `--relay-addresses` and `--relay-mode`.

You can configure your node to discover local nodes via mDNS (on by default) and by registering on relay node. A relay node will share addresses for other nodes they learn about.

```bash
./aquadoggo \
  --relay-addresses="192.0.2.16:2022" \
  --relay-addresses="192.0.2.17:2022"
```

If nodes are discovered via a relay then forming a direct connection between peers is first attempted (using NAT traversal techniques where required), if this fails then the connection is routed through the relay.

If you want your node to itself act as a relay set the `--relay-mode` flag.

### Peers

You can configure which peers you connect to using the `--direct-node-addresses`, `--allow-peer-ids` and `--block-peer-ids` arguments.

`--direct-node-addresses` is useful when you want to connect to nodes with static reachable addresses. Allowing and blocking peers is useful when you want to control the peers you connect to by their id when using relay or mDNS discovery techniques.

Running a node which will only connect to a list of allowed peers (discovered via mDNS or relay) would look like this:

```bash
./aquadoggo \
  --relay-addresses="192.0.2.16:2022" \
  --allow-peer-ids="12D3KooWCw68m5CRcV8vD9iuR325oKwJHLYqTYH5mYwD6k2QV4nm" \
  --allow-peer-ids="12D3KooWCjiCXB1WPy9AYn73zjmwkVeUqLsrwgWFvsJhe69ivnCn" \
  --allow-peer-ids="12D3KooWFiLbne3UtoHPCBbZ8HG3JV6d1rdTDee3XVKRqDAxbGsK"
```

## `config.toml`

Right about now you'd be forgiven for thinking that this is _a lot_ of command line arguments to work with. `aquadoggo` is able to read all these configurations (and more!) from a `config.toml` file, and also via environment variables. The order in which configuration methods are read is 1) config file 2) command line arguments 3) environment variables. This is useful in order to override your default `config.toml` values at runtime.

Check the extensively documented `aquadoggo` cli [example config file](https://github.com/p2panda/aquadoggo/blob/main/aquadoggo_cli/config.toml) to read about all possible configuration options.

## Done!

Super, you know now how to start an aquadoggo on your computer or server! This is the first step towards running a p2panda application on your computer or building a new one. Check out the [next tutorial](/tutorials/fishy) on how to send data to create schema on your running node.

:::tip Extra: Embed a node

This is not part of this tutorial but we just want to mention that you can _also_ run a node programmatically by embedding it directly in your Rust codebase:

```rust
use aquadoggo::{Configuration, Node};
let config = Configuration::default();
let node = Node::start(config).await;
```

This is very similar to using the command line application, just that you can ship your applications now with a node running _inside_! Users will then automatically start the node whenever they start the application. Together with [Tauri](https://tauri.studio) your applications can even be written in JavaScript and still use `aquadoggo` internally - even when you're not a Rust developer! Our tauri x p2panda [example project](https://github.com/p2panda/tauri-example) will help you get started with right away.

:::
