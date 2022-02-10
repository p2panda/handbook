---
sidebar_position: 3
---

# Schemas

- schemas are used to describe and validate the format in which data is published
- schemas have a name, a description and a number of _fields_
- the name of a schema MUST match the regular expression `([A-Za-z0-9][A-Za-z0-9\-\/\.]{0,63})`
  - the name of a schema MUST be at most 64 characters long
  - it begin with an alphanumeric character
  - it uses only alphanumeric characters, digits and the characters dash (-), slash (/) and period (.)
- the description of a schema MUST consist of unicode characters and MUST be at most 256 characters long
- a schema MUST have at most 1024 fields

## Encoding

- a schema definition is an encoding of its name, description and fields
- a schema definition can be encoded using CDDL
- a schema definition can be encoded using the _metaschema_
  - the _metaschema_ is a p2panda schema that allows publishing schema definitions

### CDDL Encoding

- todo: rules for describing schemas in CDDL

### Metaschema Encoding

- todo: rules for describing schemas in metaschemas

## Fields

- a field is defined by
  - _field name_
  - _field type_
- the field name MUST have only alphanumeric characters and MUST be at most 64 characters long
- the field type MUST be one of
  - _bool_
  - _int_
  - _float_
  - _str_
  - _relation_
  - _relation\_list_

### _bool_ fields

- encode a boolean value

### _int_ fields

- encode a signed 64 bit integer number

### _float_ fields

- encode a 64 bit floating point number

### _str_ fields

- encode a text string
- MUST use unicode encoding

### _relation_ fields

- encode a _relation_ to another _document_
- specify _document_ and _document view_
  - "document" is the document that the relation is pointing at
  - "document_view" is the exact version of the document that is being pointed at
  - applications MAY ignore `document_view` and interpret the relation to point at the latest version if that makes sense in the application's context
- _relation_ fields MAY be self-referential in that their target is of the same schema
  - self-referential relations MAY be interpreted as instance ordering in [queries](/docs/organising-data/queries)

### _relation\_list_ fields

- encode a list of _relations_ to other documents
- a relation list field defines a schema that all its related documents must have

## System and Application Schemas

- _system schemas_ are defined as part of the p2panda specification
  - system schemas MAY have unique procedures for [_reduction_](/docs/organising-data/reduction), [_reconciliation_](/docs/collaboration/reconciliation) and [_persistence_](/docs/organising-data/persistence) of their instances
  - system schemas are uniquely identified by their name and an integer version number
- _application schemas_ are published by developers
  - they may be used to transport application-specific data or they can be published as reusable data schemas to be used in many applications
  - application schemas are uniquely identified by the _instance id_ of their _metaschema_ instance
