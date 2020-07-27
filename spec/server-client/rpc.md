# RPC API

JSON-RPC via WebSocket or HTTP to send and receive data between clients and servers.

## Messages

### `panda_nextEntryArguments`

#### Parameters

1. `author` Ed25519 public key bytes encoded as hex `String`
2. `schema` Schema name of the to-be-created message `String`

#### Response

* `encodedEntryBacklink` Bytes of the last entry in this log encoded as hex `String`
* `encodedEntrySkiplink` Bytes of the last skip entry in this log encoded as hex `String`
* `lastSeqNum` Sequence number of the last entry in this log `Number`

#### Example

**Request:**

```json
{
  "jsonrpc": "2.0",
  "method": "panda_nextEntryArguments",
  "params": ["5e3b0c90a02115c840b31d81489e507db68dd7d33d3e453b02985d25f3b76772", "comment"],
  "id": 1
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "encodedEntryBacklink": "",
    "encodedEntrySkiplink": "",
    "lastSeqNum": 12
  }
}
```

### `panda_publishEntry`

#### Parameters

1. `encodedEntry` Encoded bamboo entry (hex encoded bytes) `String`
2. `encodedPayload` Encoded CBOR payload (hex encoded bytes) `String`

#### Response

* %

#### Example

**Request:**

```json
{
  "jsonrpc": "2.0",
  "method": "",
  "params": [],
  "id": 1
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
  }
}
```

### `panda_query`

#### Parameters

1. `schema` Name of the schema `String`
2. `filter` Filter query `Object`

#### Response

* Array of the requested instance data

#### Example

**Request:**

```json
{
  "jsonrpc": "2.0",
  "method": "",
  "params": [],
  "id": 1
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
  }
}
```

## Server informations

### `panda_schemas`

#### Parameters

* %

#### Response

* Array of registered and pending data schemas on this server.

#### Example

**Request:**

```json
{
  "jsonrpc": "2.0",
  "method": "",
  "params": [],
  "id": 1
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
  }
}
```

# TODO

* Finalize RPC specification
* Make it look nice
* Check for consistency in all other documents