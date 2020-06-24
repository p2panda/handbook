# Bamboo Explained Shortly

- How are the structures of bamboo used? Key pairs, logs, entries.
- How do we deal with log ids?

### Multiple logs per user
(comments from adz)

#### Introduction

Every user can maintain multiple bamboo logs. Every log has its own unique `log_id` (see https://github.com/AljoschaMeyer/bamboo#concepts-and-properties). Logs hold entries with different messages inside, but have one limitation: Each log can only hold messages of the same type for. An log with multiple / mixed types is considered invalid and will be rejected by the server.

#### Log types

The type of a log is defined by its first message. These logs are named `user logs` except of so called `system logs` which have pre-defined message types.

To separate the log types we define a numbering schema for the `log_id`:

* Logs with ids `0-1023` are `system logs`
* Logs with ids `1024-∞` are `user logs`

##### Type: System log

So far only system log `0` is defined in this specification but the other 1023 "free" system logs are kept for future protocol changes or new extensions (for example blob handling, name resolving, encryption etc.).

* System log `0` accepts messages of type `schema`

##### Type: User logs

No user log exists yet on the server when a client generates a new keypair. In the moment the clients sends its (first) message to the server, let's say an create instance message of type `comment` ...

```yml
kind: create
schema: comment
spec: 1
fields:
  - body: Your concert was nice!
  - created: 2020-05-31T22:51:04+0000
```

... the following happens:

1. Client asks server about the next `backlink` and `limpaa link` for the next message of type `comment`. This is a required step to sign new bamboo entries on the clients side. The server looks into the database and checks if already any user log for `comment` exists. Since this is the very first message of this user, it can't find anything.

    ```
    nextEntryArguments {
      schemaName: "comment",
    }
    ```

    The server would reject this request if messages of type `comment` are not accepted. For now we assume they are accepted.

2. The server picks the next unused user log id, which in this case is `1024` (it is the first possible user log id) and sends it back to the client including `null` for the `backlink` and `limpaa link` field as no entries exist yet.

    ```
    {
      log_id: 1024,
      backlink_hash: null,
      lipmaalink_hash: null,
    }
    ```

3. With this data the client can encode the new bamboo entry now and send it finally to the server.

    ```
    postEntry {
      entryBytes: [...],
      payloadBytes: [...],
    }
    ```

    This encoded entry contains all required information for the server, including the `log_id`.

4. After validating the bamboo entry integrity the server checks (again) if it accepts messages of type `comment`. It also checks if the message is well-formed and all fields are following the defined schema. (Schemas are stored in system log `0` but live in memory of the server to improve the speed of validation and be able to pre-compile regex checks.)

5. Since we know the `log_id` from the entry the server checks if there are already any existing entries and which type they have. If it is not `comment` the request will be rejected. In this example the log is empty so the entry will just be inserted into the database.

Now the user maintains a user log of type `comment` at log id `1024`. All future `comment` messages will be placed in this log!