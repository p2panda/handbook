---
id: schemas
---

# Schemas

- schemas are used to describe and validate the format in which data is published
- schemas have a name, a description and a number of _fields_
- the name of a schema MUST match the regular expression `([A-Za-z][A-Za-z0-9_]{1,63})`
  - the name of a schema MUST be at most 64 characters long
  - it begins with a letter
  - it uses only alphanumeric characters, digits and the underscore character ( _ )
- the description of a schema MUST consist of unicode characters and MUST be at most 256 characters long
- a schema MUST have at most 1024 fields

## Encoding

- a schema definition is an encoding of its name, description and fields
- a schema definition can be encoded using CDDL
- a schema definition can be encoded using the _metaschema_
  - the _metaschema_ is a p2panda schema that allows publishing schema definitions

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

- encode a _relation_ to another _document_ or _document view_
- specify a _document_ (unpinned) or _document view_ (pinned)
  - unpinned relations represent a whole document that the relation is pointing at by using the document id
  - pinned relations define the exact version of the document as a list of document graph tips
- a relation field prescribes a schema for the referenced document
- a relation field prescribes if the relation is pinned or unpinned
- _relation_ fields MAY be self-referential in that their target is of the same schema
  - self-referential relations MAY be interpreted as instance ordering in [queries](/docs/organising-data/queries)

### _relation\_list_ fields

- encode a list of _relations_ to other documents or document views
- a relation list field prescribes a schema that all referenced documents must follow
- a relation list field prescribes if all references are pinned or unpinned
