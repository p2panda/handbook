---
sidebar_position: 1
slug: /
---

# Overview

p2panda lets you build applications connected by a feature-rich decentralised database with built-in identity and encryption providers. p2panda is playful, local-first, ressource-efficient, interconnected and hackable.

- build applications without managing servers
- users own their data and can take it everywhere they want: open data schemas allow access to the same data from multiple applications simultaneously
- strong encryption capabilities based on OpenMLS enable end-to-encryption, also in groups of arbitrary size, with post-compromise security and optional forward secrecy
- ready for local-first applications that work offline and with unstable internet connections 
- flexible network topologies from fully distributed serverless systems to federated server-based systems accessible from web or thin mobile clients
- built-in identity provider that lets users authenticate from multiple devices without creating accounts based on an email and password
- implemented in Rust but also available in Javascript and TypeScript through WebAssembly bindings with a comfortable TypeScript interface

## Limitations

- p2panda is gossip-based: without good connectivity between nodes data may only become available much later or not become available at all
- data is lost when no node has a copy of it anymore
- p2panda's multi-user capabilities may cause data to be overwritten when multiple users change the same data at the same time
- p2panda allows deleting data you published by broadcasting a deletion request, however hacked nodes may not honor these requests

## Handbook

- the handbook contains detailled descriptions of all capabilities of p2panda and contains references to technical specifications, examples and additional resources 
- the handbook is structured to begin at the very lowest level with how data is encoded and consecutively builds on that until high-level concepts can be explained
- you can start reading the handbook from the beginning by clicking the _next_ button at the bottom of this page to learn bit by bit or directly jump to sections of interest

## Reading notes

- `p2panda` refers to [the p2panda library](https://github.com/p2panda/p2panda)
