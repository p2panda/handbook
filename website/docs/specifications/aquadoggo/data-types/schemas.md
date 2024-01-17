---
id: schemas
title: Schemas
---

- Schemas are used to describe and validate the format in which data is published
- Schemas are identified by their [schema id](#schema-id)
- Schemas have a name, a description and a number of _fields_

:::caution Requirement SC1

The name of a schema MUST match the regular expression `^[A-Za-z]{1}[A-Za-z0-9_]{0,62}[A-Za-z0-9]{1}$`

- The name of a schema MUST be at most 64 characters long
- It begins with a letter
- It uses only alphanumeric characters, digits and the underscore character ( `_` )
- It doesn't end with an underscore

:::

:::caution Requirement SC2

The description of a schema MUST consist of unicode characters and MUST be at most 256 characters long

:::

:::caution Requirement SC3

A schema MUST have at most 1024 fields

:::

## Fields

- A field is defined by
  - _field name_
  - _field type_

:::caution Requirement SC4

The field name MUST match the regular expression `^[A-Za-z]{1}[A-Za-z0-9_]{0,63}$`

- The field name MUST be at most 64 characters long
- It begins with a letter
- It uses only alphanumeric characters, digits and the underscore character ( `_` )

:::

:::caution Requirement SC5

The field type MUST be one of:

- _bool_
- _int_
- _float_
- _bytes_
- _str_
- _relation_
- _relation list_
- _pinned relation_
- _pinned relation list_

:::

### _bool_ fields

- Encode a boolean value

### _int_ fields

- Encode a signed 64 bit integer number

### _float_ fields

- Encode a 64 bit floating point number

### _bytes_ fields

- Encode a bytes (u8) string

### _str_ fields

- Encode a text string

:::caution Requirement SC6

_str_ fields MUST use unicode encoding

:::

### _relation_ fields

- Encode a _relation_ to one or many other _documents_
- There are four kinds of relation fields
  - Relations represent the whole referenced document through their _document id_
    - _relation_: reference to a single document
    - _relation list_: a list of references to documents
  - Pinned relations point at immutable versions of documents through their _document view ids_
    - _pinned relation_: reference to a single document view.
    - _pinned relation list_: a list of references to document views

:::caution Requirement SC7

All relation fields MUST define a schema that all referenced documents must conform to

:::

:::caution Requirement SC8

_relation_ fields MAY be self-referential in that their target is of the same schema. Self-referential relations MAY be interpreted as document ordering in [queries][queries]

:::

## System and Application Schemas

- _System schemas_ are defined as part of the p2panda specification
  - The format of system schema operations can be validated by their CDDL definitions
- _Application schemas_ are published by developers
  - They are used to validate the format of application specific data
  - All developers can create new application schemas by publishing documents of the `SchemaDefinition` and `SchemaFieldDefinition` system schemas
  - They are published as reusable data schemas and can be used in many applications
  - System schemas may have unique procedures for [_reduction_][reduction], [_reconciliation_][reconciliation] and _persistence_ of their documents

### Schema ID

- Schema ids are strings that uniquely identify a schema
- Every system schema's schema id is given in that schema's section below
  - They always start with the schema's name in snake case
  - Then an underscore separator
  - Then the letter v, followed by the schema's version number as an integer
  - Example: `key_group_v1`
- Application schema ids are constructed from the schema's name and document view id
  - They consist of sections separated by an underscore
  - The first section is the name, which must have 1-64 characters, must start with a letter and must contain only alphanumeric characters and underscores
  - The remaining sections are the document view id of the schema's `schema_definition_v1` document, represented as alphabetically sorted hex-encoded operation ids, separated by underscores.
  - Example `profile_picture_0020c65567ae37efea293e34a9c7d13f8f2bf23dbdc3b5c7b9ab46293111c48fc78b`
- As application schema ids can potentially grow very large the _schema hash id_ is an alternative identifier with limited size
  - Unless a limited-size identifier is required, the regular _schema id_ should be preferred as it's not possible to reconstruct the schema document from the _schema hash id_
  - The schema hash id is constructed by concatenating
    - The schema's _name_
    - **Two** underscore characters (`__`)
    - The schema's _document view hash id_
    - Example: `profile_picture__0020c65567ae37efea293e34a9c7d13f8f2bf23dbdc3b5c7b9ab46293111c48fc78b`

:::caution Requirement SC9

The name string in an application schema which MUST have 1-64 characters, MUST start with a letter and MUST contain only alphanumeric characters and underscores.

:::

## System Schemas

### Schema Definition

- Schema id: `schema_definition_v1`
- Used to publish [application schemas](#system-and-application-schemas)
- Fields:
  - `name`: string
  - `description`: string
  - `fields`: a pinned relation list referencing `schema_field_definition_v1` documents

### Schema Field Definition

- Schema id: `schema_field_definition_v1`
- Defines individual fields for [schema definitions](#schema-definition)
- Fields:
  - `name`: string
  - `type`: string

:::caution Requirement SC10

`schema_field_definition_v1` _type_ field MUST be one of

- `bool`: boolean
- `int`: integer number
- `float`: floating point number
- `bytes`: bytes string
- `str`: text string
- `relation(<schema_id>)`: reference to a document
- `relation_list(<schema_id>)`: a list of references to documents
- `pinned_relation(<schema_id>)`: reference to a document view
- `pinned_relation_list(<schema_id>)`: a list of references to document views

All _relation_ field types need to specify a schema

- `<schema_id>` in the above listing needs to be a valid schema id
- Documents referenced by any relation field, to which this schema field definition applies, need to be of this schema
- E.g. if you are publishing an operation to update a field with the type `relation(key_group_v1)`, the field value
  needs to be the document id of a `key_group_v1` document

:::

[queries]: /specifications/aquadoggo/APIs/queries
[reconciliation]: /specifications/aquadoggo/data-types/documents
[reduction]: /specifications/aquadoggo/data-types/documents
