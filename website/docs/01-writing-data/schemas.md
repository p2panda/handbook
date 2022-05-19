---
id: schemas
---

# Schemas

- schemas are used to describe and validate the format in which data is published
- schemas are identified by their [schema id](#schema-id)
- schemas have a name, a description and a number of _fields_
- the name of a schema MUST match the regular expression `^[A-Za-z]{1}[A-Za-z0-9_]{0,62}[A-Za-z0-9]{1}$`
  - the name of a schema MUST be at most 64 characters long
  - it begins with a letter
  - it uses only alphanumeric characters, digits and the underscore character ( `_` )
  - it doesn't end with an underscore
- the description of a schema MUST consist of unicode characters and MUST be at most 256 characters long
- a schema MUST have at most 1024 fields

## Fields

- a field is defined by
  - _field name_
  - _field type_
- the field name MUST match the regular expression `^[A-Za-z]{1}[A-Za-z0-9_]{0,63}$`
  - the field name MUST be at most 64 characters long
  - it begins with a letter
  - it uses only alphanumeric characters, digits and the underscore character ( `_` )
- the field type MUST be one of
  - _bool_
  - _int_
  - _float_
  - _str_
  - _relation_
  - _relation list_
  - _pinned relation_
  - _pinned relation list_

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

- encode a _relation_ to one or many other _documents_
- all relation fields MUST define a schema that all referenced documents must conform to
- _relation_ fields MAY be self-referential in that their target is of the same schema
  - self-referential relations MAY be interpreted as instance ordering in [queries](/docs/organising-data/queries)
- there are four kinds of relation fields
  - relations represent the whole referenced document through their _document id_
    - _relation_: reference to a single document
    - _relation list_: a list of references to documents
  - pinned relations point at immutable versions of documents through their _document view ids_
    - _pinned relation_: reference to a single document view.
    - _pinned relation list_: a list of references to document views

## System and Application Schemas

- _system schemas_ are defined as part of the p2panda specification
  - system schemas MAY have unique procedures for [_reduction_](/docs/organising-data/reduction), [_reconciliation_](/docs/collaboration/reconciliation) and _persistence_ of their documents
  - the format of system schema operations can be validated by their CDDL definitions
- _application schemas_ are published by developers
  - they are used to validate the format of application specific data
  - all developers can create new application schemas by publishing documents of the `SchemaDefinition` and `SchemaFieldDefinition` system schemas
  - they are published as reusable data schemas and can be used in many applications

### Schema ID

- schema ids are strings that uniquely identify a schema
- every system schema's schema id is given in that schema's section below
  - they always start with the schema's name in snake case
  - then an underscore separator
  - then the letter v, followed by the schema's version number as an integer
  - example: `key_group_v1`
- application schema ids are constructed from the schema's name and document view id
  - they consist of sections separated by an underscore
  - the first section is the name, which must have 1-64 characters, must start with a letter and must contain only alphanumeric characters and underscores
  - the remaining sections are the document view id of the schema's `schema_definition_v1` document, represented as alphabetically sorted hex-encoded operation ids, separated by underscores.
  - example `profile_picture_0020c65567ae37efea293e34a9c7d13f8f2bf23dbdc3b5c7b9ab46293111c48fc78b`
- as application schema ids can potentially grow very large the _schema hash id_ is an alterantive identifier with limited size
  - unless a limited-size identifier is required, the regular _schema id_ should be preferred as it's not possible to reconstruct the schema document from the _schema hash id_
  - the schema hash id is constructed by concatenating
    - the schema's _name_
    - **two** underscore characters (`__`)
    - the schema's _document view hash id_
    - example `profile_picture__0020c65567ae37efea293e34a9c7d13f8f2bf23dbdc3b5c7b9ab46293111c48fc78b`

## System Schemas

### Schema Definition

- schema id: `schema_definition_v1`
- used to publish [application schemas](#system-and-application-schemas)
- in order to be a valid description of an application schema, a schema definition's fields MUST conform with the restrictions for schema name, description and fields [described at the top](#)
- fields:
  - name: string
  - description: string
  - fields: a pinned relation list referencing `SchemaFieldDefinition` documents

### Schema Field Definition

- schema id: `schema_field_definition_v1`
- defines individual fields for [schema definitions](#schema-definition)
- fields:
  - name: string
  - type: string
    - MUST be one of
      - `bool`: boolean
      - `int`: integer number
      - `float`: floating point number
      - `str`: string
      - `relation`: reference to a document
      - `relation_list`: a list of references to documents
      - `pinned_relation`: reference to a document view
      - `pinned_relation_list`: a list of references to document views
    - all _relation_ field types need to specify a schema
    - _TODO: define format of reference to a schema_
