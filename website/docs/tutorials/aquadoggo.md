---
title: "Tutorial: Set up a local node"
---

This tutorial walks you through setting up a locally running p2panda node on your computer and shows you how you can configure it and interact with it via the GraphQL playground.

It's good to know how to run your own node if you want to start developing p2panda clients. You can try out new schemas and applications with them or just experiment!

We will use the reference node implementation [`aquadoggo`](https://github.com/p2panda/aquadoggo) for this, which is a command line application written in Rust.

:::note What is a _node_?

Nodes are the actual participants in an p2panda network: They validate and store data coming from clients and make sure to send it to other nodes.

Nodes are usually agnostic to the applications using them, this means that one node could potentially support hundreds of different p2panda applications. Having one node running on your computer is therefore already enough! You can read more about nodes in the regarding [Learn](/learn/networks) section.

:::

## What do I need?

* Rust
* Terminal
* Browser

:::info Never worked with Rust before?

This tutorial requires you to have a working Rust environment. If you have never worked with Rust before this is no problem! Setting it up is fairly easy and besides using some basic command line commands there is no more Rust knowledge required to make `aquadoggo` run on your computer.

:::

<details><summary>How do I install Rust?</summary>

Make sure you have a working Rust environment installed on your computer before you begin with the tutorial. You can check this by running `rustc --version` in your terminal. This tutorial was written with Rust version `1.63.0` but it will probably also work with other versions.

If you don't have Rust installed yet you can follow the steps on the official Rust website: [How to install Rust](https://www.rust-lang.org/tools/install).

</details>

## Download `aquadoggo`

Let's download `aquadoggo`! For this we first download the whole git repository with the source code inside:

```bash
# Download git repository
git clone https://github.com/p2panda/aquadoggo.git

# Enter the folder you've just created
cd aquadoggo
```

## Start the node

To run the node now you only have to run this command inside the project's folder:

```bash
cargo run
```

This will automatically download all required Rust dependencies, compile the application and finally start it. Probably you will see a lot of logs now around what the Rust compiler is doing. Depending on your computer and network connection this might take a couple of minutes. The good thing though is, that you only have to do this once, the next time you run the command, it will start the program directly.

When the compilation finished and the program started you will see .. almost nothing!

```
    Finished dev [unoptimized + debuginfo] target(s) in 0.10s
     Running `target/debug/aquadoggo`
```

This is because by default the program will not spit out any information except when you explicitly asked about it. 

The node is already running, you are done!

### See more logs

We can quit the node by pressing `CTRL` + `C` in the regarding terminal. Let's start it again, but this time with more logging enabled:

```bash
RUST_LOG=aquadoggo=info cargo run
```

This will enable logs coming directly from `aquadoggo` and only the most important ones, like basic system informations, warnings and errors. We are enabling logging with the environment variable `RUST_LOG`.

Ah, this looks more interesting now:

```
    Finished dev [unoptimized + debuginfo] target(s) in 0.10s
     Running `target/debug/aquadoggo`
[2022-09-05T15:59:14Z INFO  aquadoggo::manager] Start materializer service
[2022-09-05T15:59:14Z INFO  aquadoggo::materializer::worker] Register reduce worker with pool size 16
[2022-09-05T15:59:14Z INFO  aquadoggo::materializer::worker] Register dependency worker with pool size 16
[2022-09-05T15:59:14Z INFO  aquadoggo::materializer::worker] Register schema worker with pool size 16
[2022-09-05T15:59:14Z INFO  aquadoggo::manager] Start replication service
[2022-09-05T15:59:14Z INFO  aquadoggo::manager] Start http service
[2022-09-05T15:59:14Z INFO  aquadoggo::graphql::schema] Subscribing GraphQL manager to schema provider
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
    document {
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

Still, this is already doing a lot! With this query we asked our `aquadoggo` if it knows any schemas and since we have just started it it doesn't know any yet! This is why the response is empty .. It's soon time to teach the `aquadoggo` some tricks but this is part of the next [how to create a schema tutorial](/tutorials/send-to-node). For now we get to know the doggo a little bit better.

### Documentation

You can see, this is already how we can interact with the node at any time, we can simply just write queries in the playground using our browser! When building a p2panda client you do nothing else: The client sends GraphQL queries to the node and handles the JSON responses! If you're curious now on how to build a client you can check out this [how to build a client tutorial](/tutorials/mushroom-app).

There are a couple of more queries you can find when you click on the _Docs_ tab in the right sidebar. Next to the `all_schema_definition_v1` query you find others, for example `all_schema_field_definition_v1` or `entryByHash` etc. Later you will find more queries here you created yourself by introducing new schemas to the node!

:::note What are all these queries?

`entriesNewerThanSeqNum`, `entryByLogIdAndSeqNum` and `entryByHash` are currently all required to [replicate](/specification/APIs/replication) data from one node to another ("Replication API"), these will mostly be used by other nodes. The other queries serve to find out which schemas exist, they will be used by [clients](https://p2panda.org/specification/APIs/queries) ("Client API"). Surely there will be more queries coming in the future.

:::

## Configuration

Now we learned how to start a node and how to interact with it via GraphQL! Let's see now how we can configure and adjust it to our special needs. This is mainly a collection of _cool tricks_ and not a full documentation of `aquadoggo`, also you probably might not need all of this in the beginning, but maybe it comes in handy soon!

### Data directory

Whenever we start a new node it will create a directory on your computer where it stores the database inside. On Linux this directory is by default under `~/.local/share/aquadoggo` and `/Users/<username>/Library/Application Support/aquadoggo` on MacOS systems.

We can use the `--data-dir` command line argument to change the path of this folder to something else. For example:

```bash
cargo run -- --data-dir ~/good-doggo
```

This can be useful if you want to temporarily experiment with a fresh, new `aquadoggo` installation without deleting your previous database.

:::note What are these strange `--`?

You might wonder why we have these `--` two dashes right before we set the argument. This is required to tell `cargo` that we're _not_ setting an argument for it but for `aquadoggo`. You can try removing them, `cargo` will tell you that it doesn't know what to do with `--data-dir`.

:::

### Delete database

Especially during development you might want to delete your database, you can do this by simply removing the data directory:

```bash
# Remove database on Linux
rm -rf ~/.local/share/aquadoggo

# Remove database on Mac OS
rm -rf ~/Library/Application Support/aquadoggo
```

Make sure that `aquadoggo` is not running anymore before you delete that folder.

:::caution Watch out!

This is _really_ deleting everything you stored in your node.

:::

### HTTP port

By default `aquadoggo` starts an HTTP server on port `2020`. If you want to change this you can use the `HTTP_PORT` environment variable like that:

```bash
# This changes the GraphQL endpoint to http://localhost:4040/graphql
HTTP_PORT=4040 cargo run
```

This is useful if for whatever reason your port `2020` is already occupied or if you want to run _more than one_ aquadoggo.

### PostgreSQL or SQLite

`aquadoggo` allows you to use an SQLite _or_ PostgreSQL database. SQLite is the default and really amazing as it does not require you to set up an actual database software. This is why it is so easy to just start an `aquadoggo`. It is also very useful for embedding `aquadoggo` for example _inside_ of an application where you don't want the users to also take care of the database, all should just work "out of the box".

Sometimes you want to use PostgreSQL though, maybe because you are planning to host your `aquadoggo` on a server where it will be used by hundreds of users at the same time. For this of course you need a [running PostgreSQL database](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04).

Just add the `DATABASE_URL` environment variable in front of the `cargo run` command to set the new URL for the database:

```bash
# Use an external PostgreSQL database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aquadoggo cargo run
```

:::tip Explore SQLite

By default `aquadoggo` will always use [SQLite](https://www.sqlite.org/index.html), if you have an `sqlite3` client installed you can explore the database like that:

```bash
# Explore the SQLite database (on Linux)
sqlite3 ~/.local/share/aquadoggo/aquadoggo-node.sqlite3
```

:::

:::tip Run SQLite in-memory

Another cool SQLite feature is that you can just store the database _in memory_, this means that it will be gone after you quit `aquadoggo`. This is also very useful if you really just want to try something out without storing the data somewhere longer.

```bash
DATABASE_URL=sqlite::memory: cargo run
```

:::

:::info Migrations

`aquadoggo` checks if there are any pending SQL migrations on every start up. If it detects missing migrations it will run it automatically against the given database.

:::

## Done!

Super, you know now how to start an aquadoggo on your computer or server! This is the first step towards running a p2panda application on your computer or building a new one. Check out the [next tutorial](/tutorials/send-to-node) on how to send data to your running node.

:::tip Extra: Embed a node

This is not part of this tutorial but we just want to mention that you can _also_ run a node programmatically by embedding it directly in your Rust codebase:

```rust
use aquadoggo::{Configuration, Node};
let config = Configuration::default();
let node = Node::start(config).await;
```

This is very similar to using the command line application, just that you can ship your applications now with a node running _inside_! Users will then automatically start the node whenever they start the application. Together with [Tauri](https://tauri.studio) your applications can even be written in JavaScript and still use `aquadoggo` internally - even when you're not a Rust developer!

:::
