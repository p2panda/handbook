# RPC API

JSON-RPC via WebSocket or HTTP.

## Publishing

### panda_getNextEntryArguments

**Parameters:**

1. `author` (hex encoded ed25519 public key bytes) `String`
2. `logId` `Number`

**Returns:**

* `encodedEntryBacklink`
* `encodedEntrySkiplink`
* `lastSeqNum`

### panda_publishEntry

**Parameters:**

1. `encodedEntry` Encoded bamboo entry (hex encoded bytes) `String`
2. `encodedPayload` Encoded CBOR payload (hex encoded bytes) `String`

**Returns:**

* %

## Reading

### panda_getInstances

**Parameters:**

1. `schema` Name of the schema `String`
2. `filter` `Object` (`@TODO`)

**Returns:**

* Array of the requested instance data (`@TODO`)

## Server schemas

### panda_getSchemas

**Parameters:**

* %

**Returns:**

`@TODO`. Array of registered data schemas on this server.

## Fork proofs (idea)

### panda_getForkProofs

**Parameters:**

* %

**Returns:**

* `@TODO: Write more about fork proofs`. Array of fork proofs (identified forked logs), the regarding positions in the logs where the forks occured and the current vote status which fork to follow. Users can vote on forks by publishing special system messages.
