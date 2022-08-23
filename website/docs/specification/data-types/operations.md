---
id: operations
title: Operations
---

- operations represent data changes
- operations are published as the payload of _bamboo entries_
- operations are identified by the hash of their bamboo entry
  - this is referred to as the _operation id_
- every operation is associated with a [bamboo author](/specification/data-types/key-pairs), which is encoded in the operation's _entry_
- every operation MUST have an _operation version_
  - it describes the version of the operation specification that is followed by that operation
  - this write-up represents the operation specification version 1
- every operation MUST have an _operation action_, which MUST be one of
  - `0` - results in a CREATE operation
  - `1` - results in an UPDATE operation
  - `2` - results in a DELETE operation
- every operation MUST have a [schema id](/specification/data-types/schemas)
- every DELETE and UPDATE operation MUST have _previous operations_ with `length > 0`
  - it contains an array of _operation_id_'s which identify the tip operation of any un-merged branches in this document graph
    - this is also known as a _document_view_id_
  - in the case where a graph has no un-merged branches, this array will contain only one id (the resolved graph tip)
  - publishing an operation which identifies more than 1 graph tip, effectively merges these branches into one
- a CREATE operation MUST NOT have _previous operations_

## Fields

- a CREATE operation MUST contain all fields of the operation's schema
- an UPDATE operation MAY contain any combination of fields from the operation's schema
- a DELETE operation MUST NOT contain any fields
- fields map field names to field values
  - field names are strings
  - field values can be of type: `u64`, `f64`, `boolean`, `string`, `relation`, `relation_list`, `pinned_relation`, `pinned_relation_list`
  - see [schema][/specification/data-types/schemas] for further specification of field names and -values
- to identify the actual type of an operation value an external schema is required

## Encoding

- operations are encoded using [CBOR][cbor] with the following format: `[version, action, "schema id", [previous operations]?, { [field key]: <field value> }?]`
  - version is encoded as a u64 integer and MUST be given
    - the latest operation specification version is `1`
    - unknown or unsupported operation versions MUST be rejected
  - action is encoded as a u64 integer and MUST be given, the regarding actions are represented as follows:
    - CREATE: `0`
    - UPDATE: `1`
    - DELETE: `2`
  - schema id is encoded as a string and MUST be given
  - previous operations is encoded as an array of operation ids, it MUST be omitted in a CREATE operation
  - fields are encoded as a map where the map keys are encoded as strings, it MUST be omitted in a DELETE operation
    - the map values can be encoded as one of the following types: `u64`, `f64`, `boolean`, `string`, `string[]` or `string[][]`
    - map names and values MUST match the given schema
    - the encoding reflects the core data types of CBOR while they MUST be interpreted as p2panda operation values when decoding with the help of a schema:
      - `string` can be interpreted as any string or a document id for a relation depending on the schema
      - `string[]` can be interpreted as a pinned relation (document view id) or a relation list (list of document ids) depending on the schema
      - `string[][]` is a pinned relation list
  - operations MUST never contain any more array fields than the specified ones, if they do they need to be rejected
- all array values and map keys must be serialised in sorted order and de-duplicated unless their order and occurrence is semantic
  - this is currently only required for document view ids, which are given inside of application schema ids, previous operations fields, pinned relation lists or pinned relations
  - all operations that have values or map keys which are not sorted or duplicate even though their order has no semantic meaning are invalid

## Usage

- clients can use operations to publish data changes
- clients must embed operations in bamboo entries to publish them
- clients can create a [document](/specification/data-types/documents#documents) by publishing a CREATE operation
- clients can update a document by publishing an UPDATE operation
  - every UPDATE operation leads to a new _document view_ of the document that is being updated
- nodes can [reduce](/specification/data-types/materialization#reduction) operations to produce a specific _document view_ of their document
- clients can delete a document by publishing a DELETE operation
  - nodes MUST delete all operations of a document once it has been deleted

[cbor]: https://cbor.io/
[snake_case]: https://en.wikipedia.org/wiki/Snake_case
