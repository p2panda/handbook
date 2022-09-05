---
title: "Tutorial: Create a schema"
---

In this tutorial we want to register a new schema on a p2panda node and create our first document with it! We will use the [`send-to-node`](https://github.com/p2panda/send-to-node) command line tool and [`aquadoggo`](https://github.com/p2panda/aquadoggo) node for this.

:::note What is `send-to-node`?

`send-to-node` is the most simple program to send data to an p2panda node you can imagine. It takes the data you want to send, signs it with a private key and sends it to the node via GraphQL. It is great for doing very _basic_ things with p2panda, especially if you want to learn how everything works!

In the future you will probably not do _everything_ with `send-to-node` as it is maybe even too simple and therefore tedious to do more involved tasks. But for learning, testing and understanding it is really great, you can't get deeper than this!

:::

## What do I need?

* Rust
* Terminal
* Browser

<details><summary>How do I install Rust?</summary>

Make sure you have have a working Rust environment installed on your computer before you begin with the tutorial. You can check this by running `rustc --version` in your terminal. This tutorial was written with Rust version `1.63.0` but it will probably also work with other versions.

If you don't have Rust installed yet you can follow the steps on the official Rust website: [How to install Rust](https://www.rust-lang.org/tools/install).

:::info Never worked with Rust before?

This tutorial requires you to have a working Rust environment. If you have never worked with Rust before this is no problem! Setting it up is fairly easy and besides of using some basic command line commands there is no more Rust knowledge required to make the node run on your computer.

:::

</details>
