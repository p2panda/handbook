# Messages

Every author publishes entries in their logs which then get distributed in the network. Lets start with the following examples of an author `d4a1cb...` creating a new `post` entry which contains the following:

```json
{
  "action": "create",
  "schema": "post",
  "version": 1,
  "fields": {
    "title": "Holidays in the rainforest",
    "body": "Recommendable trees to hang, good food",
    "publishedAt": "2020-05-31T22:51:04+0000"
  }
}
```

All messages look similar to this one, they always contain an `action`, `schema`, `version` and `fields`. This example message describes the creation of a new post by setting the `action` to `create` and mentioning via `schema` that the following data is a `post`. We also mention the `version` of this message for backwards compatibility when potential future changes to the protocol occur. The actual data is contained under `fields`, this is where the actual post lives, everything else are meta informations for the servers to work with.

This message will be now signed and encoded as a Bamboo entry which we post to the server via the RPC API (`panda_nextEntryArguments` and `panda_publishEntry`). It gets verified by the server and if everything went well its stored now on the server database, ready for distribution to other servers in the network.

By creating a new post we create a new *instance* of the *collection* `post`. Collections are categories of data which is structured in the same way. Instances are singular data entries inside of a collection.

To read all instances of the post collection by the author `d4a1cb88a66f02f8db635ce26441cc5dac1b08420ceaac230839b755845a9ffb` we can request a list of them via the RPC API (`panda_query`) with the following result:

```json
[
  {
    "id": "992f4332cc7803aae74670d47da2f2eb5959246ddfd0275eae4abc574a5ebd306c8933000cb04569a12616283c5b2a2f1a6a686f4755087cffd7900965989f2d",
    "title": "Holidays in the rainforest",
    "body": "Recommendable trees to hang, good food",
    "publishedAt": "2020-05-31T22:51:04+0000"
  }
]
```

The same author can change the post by sending an `update` message, referencing this particular instance by mentioning its `id`:

```json
{
  "action": "update",
  "schema": "post",
  "id": "992f4332cc7803aae74670d47da2f2eb5959246ddfd0275eae4abc574a5ebd306c8933000cb04569a12616283c5b2a2f1a6a686f4755087cffd7900965989f2d",
  "version": 1,
  "fields": {
    "body": "Recommendable trees to hang, really good food"
  }
}
```

Finally the author is not happy with their post and wants to delete it by sending the following `delete` message:

```json
{
  "action": "delete",
  "schema": "post",
  "id": "992f4332cc7803aae74670d47da2f2eb5959246ddfd0275eae4abc574a5ebd306c8933000cb04569a12616283c5b2a2f1a6a686f4755087cffd7900965989f2d",
  "version": 1
}
```

## Encoding

Even though all API requests and responses are encoded as JSON, the `create`, `update` and `delete` messages are encoded in [CBOR](https://en.wikipedia.org/wiki/CBOR) format to optimize processing and transfer speed between servers. Messages are strictly speaking Bamboo entry payloads and more interesting for the server than for the clients as they only consume already cleaned-up and structured data from the servers. Since the keypair signing the entry lives inside the client we have to do the CBOR encoding here.

## Specification

Every message contains the `action`, `schema` and `version` fields:

```
{
  "action": <string>,
  "schema": <string>,
  "version": <number>
}
```

### Create instance

Create a new instance of a collection (for example a new "post" or "event").

`create` messages are extended by `fields`:

```
{
  "action": "create",
  "schema": <string>,
  "version": <number>,
  "fields": {
    <string>: <any>,
    ...
  }
}
```

### Update instance

Update a single existing instance (referred to via `id`) of a collection. Only to-be-updated fields need to be mentioned (via `fields`).

`update` messages are extended by `id` and `fields`:

```
{
  "action": "update",
  "schema": <string>,
  "version": <number>,
  "id": <string>,
  "fields": {
    <string>: <any>,
    ...
  }
}
```

### Delete instance

Delete a single existing instance (referred to via `id`) of a collection. This will request the server to remove the database entry. Please note that deletion in the whole network can not be guaranteed as servers do not have to follow that message and / or do not even receive it due to the distributed nature of this protocol.

`delete` messages are extended by the `id` field:

```
{
  "action": "delete",
  "schema": <string>,
  "version": <number>,
  "id": <string>
}
```

### Fields

- `action (<string>)`: Defines if a new instance of a collection is created or an existing instance is updated or deleted. Possible values are: `create`, `update` or `delete`.
- `schema (<string>)`: Name of the specification of the message. Every schema (for example "posts" or "comments") defines a collection on a server. A schema definition can be installed on a server which makes it validate and store wellformed messages of that schema. Unknown schemas are stored as Bamboo entries for further replication but ignored as queryable data for this server.
- `version (<number>)`: Version number of the message format. This value will be `1` until new message formats get introduced in future protocol updates.
- `id <string>`: Reference to a particular instance when updating its fields or deleting it.
- `fields <object>`: Actual data for the instance following the schema specification. Every field has a name (string) and a value which type is defined by the regarding collection schema. Messages not following the schema (with invalid types or names and missing fields) get rejected by the server.

# TODO

* Add reference to "Query" chapter
* Open question: can bamboo entries be hashed for shorter ids?
