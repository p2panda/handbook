---
title: namakemono
---

import ImageFrame from '@site/src/components/ImageFrame';

> 🦥 namakemono = Sloth (Japanese) = Slow and forgetful = very delay-tolerant, offline-first and privacy-respecting 🩷

**namakemono** is a protocol designed for peer-to-peer and federated applications. It gives them sloth-superpowers: offline-first collaboration, fine-grained permissions, data validation, schema migration, decentralised MLS encryption, low memory footprint, efficient replication and privacy-respecting deletion.

<ImageFrame
  title="Sloth-Superpowers!"
  url={require('./assets/extensions.png')}
/>

**namakemono** was designed to solve hard privacy and efficiency problems when building collaborative applications in peer-to-peer systems. This includes:

* **Offline-first collaboration:** Create and edit data with others, even when you're offline. Distributed systems usually compromise on "how long" you can be offline, namakemono gives you the tools to stay offline as long as you want
* **Fine-grained capabilities:** Full control over your data by defining who can sync, create, update or delete what. Usually capability system require nodes to be online, namakemono designed a system which is offline-first
* **End-to-end encryption:** Secure and scaleable group encryption with a decentralised variant of the Messaging-Layer-Security (MLS) protocol
* **Don't grow data forever, except if you want to:** Keep the history of all changes if you need them, or delete old data instantly when your application does not require it, even of other authors
* **Privacy-respecting deletion:** Delete whole collections of data with one tombstone or let data disappear by itself, giving it an expiry date
* **Schemas:** Define and distribute versioned and migratable schemas of your choice to validate incoming data
* **Collections:** Structure hierarchies of data collections, combining them with permissions to model user-roles, moderation, admin access and more typical application concerns
* **Re-use your key-pair:** .. on multiple devices without being afraid of accidental forks
* **Efficient and partial sync:** namakemono is still a linked-list and can leverage from fast, simple and efficient log-replication
* **Flexible:** Use any CRDT, data validation format, encoding, digital signature algorithm or hashing algorithm you want!

:::note Status: Draft

namakemono is based on the original p2panda specification and can be seen as the next, simplified iteration. It helps us to leverage from the best parts we've came up with so far over the last years, separate application concerns more from the protocol ("bring your own CRDT") and remove the Bamboo append-only log data type (as we realized we haven't used it in the form it was designed for).

If you have any comments or feedback on this specification. Please [contact us](/contact)!

:::

## Short overview

<ImageFrame
  title="namakemono is a little bit like a typical append-only log, secured by signatures and cryptographic backlinks, but with a few tricks!"
  url={require('./assets/linked-list.png')}
/>

<ImageFrame
  title="Old data in the log + metadata can be removed directly as soon as new data arrives! How much history you want to keep is configurable."
  url={require('./assets/log-depth.png')}
/>

<ImageFrame
  title="Key pair reuse across multiple devices and accidental forks are tolerated"
  url={require('./assets/key-reuse.png')}
/>

<ImageFrame
  title="Multiple authors can collaborate on the same document - in this example with maximum depth(2)"
  url={require('./assets/document.png')}
/>

## Encoding & Cryptographic Primitives

* Namakemono works theoretically with any data encoding, digital signature algorithm (DSA) or hashing algorithm
* We recommend **Ed25519** for signatures, **BLAKE3** for hashing and **CBOR** for encoding

## Documents

* **Documents** is how we distinguish one piece of data from another
* Documents are created and changed with **Operations**, each operation changes the state of a document
* The first operation determines the beginning of a new document
* Any other operation which is part of the same document changes its state
* Many authors can contribute to one document

## Operations

* Every item in the linked-list is called an **Operation**
* An operation consists of a **Header** and a **Body**
* The header contains _always_ the following fields:
    ```rust
    struct Header {
        /// Version of the operation format, currently `1`
        version: u64,

        /// Digital signature of this operation, p2panda uses Ed25519
        signature: Signature,

        /// Public key of the author of this operation
        public_key: PublicKey,

        /// Hash of the body of this operation, can be omitted if no body is given
        payload_hash: Option<Hash>,

        /// Number of bytes of the body of this operation, can be omitted if no body is given
        payload_size: Option<u64>,

        /// UNIX timestamp.  If not the first operation in the document it needs to
        /// be larger or equal than the timestamp the operation points at via it's
        /// `backlink` or `previous` link (see below)
        timestamp: u64,

        /// Number of operations this author has published to this document, begins
        /// with `0` and is always incremented by `1` with each new operation by the
        /// same author
        seq_num: u64,
    }
    ```
* The Body is not further defined, it can be any arbitrary bytes
    ```rust
    struct Body(Vec<u8>)
    ```
* Since the header is stored separately from the body, the body can be deleted at any point without any consequences for the data type

## Creating documents

* As soon as an operation is published it is considered a CREATE operation. CREATE operations define a new document
    <ImageFrame
      title="Creating a new Salmon Cake recipe document with a CREATE operation"
      url={require('./assets/operation-example.png')}
    />
* The hash of this CREATE operation is used as the identifier of the whole document for its entire lifetime
    <ImageFrame
      title="Generating a hash from the operation header"
      url={require('./assets/hashing.png')}
    />
* This header of the CREATE operation should be kept for the lifetime of it's document, its signature is the proof of authorship for the owner (the owner can delegate capabilities later)

## Updating documents

* If we want to refer to this document with another UPDATE operation, changing the state of a document, we add the following fields to the header:
    ```rust
    struct Header {
        /// Hash of the previous operation of the same author
        backlink: Hash,

        /// Hash of the CREATE operation aka "document ID" we refer to with this update
        document_id: Hash,

        // ... plus same fields as above
    }
    ```
* The `seq_num` needs to be incremented by `1` and the operation is appended to the author's log for this document

## Collaboration

* If multiple users want to write to the same document, they refer to the same `document_id` when publishing UPDATE operations
* Here we have three different authors (Blue, Orange, Yellow) writing to the same document with ID `0x2bac` which was created by Blue:
    <ImageFrame
      title="Writing to the same document which was created by the Blue author"
      url={require('./assets/collaboration.png')}
    />
* By default it is not permitted to write to any document if you're not the original author. Through ["Capabilities"](#capabilities) we can add more authors, giving them the permission to write to your documents

## Views

* Document views represent the immutable state of a document at a particular point in its history of edits
    * Every change of a document results in a new document view
* A document view is identified by its set of graph tips: the document view id
    * Each graph tip is represented as an operation id
* It's possible to replicate the exact state of a document from the document view id, as long as the history was preserved
* Document views are required for `previous` links, extensions, like capabilities or encryption

## Ordering

* We need a way to determine which operations took place before others when collaborating on the same document
* Through adding `previous` links in the operation header we can determine a causal order of _which_ operations were created _before_ others (similar to vector clocks):
    ```rust
    struct Header {
        /// Optional list of hashes of the operations we refer to as the
        /// "previous" ones. These are operations from other authors
        previous: Option<Hash[]>,

        // ... plus same fields as above
    }
    ```
* We apply a topological sorting algorithm on top of the DAG formed by the `previous` links to determine this ordering
* This algorithm sorts all operations of all authors from "earliest" to "latest", the last operation in this sorted list is the "last" write
* Using `previous` links is optional as it depends on the application if this level of cryptographic security over ordering is required.
* When using `previous` links the `timestamp` fields become more secure as it is not allowed to publish an earlier timestamp than the previous one
    <ImageFrame
      title="Ordering operations of a document by previous links"
      url={require('./assets/previous-ordering.png')}
    />
* If no `previous` links have been given the `timestamp` is used to determine the ordering
    <ImageFrame
      title="Ordering operations of a document by timestamp"
      url={require('./assets/ordering.png')}
    />

## Forks

* If a peer observes duplicate `backlink` and / or `seq_num` fields, the `timestamp` is picked as a tie-breaker, if the `timestamp` is the same, the hash of the operation (operation ID) is picked as a tie-breaker, with the higher hash winning
* Accidental forks are not considered harmful to the system and can usually be resolved easily
* Forks by malicious authors need to be actively managed and removed by the application using the capabilities system (see more under "Capabilities"), authors are always explicitly granted permission to contribute to a document, they can be removed after malicious behaviour was noticed

<ImageFrame
  title="Example of a tolerated fork. We prefer the operation with the higher timestamp"
  url={require('./assets/fork.png')}
/>

## History

* The latest operations (see ["Ordering"](#ordering)) of the set determine the latest state of the document
* Documents can contain the history of their changes by preserving older operations
* It is possible to retain all history, or just the latest `n` operations for a document
    * **Shallow documents**: only keep the latest `n` operations
        * As new operations arrive from each author, they replace older versions, these older operations can be garbage collected
        * In this case causal ordering (`previous` links) between operations is sometimes lost and operation ordering falls-back to using `timestamp`
    * **Deep documents**: keep all causal history back to root
        * This guarantees accurate, delay-tolerant ordering of operations
        * Garbage collection can still be performed on the body of operations
        * Headers are retained for the lifetime of the document
* Depending on the applications requirements documents with a "longer" history can securely guarantee ordering through the `previous` links while more shallow documents need to rely more on insecure / forgeable timestamps
* Example: Using a CRDT into the operation body (like [YJS](https://docs.yjs.dev/) documents, for collaborative text editing for example), you might be interested *only* in the last operations per author and merge them to receive the latest document state:

<ImageFrame
  title="Document with maximum depth = 1, useful for working with CRDTs like y-js"
  url={require('./assets/yjs-example.png')}
/>

## Deletion

namekomono offers different forms of automatic or user-indented deletion, with various degrees of privacy as sometimes you do not want to keep traces of what data has been deleted by whom.

### Garbage Collection

* Pruning only takes place locally, other peers do not need to be informed about this decision

#### Operations

* As already mentioned under ["History"](#history) we can limit the maximum amount of operations per document and per author
* "Useless" operations are removed instantly as soon as the new one arrives

#### Documents

* Some documents are only retained when they are referenced by other documents, or if a reference they contain is still alive
* When references expire, entire documents or collections can be automatically garbage collected
* See ["Collections"](#collections) for an example

### Tombstones

* To delete a whole document we can publish a **Tombstone** operation which will cause all operations of this document to be deleted
* This tombstone is sent to other peers and kept forever to inform them that we want this document to be deleted
* If we want to delete / tombstone the document we add the action field inside the header, no body is required
    ```rust
    struct Header {
        /// Needs to be set to "true" to tombstone this document
        tombstone: Option<bool>,

        // .. plus all other header fields
    }
    ```
* As soon as we've observed at least one tombstone operation inside a document we do not accept any other further operations
* If references expire as a result of document deletion then then any effected documents should also be deleted (see ["Garbage Collection"](#garbage-collection))

## Extensions

Operations can be extended with certain features we usually want for high-level application concerns, like permission, encryption or defining data hierarchies. For this the header can be extended with additional informations.

### Ephemeral documents

* Documents can be defined as "ephemeral", giving an expiry date after which all their operations should be deleted
* No tombstones are needed for this sort of deletion
* The following field is added to the header:
    ```rust
    struct Header {
        /// UNIX timestamp
        delete_after: Option<u64>,

        // .. plus all other header fields
    }
    ```

### Schemas

* Schemas are documents which can be used to verify that an operation or document following that schema is respecting a certain format
* Other documents can refer to that schema to indicate that they comply with this format
* We can do this by adding an extension field in the operation header:
    ```rust
    struct Header {
        /// Document View ID of the schema document
        schema_id: Option<Hash[]>,

        // .. plus all other header fields
    }
    ```
* Document view ids are lists of all operation ids we want to refer to to "reconstruct" exactly this version of the document. This is required for deterministic behaviour and supporting schema "migrations"
* We distinguish between "system schemas" and "application schemas"
* System schemas are determined by this very specification and usually serve low-level purposes like handling permissions etc. while application schemas are defined by application developers
* Application schemas are not further defined and can follow different sorts of schema / validation techniques, depending on the application data
* Nodes can identify schemas of documents and validate them accordingly, reject operations which do not follow the given schema correctly

### Collections

* Sometimes we want to express multiple documents to be part of the same collection
* We can do this by publishing a **Collection** document and then adding an extension field in the operation of each document to assign it to this collection
* To create a collection document we publish a CREATE operation with the following `schema_id` header
    * `schema_id`: `collections_v1`
        * System schema identifier for collection documents
* To refer to this collection document we refer to it using the document id in the header
    ```rust
    struct Header {
        /// Document View ID of the collection document
        collection: Option<Hash>,

        // .. plus all other header fields
    }
    ```
* If a tombstone operation for a collection document was published, _all_ related documents get deleted as well
* Collection documents can again refer to "parent" collection documents
    * This allows for neat application patterns to design document and collection hierarchies
* Together with capabilities and collections we can express complex hierarchies of permissions. We can grant CREATE capabilities to allow publishing new documents in a collection, or think of groupings to express admins, roles and moderators etc.
    <ImageFrame
      title="Collections help to structure application data, moderation roles, permissions and hierarchies"
      url={require('./assets/collections.png')}
    />

### Capabilities

:::note

Capabilities are in the workings for 2024. Watch this space!

:::

* Capabilites are documents which grant permissions to certain public keys
    * It's like a token given to somebody else and they can use this token to proof now that they are allowed to do something
* These tokens can be revoked at any time
    * If deterministic behaviour during revocation is required, a high document depth is recommended
* To create a capability document we publish a CREATE operation with the following `schema_id` header
    * `schema_id`: `caps_v1`
        * System schema identifier for capabilities documents
* Capabilities can be given to UPDATE or DELETE documents
* When using Collections they can also be given to CREATE documents within that Collection
* Capabilities are given by stating:
    * `type`
        * Can be either `1` add permission or `0`: revoke permission
    * `document_id`
        * Which document does this capability apply to
    * `public_key`
        * Whom do I give this permission
    * `seq_num` (for `update` and `tombstone` actions)
        * From which point in an authors contribution history do I give permission to this author?
            * If not known, `0` is chosen
        * When revoking: From which point on do I remove this permission?
        * If revoking permission after a malicious fork it is recommended to revoke from `seq_num` @ fork - 1
        * To completly remove a malicious actor it is possible to revoke all previously given capabilities by removing them from `seq_num` 0 on
    * `action`
        * `read`
        * `create`
        * `update`
        * `tombstone`
        * `sync`
            * We want to support federation, for these cases we're explicitly separating "reading" from "syncing"
    * `create_allowance` (for `create` action)
        * When handing out `create` action capabilities an allowance can be specified as an unsigned integer, this limits the number of documents which can be created by this author in the target collection. Documents are selected in timestamp order, newest first.
* Other authors need to now refer to the most recent known document view id for when they publish an operation. They do this by stating the document View Id in the extension of their Operation
    * `capability`: `Hash[]`
        * List of operation ids representing the latest known version of this capability document
        * With this, honest peers limit the damage a malicious node can do, as they lock in any changes to the cap doc as they update the target doc. The worst a malicious node can do is withold state from both the cap and target document. Without the pointer they could withold operations from just the cap group "allowing in" operations to the target doc which already had their permissions revoked.

<ImageFrame
  title="Blue granting 'write' permission to the Yellow author"
  url={require('./assets/cap-1.png')}
/>

<ImageFrame
  title="Blue granting 'write' permission to the Green author"
  url={require('./assets/cap-2.png')}
/>

<ImageFrame
  title="Blue removing 'write' permission of the Yellow author for the future"
  url={require('./assets/cap-3.png')}
/>

<ImageFrame
  title="Blue retroactively removing operations of malicious Yellow author"
  url={require('./assets/cap-4.png')}
/>

* Capability documents can again refer to "parent" capability documents
    * This allows for neat application patterns like granting admin access / access to changing access for other users in an application

<ImageFrame
  title="Nesting capabilities to express complex user hierarchies and roles"
  url={require('./assets/caps-nesting.png')}
/>

### Encryption

:::note

Encryption is mostly handled by MLS and our "Secret Group" specification which is heavily in the workings in our roadmap 2024. Go to https://arewemlsyet.com/ for more information around decentralised MLS.

:::

* Operations refer to the MLS group and Epoch they used by using the document View Id of the MLS Group
    * `secret`: `Hash[]`
* Both header and body can be fully encrypted if no federation is required for the application
* If federation should be supported header data needs to stay plain-text and only the body can be encrypted
    * Exceptions are possible but this greatly depends on where trust is established in the application
    * This is a trade-off which needs to be decided by the application (no meta data leakage vs. federation support)
        * Federation is essentially "shared computing" where nodes do the "heavy work" for lightweight clients
* System documents (capabilities, secret groups / MLS etc.) can never be encrypted
    * Except when sharing encryption secrets is dealt with through another channels but this is out of scope for this specification

## Replication

* Nodes essentially ask for what documents (for example scoped by document ids, collection id, schema id, etc.) they are interested in and always prefer "latest" documents to be sent first (usually sorted by `timestamp`).
* Replication in itself is taking place by exchanging "log heights" since all documents can be expressed as logs, even when including forks (the forked branch is considered its own "log")
* Log heights are tuples of `(document id, public key, latest known seq num)`
* The latest known operation id needs to be added as well if it is known that a fork exists
* Nodes can not retrieve any data from any author or document if no `sync` capability was given

<ImageFrame
  title="Two nodes replicating data with each other"
  url={require('./assets/replication.png')}
/>
