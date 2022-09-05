---
title: "Tutorial: Create a schema"
---

In this tutorial we want to register a new schema on a p2panda node and create our first document with it! We will use the [`send-to-node`](https://github.com/p2panda/send-to-node) command line tool and [`aquadoggo`](https://github.com/p2panda/aquadoggo) node for this.

## What do I need?

* Rust
* Terminal
* Browser

<details><summary>How do I install Rust?</summary>

Make sure you have have a working Rust environment installed on your computer before you begin with the tutorial. You can check this by running `rustc --version` in your terminal. This tutorial was written with Rust version `1.63.0` but it will probably also work with other versions.

If you don't have Rust installed yet you can follow the steps on the official Rust website: [How to install Rust](https://www.rust-lang.org/tools/install).

:::info Never worked with Rust before?

This tutorial requires you to have a working Rust environment. If you have never worked with Rust before this is no problem! Setting it up is fairly easy and besides of using some basic command line commands there is no more Rust knowledge required to make `aquadoggo` and `send-to-node` run on your computer.

:::

</details>

## What is `send-to-node`?

`send-to-node` is the most minimal program to send data to an p2panda node. It takes the data you want to send, signs it with a private key and sends it to the node via GraphQL. It is great for doing very _basic_ things with p2panda, especially if you want to learn how everything works!

:::tip More tools

In the future you will probably not do _everything_ with `send-to-node` as it is may be even too minimal and therefore tedious to do more involved tasks, like creating complex schemas. But for learning, testing and understanding it is really great.

:::

### How does it work?

Let's have a quick look at the [source code of `send-to-node`](https://github.com/p2panda/send-to-node/blob/main/src/main.rs). You will notice that it is a fairly small program where most of the code is about parsing user input and preparing everything we need to make GraphQL queries.

Let's look at the interesting bits! The program ..

1. Checks if a file with a private key inside exists (encoded as a hexadecimal string). The default path is `key.txt`. If it exists, we derive the key pair from it, if it doesn't, we generate a new key pair and store it under that path.
2. Reads a JSON-formatted string from _stdin_ which gets deserialized into a p2panda operation. Operations are the actual data we send around in the network.
3. Makes a `nextArgs` GraphQL query to retreive the latest information from the node we need to create our next entry. You can [read more about entries](/learn/entries) in our learn section.
4. Takes the required informations (like `seqNum`, `logId`, `backlink` and `skiplink`) to encode the operation and entry
5. Signs the entry with the given key pair
6. Sends the encoded and signed data to the node using the `publish` GraphQL mutation!

:::note Why JSON?

p2panda does not use JSON internally, even though `send-to-node` works with `.json` files. It is just the choosen format for this program to create operations. Internally all operations are actually encoded as [CBOR](http://localhost:3000/handbook/specification/data-types/operations#encoding-format).

:::

