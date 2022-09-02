---
title: Libraries
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## `p2panda`

p2panda provides all tools required to write a client, node or even your own protocol implementation. We call these "core" libraries as they are the starting point for writing more "high-level" libraries or applications.

The core library is shipped both as a Rust crate [`p2panda-rs`](https://crates.io/crates/p2panda-rs) with WebAssembly bindings and a NPM package [`p2panda-js`](https://www.npmjs.com/package/p2panda-js) with TypeScript definitions running in NodeJS or any modern web browser.

### Documentation

You can find the API documentations with more examples for both languages under the following links:

* [Rust](https://docs.rs/p2panda-rs/latest/p2panda_rs/)
* [TypeScript](https://p2panda.org/lib/p2panda-js)

### Installation

<Tabs groupId="libraries">
<TabItem value="rust" label="Rust" default>

```bash
cargo add p2panda-rs
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```bash
npm install p2panda-js
```

</TabItem>
</Tabs>

### Usage

<Tabs groupId="libraries">
<TabItem value="rust" label="Rust" default>

```rust
use p2panda_rs::identity::KeyPair;
let key_pair = KeyPair::new();
println!("{}", key_pair.public_key());
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```javascript
import { KeyPair } from "p2panda-js";
const keyPair = new KeyPair();
console.log(keyPair.publicKey());
```

</TabItem>
</Tabs>

## `aquadoggo`

[`aquadoggo`](https://crates.io/crates/aquadoggo) is the reference node server implementation for the p2panda network running as a command line application. It can also be embedded via the library inside your Rust program which allows you to write offline-first applications where both the client and the node live inside the same binary.

### Documentation

You can find the API documentations under the following links:

* [Rust](https://docs.rs/p2panda-rs/latest/aquadoggo/)

### Installation

```bash
cargo add aquadoggo
```

### Usage

```rust
use aquadoggo::{Configuration, Node};
let config = Configuration::default();
let node = Node::start(config).await;
```

### Run local node

```bash
# Run local node at http://localhost:2020
cargo run

# Turn on some logging for debugging
RUST_LOG=aquadoggo=debug cargo run
```
