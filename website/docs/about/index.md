---
title: Introduction
---

## Local first

In the last years we've learned how boring the internet can be: Centralised, commercial platforms take ownership over our data, sell it even further and on top prescribe how we can use it. With p2panda we're not changing the internet, but we're offering some tools for others to make networked software a little bit more exciting, energy and data efficient, secure but most of all fun, adventurous and playful!

p2panda is a protocol for local-first applications. "local first" is a somewhat unknown term and hard to grasp for most of us who learned how to navigate the internet in its current state. It basically means: The programs you use doesn't need a globally interconnected "internet" to function, but can simply just run - even when you're offline. And there is even more! If you imagine creating "data" without any other entity checking against it, for example when you're offline, then you can maybe also imagine that this is very different from how commercial platforms function: You don't "sign up" somewhere, don't upload your data "somewhere" and you can do with your data whatever you feel like.

p2panda gives developers the tools to build local-first websites, mobile- and desktop applications which run in decentralised networks. Building applications on top of p2panda means that you can truly call data your own as the protocol encourages that it can be stored everywhere, even just on your local computer.

Since data in p2panda is not owned by any central authority it can also be processed or visualised in any way you want. This means that p2panda allows you to build clients when you want to find an alternative approach to the problems they solve.

Data can grow endlessly which is also a problem in decentralised networks, with p2panda we encourage deletion and ephemeral data, only sending and storing data you really need.

Storing data "everywhere" can make software and data truly open but also a huge problem for privacy. For this p2panda integrates Messaging Layer Security (MLS) which is a protocol for secure message encryption, even for very large groups.

Building p2p protocols is complicated and challenging for developers but we want it to be playful and fun. With p2panda it should be possible to focus on building radical local-first software and explore exciting new UX patterns without diving too deep into p2p details.

The core or p2panda is built in Rust from which we also compile WebAssembly for TypeScript developers but we hope to support even more languages one day. For this we formulated a "p2panda specification" which is some sort of agreement developers can follow so different "p2panda implementations" can still understand each other.

## History

p2panda emerged out of activities around the self-curated zine BLATT 3000 (2014) and subsequent festivals VERANTWORTUNG 3000 (2016) and HOFFNUNG 3000 (2017), the latter of these being the catalyst for building a custom platform designed to help communities organise in a decentralised manner, also called HOFFNUNG 3000.

While exploring building a p2p festival platform we met many people from the communities around Secure Scuttlebutt, DAT / Hypercore, Cabal, Chaos Computer Club, Fediverse, Antiuniversity Now, Pixelache trying to understand how this technology affects the way we organise ourselves.

This led to a group of people interested in realising a protocol for p2p communication, which ultimately should serve as a tool to build applications, like a festival tool and more. We've been meeting regularly on Mondays since 2019 to hack p2panda. We have also been active in some other projects including the Liebe Chaos Verein, organising a p2p gathering and a reading group in Berlin. Obviously we're still going to organise another festival sometime!

In 2021-2022 we received NGI Pointer funding to bring p2panda to its first official release. Over the last months we focused a lot on a "core" set of p2panda functionality which is: Data creation, validation and querying with many features on top: Permission, Encryption, Schemas and more. Our main focus was to find a language around the problems we wanted to solve, making many diagrams to understand the structures we were looking for, designing APIs so it is easier for developers to get started with p2panda and finally implementing them.

## Team

"We", that is [Andreas Dzialocha](https://adz.garden), [Sam Andreae](https://samandreae.com/) and [Vincent Ahrend](https://www.vincentahrend.com), the current core team of p2panda.
