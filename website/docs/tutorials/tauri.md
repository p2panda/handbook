---
title: 'Tutorial: Embed node in a Tauri app'
---

In this tutorial we will see how to embed an `aquadoggo` node in a Tauri app. Tauri is a framework for build apps which have a Rust backend and WebView frontend which will compile for all major desktop platforms (mobile coming soon). This means we can easily package our `aquadoggo` node alongside a frontend written in your favorite web framework (or none at all).

In this tutorial we will focus on the backend code, where we'll embed our node, configure secure persistent storage for both WebView (LocalStorage) and node data, demonstrate useful configuration flows, define commands callable from the frontend and populate the node with app schemas on startup. We'll look at the frontend code which demonstrates advanced GraphQL queries and how to publish and retrieve blobs in the following tutorials.

## What do I need?

- NodeJS
- Rust
- Tauri dependencies
- Editor
- Terminal

:::info Never worked with Rust and/or Tauri before?

This tutorial requires you to have a working Rust environment and all Tauri dependencies installed. If you have never worked with Rust and/or Tauri before this is no problem! Setting it up is fairly easy and besides using some basic command line commands there is no more Rust knowledge required to make the node run on your computer.

:::

<details>
  <summary>How do I install NodeJS?</summary>
  <div>
    You can check out the official [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/) guidelines here. But we would recommend you installing a NodeJS version manager like [nvm](https://github.com/nvm-sh/nvm), or even better [n](https://github.com/tj/n). We used the NodeJS version `18.17.0` for this tutorial.
  </div>
</details>

<details>
  <summary>How do I install Rust & Tauri dependencies?</summary>
  <div>  
  Make sure you have a working Rust environment installed on your computer before you begin with the tutorial. You can check this by running `rustc --version` in your terminal. This tutorial was written with Rust version `1.63.0` but it will probably also work with other versions.

If you don't have Rust installed yet or you need just the Tauri dependencies you can follow the steps from the Tauri website: [Tauri: Getting Started](https://tauri.app/v1/guides/getting-started/prerequisites).

  </div>
</details>

:::info What is `aquadoggo`?

If you aren't familiar with `aquadoggo` then I recommend checking out the ["How to run a node"](/tutorials/aquadoggo) tutorial before you do this one. It focuses on using `aquadoggo` on the command line, but all the features and configuration parameters are the same when working with it programmatically.

:::

## Download the application code

Everything we need for this tutorial is in the `p2panda/tauri-example` repository. Download the code and install NodeJS dependencies like so.

```bash
# Clone the `tauri-example` git repository
git clone https://github.com/p2panda/tauri-example

# Move into the folder you've just created
cd tauri-example

# Install NodeJS dependencies
npm install
```

## Run the application

First we're going to simply run the application, this will compile the front and backend and launch the app in dev mode. The first step (compilation) will likely take... a while.... don't worry though, this is only the case the first time you run the command, after that only incremental builds are required and things will be a lot quicker.

```bash
# Run the tauri app in dev mode
npm run tauri dev
```

:::info What's "dev" mode?

When we launch an app in "dev" mode it means we are still in development, and so rather than an optimized build with production settings, we want to work in a developer friendly environment. In this case that means that means we don't persist any app data to the filesystem between runs and want code hot-reloading (the app updates automatically when we edit the code).

:::

You should see some output in your terminal like this (missing out the long compilation process):

```bash
npm run tauri dev

> p2panda-tauri-example@0.0.0 tauri
> tauri dev

     Running BeforeDevCommand (`npm run dev`)

> p2panda-tauri-example@0.0.0 dev
> vite


  VITE v4.5.2  ready in 135 ms

  ➜  Local:   http://localhost:1420/
  ➜  Network: use --host to expose
...
...
...
        Info Watching /home/sandreae/Code/tauri-example-test/src-tauri for changes...
    Finished dev [unoptimized + debuginfo] target(s) in 0.19s
Go to http://0.0.0.0:2020/graphql to use GraphQL playground
Peer id: 12D3KooWPzHvt52CYkYPvejsBjgjcsqyBszcEQrDhDp6RSdYx6qx
Node is listening on 0.0.0.0:2022
Schema migration: app schemas successfully deployed on initial start-up
```

We're using `vite` to package the frontend code and assets, you can see that a dev server is started at `http://localhost:1420/`. This is where tauri will look for the frontend code during development. Next the rust code is compiled and eventually the app is launched. The last four lines are logging from the `aquadoggo` node which has now started up. You can go to `localhost:2020/graphql` to check the GraphQL playground is being served correctly.

The app window should now have opened, it'll be a blank screen.... not very interesting... until you start clicking! Then you can draw pointless messages like this with panda gif stickers (yay!):

![](assets/tauri-example-screenshot.png)

## How does it all work?

A _lot_ happened there, but it's worth pointing out now that you don't actually need to know much about it if you just want to start hacking on a web client (for that you can go straight to `src/` where all the frontend JavaScript code is). This tutorial would be quite short if we didn't dig a bit deeper though. Let's take it step by step.

As we saw from the logging, a node _did_ start up, so where did it come from?

### Add `aquadoggo` to `Cargo.toml`

The absolute first thing we need to do to use `aquadoggo` in any rust project is to add it as a dependency in our `Cargo.toml` file. We'll need `p2panda-rs` for creating an identity for the node too so let's add that now as well.

```toml
[dependencies]
p2panda-rs = "0.8.1"
aquadoggo = "0.7.1"
```

The `aquadoggo` crate gives us access to a programmatic API with which we can configure, start, migrate data to, and stop our node.

:::info What about publishing and querying data?

This is all done from the frontend code via the `GraphQL` API!

:::

### Start the node

We can start a node like this:

```rust
use aquadoggo::{Configuration, Node};
use p2panda_rs::identity::KeyPair;

// We're using `tokio::runtime` to make main async.
#[tokio::main]
async fn main() {
    // Generate a key pair for the node identity.
    let key_pair = KeyPair::new();

    // Construct a default configuration.
    let config = Configuration::default();

    // Start the node!
    let node = Node::start(key_pair, config).await;

    // The node is already started now, wait here on the blocking future `on_exit` which resolves when any of the node's services exit with an
    // error or because of user closure.
    node.on_exit().await;

    // Finally we call `shutdown` to gracefully close all remaining services, including database connections.
    node.shutdown().await;
}
```

You can see the complete runtime life of a node in the above code, mostly it spends it's time running in the background, responding to HTTP and GraphQL requests from clients, and replicating with other nodes. The main point of interest for this tutorial is how we wrap this simple code into a tauri app and, crucially, configure the node at runtime.

### Create a tauri project

#### `tauri.conf.json`
#### Resources

### Logging

### Persistent storage

### Node configuration

### Tauri commands

### Schema migration

### Multiple nodes / replication
