# Contributing to p2panda

> ⚠️ This document is a work in progress and might not contain everything that you expect in a `CONTRIBUTING.md` file. If you already have some questions, comments or need help you can message us directly via https://wald.liebechaos.org.

## How to contribute to the protocol specification?

The p2panda [Handbook](https://github.com/p2panda/handbook) has a [`/specification`](/specification) folder containing the official protocol specification formatted as Markdown files. To contribute to the specification for any part of the protocol, the following process takes place:

**1. Jam Phase**

- [Post your idea](https://github.com/p2panda/handbook/issues/new) for the protocol as a GitHub issue in this repository. You may use the format specified in [`/specification/TEMPLATE.md`](/specification/TEMPLATE.md) but you don't need to if that doesn't fit the idea at this stage.
- We use issues to collect uncomplete ideas that still need time, discussion and feedback. Some of them might never be part of the official specification but it can be nice to keep an idea somewhere for someone or something else. Issues can be discarded and don’t need to follow a strict form.
- Each issue is assigned to an user which then serves as the _facilitator_ of the idea, this person edits the issue description, others can comment below the issue to discuss it and give feedback at any time.
- Issues may be tagged with [labels](https://github.com/p2panda/handbook/labels). They help to get an overview of which ideas are out there for a given area of the p2panda project.

**2. Specification Phase**

- Once the facilitator feels that the idea has reached some maturity, they can write it down more formally by adding a Markdown file inside the `specification` folder. That file should follow the naming scheme and template specified in [`/specification/TEMPLATE.md`](/specification/TEMPLATE.md).
- Create a GitHub Pull Request (PR) with your contribution. PRs serve writing and reviewing the final specification.
- Similar to issues the person assigned to the PR is the _facilitator_, they edit the proposed specification and guide the process of developing the idea. Everyone may discuss the PR in the comments section.
- Move your PR from Draft into Ready to be merged status as soon as you're ready to move to the review and merge phase described below.

**3. Review and Merge Phase**

- The PR can be reviewed by anyone.
- The p2panda [project maintainers](/CODEOWNERS) approve the PR and merge it.
- The specification is now part of the handbook!

**4. Happy Phase!** 🎆

- The newly released specification is announced by the facilitator in the [#p2panda](https://wald.liebechaos.org/channel/p2panda) channel in rocket.chat.

## How to setup my development environment?

p2panda is currently in an early development phase. We aim at releasing a stable API and backwards compatibility for future updates as soon as we reach our first major version (`1.0.0`). Until then you might need to set up a local development environment to test your p2panda experiments.

**Requirements**

* NodeJS v16 and npm v8 (recommended install via a Node version mananger like [`n`](https://github.com/tj/n) or [`nvm`](https://github.com/nvm-sh/nvm))
* Rust 1.58 (stable) (install via [`rustup`](https://www.rust-lang.org/tools/install)
* wasm-pack 0.10.2 (run `cargo install wasm-pack` or [read more](https://rustwasm.github.io/wasm-pack/installer/))

**1. Build `p2panda-js`**

- Clone the `p2panda` repository via `git clone https://github.com/p2panda/p2panda.git` and move into the `p2panda-js` folder inside of it
- Run `npm install` to install all dependencies
- Run `npm run build` to compile WebAssembly and bundle the JavaScript package
- Run `npm link` to locally link to the `p2panda-js` package. Now you can use it somewhere else!

**2. Run `aquadoggo` node**

- Clone the `aquadoggo` repository via `git clone https://github.com/p2panda/aquadoggo`
- Run `cargo run` inside of it. This will start a locally running node on your machine under http://localhost:2020

**3. Build your p2panda project**

- You can clone our example application *beep-boop* to test your p2panda setup. Download it via `git clone https://github.com/p2panda/beep-boop` and run `npm install` and `npm start` to open it in your browser under http://localhost:4000
- You can refer to the latest `p2panda-js` version by linking to the package you've compiled in the steps above. Run `npm link p2panda-js` to use it inside of the project you're working on

## Style Guide

### Rust

- Imports are grouped by: 1. `std`, 2. external crates, 3. `crate` 4. `super`.

  ```rust
    use std::collections::BTreeMap;
    
    use rstest::rstest;

    use crate::hash::Hash;
    use crate::operation::OperationId;
    use crate::test_utils::fixtures::random_hash;

    use super::DocumentId;
  ```
  
- Prefer using `crate` imports over `super`, except in `tests` modules where you import something from the same file.

  ```rust
  use crate::hash::Hash;
  use crate::document::DocumentViewId;
  
  struct TheThingImTesting;
  
  #[cfg(test)]
  mod tests {
    use super::TheThingImTesting;
  }
  ```
  
- Newlines are appreciated to structure your code into logical blocks and make it easier to follow it.

  ```rust
  let some_thing = im_initialising_it();
  let some_other_thing = more_initialization();
  
  let result = make_request(&some_thing, &some_other_thing).await?;
  
  assert_eq!(result, 42);
  ```

- Code often does not explain itself, give it a comment!

  ```rust
  // The queue is empty, but this node has dependencies missing then there
  // is either a cycle or missing nodes.
  return Err(GraphError::BadlyFormedGraph);
  ```
  
- Whenever you `unwrap`, explain why in a comment.

  ```rust
  // We unwrap here because this can never go wrong
  trojan_horse.unwrap();
  ```
  
- We write documentation for _everything_, struct members, methods, modules, etc.

- Doc-Strings appear before [attributes](https://doc.rust-lang.org/reference/attributes.html).

  ```rust
  /// Valid field types for publishing an application schema.
  #[derive(Clone, Debug, PartialEq)]
  pub enum FieldType {
    // ...
  }
  ```

- We try to write in British English.

- Module-level docstrings are not followed by a newline

  ```rust
  //! Create, sign, encode and decode [`Bamboo`] entries.
  //!
  //! Bamboo entries are the main data type of p2panda. Entries are organised in a distributed,
  //! single-writer append-only log structure, created and signed by holders of private keys and
  //! stored inside the node database.
  //!
  //! [`Bamboo`]: https://github.com/AljoschaMeyer/bamboo
  mod decode;
  ```
  
- Every file needs a license header: `// SPDX-License-Identifier: AGPL-3.0-or-later`

- Make `cargo clippy` and `cargo fmt` happy.
