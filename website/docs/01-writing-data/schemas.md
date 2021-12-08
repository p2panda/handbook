---
sidebar_position: 3
---

# Schemas

- schemas are used to describe and validate the format in which data is published
- schemas have a name, a description and a number of _fields_
- the name of a schema MUST consist of alphanumeric characters and MUST be at most 64 characters long
- the description of a schema MUST consist of unicode characters and MUST be at most 256 characters long
- a schema MUST have at most 1024 fields
  - @cafca: Postgres seems to have an upper limit of [1600 columns](https://nerderati.com/2017/01/03/postgresql-tables-can-have-at-most-1600-columns/) so I thought it would be nice to stay clear of that, maybe we should even make it lower but I didn't want to set arbitrary limits here unless there is a good reason.

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

- encode a _relation_ to another _instance_
- _relation_ fields MAY be self-referential
  - self-referential relations MAY be interpreted as instance ordering in [queries](/docs/organising-data/queries)

## System and Application Schemas

- _system schemas_ are defined as part of the p2panda specification
  - system schemas MAY have unique procedures for [_reduction_](/docs/organising-data/reduction), [_reconciliation_](/docs/collaboration/reconciliation) and [_persistence_](/docs/organising-data/persistence) of their instances
  - system schemas are uniquely identified by their name and an integer version number
- _application schemas_ are published by developers
  - they may be used to transport application-specific data or they can be published as reusable data schemas to be used in many applications
  - application schemas are uniquely identified by the _instance id_ of their _metaschema_ instance