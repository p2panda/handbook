---
id: encoding-data
title: Encoding
---

### Hexadecimal

:::note Requirement EN1

Unless otherwise specified hexadecimal encoding MUST use lowercase charachters. Each byte MUST be encoded using two hexadecimal digits.

:::

### CBOR

- p2panda requires a canonical encoding format to guarantee that hashing a value produces the same hash every time it is encoded, for all implementations. To achieve this we add some requirements on top of the CBOR specification.

:::note Requirement EN2

All CBOR array values and map keys whose order is not semantic MUST be encoded in lexicographically sorted order.

:::

:::note Requirement EN3

All CBOR map keys MUST be unique.

:::

### Conventions

- p2panda prefers [snake case][snake_case] for field names.
