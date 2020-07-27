# RPC API

JSON-RPC via WebSocket or HTTP to send and receive data between clients and servers.

## Messages

### `panda_nextEntryArguments`

**Parameters:**

1. `author` (hex encoded ed25519 public key bytes) `String`
2. `logId` `Number`

**Returns:**

* `encodedEntryBacklink`
* `encodedEntrySkiplink`
* `lastSeqNum`

### `panda_publishEntry`

**Parameters:**

1. `encodedEntry` Encoded bamboo entry (hex encoded bytes) `String`
2. `encodedPayload` Encoded CBOR payload (hex encoded bytes) `String`

**Returns:**

* %

### `panda_query`

**Parameters:**

1. `schema` Name of the schema `String`
2. `filter` `Object`

**Returns:**

* Array of the requested instance data

## Server informations

### `panda_schemas`

**Parameters:**

* %

**Returns:**

* Array of registered and pending data schemas on this server.

# TODO

* Finalize RPC specification
* Make it look nice
* Check for consistency in all other documents
