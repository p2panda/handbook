# RPC API

[JSON-RPC](https://www.jsonrpc.org/specification) via WebSocket or HTTP to send and receive data between clients and servers.

## Messages

### `panda_getEntryArguments`

#### Parameters

1. `author` Ed25519 public key bytes encoded as hex `String`
2. `schema` YAMF BLAKE2b entry hash pointing at an entry describing the message schema `String`

#### Response

* `entryHashBacklink` YAMF BLAKE2b hash of the last entry in this log `String`
* `entryHashSkiplink` YAMF BLAKE2b hash of the last skip entry in this log `String`
* `lastSeqNum` Sequence number of the last entry in this log `Number`
* `logId` Id of the log `Number`

#### Example

**Request:**

```json
{
  "jsonrpc": "2.0",
  "method": "panda_getEntryArguments",
  "params": {
    "author": "5e3b0c90a02115c840b31d81489e507db68dd7d33d3e453b02985d25f3b76772",
    "schema": "0040f7d74d3a2e021bf2bcd99c2d7444cf24da7f28066b59125f6ac8637ee1e2e91dd27268b024011e13dad2a149799bb5fc4d5f618998029a86bcedb2f34e8e95a4"
  },
  "id": 1
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "entryHashBacklink": "0040485ff3de6b39bf43eca318e220d7e6ffbf903b0277a53feb0940c523afcd05d144353f14db8bed63d1c442945e008992e049d959a2e0d8f34ccb6fa02fddc5c7",
    "entryHashSkiplink": "0040533d218ac2c654a22ddb3c90c7e4f4c9fcc850bdaf64efbd86290947de9f3d0b1c2189351bc28cdc7094dd0c54083c0fb652386f4149e195854ec47807882e73",
    "lastSeqNum": 12,
    "logId": 1
  }
}
```

### `panda_publishEntry`

#### Parameters

1. `encodedEntry` New bamboo entry bytes encoded as hex `String`
2. `encodedPayload` CBOR payload bytes encoded as hex `String`

#### Response

* `entryHash` YAMF BLAKE2b hash of the published entry `String`

#### Example

**Request:**

```json
{
  "jsonrpc": "2.0",
  "method": "panda_publishEntry",
  "params": {
    "encodedEntry": "00ba6d9fa129db04a3edfe5d8734561ec99aff1f5abb079b9ef2ad0f7f1a31858600010d004069db5208a271c53de8a1b6220e6a4d7fcccd89e6c0c7e75c833e34dc68d932624f2ccf27513f42fb7d0e4390a99b225bad41ba14a6297537246dbe4e6ce150e8a55b4c5cd6726a5d21f8ef5f4a426855c5b7f415afbe6d47a2fdf613c46e272fb44719c7761c7294ba4b4a639f8dbfe82d73726925eda909a9546ed79de27e02",
    "encodedPayload": "68656c6c6f2062616d626f6f21"
  },
  "id": 1
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "entryHashSkiplink": "0040d52a461247c7014fa3cd9fedc0ae381f84b7158befe96fa250641b4a1b74501169ed046ad53389a8e7309a035bf2f68ea19e6ffaaf0ee5822c00e81e16fa4424"
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
  "params": {},
  "id": 1
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {}
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
  "params": {},
  "id": 1
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {}
}
```

# TODO

* Finalize RPC specification
* Make it look nice
* Check for consistency in all other documents
