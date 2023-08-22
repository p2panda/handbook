---
id: replication
title: Replication
---

## Introduction

- A core data type of p2panda are [bamboo][bamboo] append-only logs which contain sequences of application events. We build multi-writer [documents][documents] on top of these logs.
- Append-only logs are very useful in a p2p setting for achieving eventual consistency of data between peers on the network. Remotely connected peers can perform a simple log-height negotiation and then exchange only the data the other peer is missing.
- This document specifies how p2panda implements and expands on this replication protocol, including an announcement layer and efficient synchronization of multiple logs.

### Assumptions

- This document makes a number of assumptions on subjects outside of it's scope. These include:
    - Discovery: it is assumed peers can discover the addresses of other peers on their network.
    - Connectivity: it is assumed that peers can establish reliable, ordered and bi-directional transport channels
- p2panda uses the `libp2p` framework for discovery and other p2p networking mechanisms with QUIC as the transport. Further details are given in the [networking][networking] section.

## Encoding

- p2panda uses CBOR for encoding all replication messages.

## 1. Announcement

- The goal of replication is two peers converging to the same state, over data they are mutually interested in. This involves some sort of announcement mechanisms which aids finding peers who are interested in the same data.
- Data in a p2panda network can be categorised in form of schemas. Schemas are dedicated to support specific applications. A node expresses its support of an application by supporting the required schemas, trying to actively find and gather all new data from them.
- Before two peers begin the replication process they must first identify other peers which may hold data they are interested in.
- To do this they publish an `Announce` message which contains the schemas that they support. Doing this is like saying "I am interested in receiving and sharing any data associated with these [schemas][schemas]".
- Throughout this document we introduce two exemplary peers, Peer A and Peer B, which replicate with each other:
    - Peer A has a set A of [documents][documents] of [schemas][schemas] S
    - Peer B has another, diverging set B of documents of schema S
    - Peer A announces they are interested in documents of schema S by publishing an `Announce` message
    - Peer B eventually receives the `Announce` message from Peer A, comparing it to its own interest
- Peers can actively _push_ data to other peers who announced their interest
- Peers do not need to publish `Announce` messages to the network to participate in replication. They can still actively monitor announcements on the network and establish connection as soon as they see fit.
- The mechanism for sending and receiving announcement messages in the network is out of scope of this document, a very suitable pattern is publish-subscribe.

### `Announce` message

```
[
    <message_type=0 {u64}>,
    <version {u64}>,
    <timestamp {u64}>,
    [<schema_id {string}>, ...]
]
```


- `message_type` is `0`.
- `version` is the version of the replication protocol the peer supports, all following messages and mechanisms are related to that version. The first version is `1`. 
- `timestamp` represents the UNIX timestamp of the moment the announcement message has been created. Strictly speaking it does not need to be a real timestamp but MUST always be larger than the previously published one.
- `schema_id[]` is a list of [schemas][schemas] ids the peer is announcing its interest in.

- Every peer is represented by exactly only one announcement state. On arrival of a new `Announce` message the previous state gets replaced with the latest one.
- To understand which `Announce` message is the latest, the receiving peer compares the new `timestamp` with the current one. If an `Announce` message arrived with a smaller or equal `timestamp` it gets ignored, if it is larger the new state replaces the old one.
- Through this peers can safely broadcast announcements while still making sure that the order is preserved, even when messages arrive out-of-order or too late.
- Peers can "unannounce" their interest in certain data by removing the [schemas][schemas] id in the new announcement messages. They can remove all announcements by simply sending an announcement message without any [schemas][schemas] ids.
- In the future this message can also include additional parameters, where data can be included or excluded based on the public key of an author or a certain sub-set of the data based on [documents][documents] ids, even specific requirements like text searches are imaginable ("I'm interested in data containing the word x in [schemas][schemas] S"), similar to the filters of the current [documents][documents] GraphQL API.

## 2. Replication

- Replication is the process of two peers synchronizing the data they hold locally, eventually arriving at the state where both peers hold the same data.
- In p2panda this mechanism is initiated by a `SyncRequest` message and is then followed by two distinct replication phases:
    1. Identification of the diverging state
    2. Exchange of data.
- After learning about the other peers interests through the `Announce` message, Peer B can initiate replication with Peer A by sending a message to initiate replication. This replication session can concern a sub-set of the announced schemas.
- Over time many replication session can take place following one announcement, individually concerning different sub-sets of the announcement.
- Peer A and Peer B can have multiple sync sessions at the same time.
- If an already existing sync session was requested between the same peers concerning the same schemas, it gets ignored.

### `SyncRequest` message

```
[
    <message_type=1 {u64}>,
    <session_id {u64}>,
    <mode {u64}>,
    [<schema_id {string}>, ...]
]
```

- `message_type` is `1`.
- `session_id` is an identifier used throughout the replication session to identify messages for this session. This helps the peers to connect the messages to the right session, especially when multiple sessions take place at the same time with the same peer. The session id starts with `0` and is incremented by `1` for every session and every peer. Session IDs can be reset after enough time of inactivity between two peers and usually don't need to be persisted.
- `mode` where `0` is *Log Height* mode and `1` is using *Set Reconciliation* mode
- `schema_id[]` allows us to identify the range of [documents][documents] we are interested in synchronizing (ie. all [documents][documents] associated with this set of schemas).

- Every item in this list needs to be contained in the latest announcement state. If one [schemas][schemas] id inside the `SyncRequest` message of Peer B is not part of the announcement of Peer A, the request gets ignored.

### 2.1. Identifying divergent state

- If we announced these [schemas][schemas] then we move onto identifying any divergent state, this involves the following steps:
    - Calculate tuples of `(PublicKey, LogId, SeqNum)` for _all_ authors who made contributions to any document associated with the [schemas][schemas] we are synchronizing. 
    - Sort this resulting list in lexical order (from here on we will refer to this sorted list as the sync range).
- In this step we want to efficiently identify all data which one peer may hold which the other does not yet have. This is a two way process, where ultimately both peers may need something from the other.
- With this range we now want to identify any divergent state between peers:
    - Missing logs
    - Logs with more entries / higher sequence number
- The naive way of achieving this would be for both peers to send the complete range to each other. They would then be able to calculate locally any state that diverged. This would result in unbounded lists of data being continually shared across the network, and has been proven in other p2p protocols to be a highly inefficient pattern.
- p2panda employs a messaging protocol called "range-based set reconciliation" to efficiently identify sub-ranges within our sync range which differ between peers.

#### Range-based set reconciliation

Thesis proposing the protocol: https://github.com/AljoschaMeyer/master_thesis
Protocol implementation in TypeScript: https://github.com/earthstar-project/range-reconcile and Rust: https://github.com/keks/unionize

- The `range-reconcile` implementation p2panda makes use of has a number of requirements we satisfy in this specification, these are:
    - Deterministically sorted range of items to be synced
    - Encoding format for messages
    - Lifting monoid
- p2panda sorts it's set items in lexical order.
- Messages concerning set reconciliation are encoded in the following form:
    - `EmptySet` message
        ```
        [
            <message_type=20 {u64}>,
            <session_id {u64}>,
            <can_respond {bool}>
        ]
        ```
    - `LowerBound` message
        ```
        [
            <message_type=21 {u64}>,
            <session_id {u64}>,
            [<public_key {string}>, <log_id {u64}>, <seq_num {u64}>]
        ]
        ```
    - `Payload` message
        ```
        [
            <message_type=22 {u64}>,
            <session_id {u64}>,
            <value {[<public_key {string}>, <log_id {u64}>, <seq_num {u64}>]}>,
            <can_respond {bool}>?,
            <upper_bound {[<public_key {string}>, <log_id {u64}>, <seq_num {u64}>]}>?
        ]
        ```
    - `EmptyPayload` message
        ```
        [
            <message_type=23 {u64}>,
            <session_id {u64}>,
            <upper_bound {[<public_key {string}>, <log_id {u64}>, <seq_num {u64}>]}>
        ]
        ```
    - `Done` message
        ```
        [
            <message_type=24 {u64}>,
            <session_id {u64}>,
            <upper_bound {[<public_key {string}>, <log_id {u64}>, <seq_num {u64}>]}>
        ]
        ```
    - `Fingerprint` message
        ```
        [
            <message_type=25 {u64}>,
            <session_id {u64}>,
            <lift_type {TODO}>,
            <upper_bound {[<public_key {string}>, <log_id {u64}>, <seq_num {u64}>]}>
        ]
        ```
    - `Terminal` message
        ```
        [
            <message_type=26 {u64}>,
            <session_id {u64}>,
        ]
        ```
    - All messages contain a `session_id` which was determined during `SyncRequest`
- The lifting monoid we use is based on the xxHash hashing algorithm.
- From this point on set reconciliation progresses until divergent state is identified. To read more about the messaging protocol please refer to the above documents.
- Set reconciliation and exchange of actual append-only log entries can take place at the same time as we're gaining knowledge about the other peer's state continously.
- When a Peer B receives an `EmptySet` message right from the beginning, the Peer B is asked to send all entries of the requested schemas to Peer A.
- After set reconciliation completed, both peers need to determine the logs which have not been mentioned by the other peer yet. The remaining `Entry` messages are then sent.

### 2.2. Synchronization of data

- Whenever a peer receives a `Payload` then it must locally determine exactly which log entries it needs to send the other peer in order for them to converge towards the same state. It does this by:
    - Retrieve a log from it's local store identified by the `public_key` and `log_id` received in the payload
        - If no log is found, then we _know_ the other peer has data we don't know about and we can assume _they_ will send it to _us_.
        - If a log is found and our local `seq_num` is less than the received one we _know_ the other peer has data we don't know about and we can assume _they_ will send it to _us_.
        - If a log is found and our local `seq_num` is greater than the received one we _know_ we have data the other peer doesn't and we should send it to them.
- This diffing process can take place already during set reconcilation. Sending the actual entry data can also happen simultaneously.
- Whenever a peer receives an `EmptySet` at the beginning of set reconciliation it needs to send all entry data related to the requested schemas directly

#### `Entry` message

```
[
    <message_type=2 {u64}>,
    <session_id {u64}>,
    <entry {bytes}>,
    <operation {bytes}>
]
```

#### Validation

- On receiving an entry the remote peer should perform all expected validation checks of the contained data.
    - Next to the already specified validation checks for Bamboo Entries and p2panda Operations we need to additionally check:
        - Is the data related to what was requested

#### Finalisation

- After set reconciliation finished we can finally determine which logs have not been mentioned at all by the other peer. Both peers determine the missing logs for the other peer and send all related entries.
- When all data was finally sent (including the missing logs) the peer sends a `SyncDone` message. When both peers received each others `SyncDone` messages they can consider the replication as finished.
- If both `SyncDone` messages have the `live_mode` flag set to `true` they can continue communication with each other, in an upgraded "live mode".

##### `SyncDone` message

```
[
    <message_type=3 {u64}>,
    <session_id {u64}>,
    <live_mode {bool}>
]
```

### Live Mode

Two peers talking to each other for the first time, first starting with set reconciliation, replicating all data and then after finishing this upgrading to live mode. At one point (for example because the routing algorithm decided to change peers) we can close that communication as well by sending a `SyncDone` message again, but with `live_mode` set to false.

```
SyncRequest
.. A LOT OF SET RECONCILIATION MESSAGES .. A LOT OF `Entry` messages .. (different log heights)
.. A LOT OF `Entry` messages .. (missing logs)
SyncDone live_mode=true
.. A LOT OF `Entry` messages ..
SyncDone live_mode=false
```

Two peers talking to each other, but opting out of live mode straight away, only replicate once over set reconciliation.

```
SyncRequest
.. A LOT OF SET RECON MESSAGES .. A LOT OF `Entry` messages .. (different log heights)
.. A LOT OF `Entry` messages .. (missing logs)
SyncDone live_mode=false
```

### Log Height Mode

- If for any reason it is un-desireable for a node implementation to support the recommended replication method using Set Reconciliation, then they can still participate in the network by supporting only Log Height replication by sending a `Have` message directly after receiving a `SyncRequest` message.
- Log Height mode should be announced in the peers `Announce` message.
- A `Have` message should contain a set of _all_ public key, log id, seq num tuples the peer holds for the requested sync range.

#### `Have` message

```
[
    <message_type=10 {u64}>,
    <session_id {u64}>,
    <log_height {[<public_key {string}>, <log_id {u64}>, <seq_num {u64}>, ...]}>
]
```

[bamboo]: /specification/data-types/bamboo
[documents]: /specification/data-types/documents
[networking]: /specification/networking
[schemas]: /specification/data-types/schemas
