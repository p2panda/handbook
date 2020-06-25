---
working group: Panda Working Group
status: draft
created: 2020-05-21
rfc: 0001-schema
version: 1
authors:
  -
    name: Vincent Ahrend
    email: mail@vincentahrend.com
---

# Schema

## Summary

p2panda is a protocol for publishing structured data in a semi-federated network of peers. Messages are published by p2panda *clients* using the [bamboo protocol](https://github.com/AljoschaMeyer/bamboo) and relayed to other peers either through *servers* or via direct connections. While messages are encoded by clients as *entries* on *bamboo logs*, the payload of these entries is encoded using the p2panda message schemas described in this document.

This schema specification describes a meta-schema, that is used to publish specifications for application data schemas. Each schema definition describes both the format of messages used for data exchange as well as the database schema used to retain the message content. The latter aspect can also be seen as creating materialized view from bamboo logs (inspired by the Kappa Database Architecture).

Server administrators explicitly decide which schemas to materialize on their infrastructure based on the needs of their users. Application developers can effortlessly update and extend their schemata by publishing *migrations*, which are then applied on servers that materialize these schematas.

Being able to publish custom data schemas in a p2p network allows application developers to quickly create and distribute clients in a distributed architecture. Building on the bamboo protocol allows for high-performance synchronisation and data validation. By leveraging materialized views, clients can run on ressource-restricted hardware such as mobile devices and still benefit from the advantages of a distributed networking architecture.

# Chapters

## Overview
1. General Architecture
2. Bamboo Explained Shortly
3. Nomenclature

## Server-Client
1. Data Exchange Format
2. Meta Schema Definitions & Migrations
3. Bamboo Publish API
4. Message Schema Specification
5. Security & Encryption

## Server-Server
1. Discovery
2. Replication
