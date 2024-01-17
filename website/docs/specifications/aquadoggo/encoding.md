---
id: encoding-data
title: Canonical Encoding
---

p2panda requires a canonical encoding format to guarantee that hashing a value produces the same result across all implementations.

## CBOR

:::caution Requirement EN1

All CBOR values need to be encoded in canonical format and "strict mode" as per [CBOR specification](https://datatracker.ietf.org/doc/html/rfc7049#section-3.9).

:::

## Operations

:::caution Requirement EN2

All array values and map keys whose order is not semantic MUST be encoded in lexicographically sorted order and can not contain any duplicates.

Arrays without semantic meaning are:

- any _document view id_
  - including those in a _schema id_ or _pinned_relation_
- _previous_ array in an operation

:::
