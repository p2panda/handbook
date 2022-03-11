---
id: schemas
---

# Schemas

- schemas are used to describe and validate the format in which data is published
- schemas have a name, a description and a number of _fields_
- the name of a schema MUST match the regular expression `([A-Za-z][A-Za-z0-9_]{1,63})`
  - the name of a schema MUST be at most 64 characters long
  - it begins with a letter
  - it uses only alphanumeric characters, digits and the underscore character ( \_ )
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
  - _relation_list_
  - _pinned_relation_
  - _pinned_relation_list_

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
- specify a _document_ by it's document id
- a relation field prescribes a schema for the referenced document
- _relation_ fields MAY be self-referential in that their target is of the same schema
  - self-referential relations MAY be interpreted as instance ordering in [queries](/docs/organising-data/queries)

### _pinned_relation_ fields

- encode a*pinned_relation* to a _document view_
- specify a _document view_ by it's document view id
  - this relation can be descirbed as _pinned_ as it defines an exact version of a document
  - this is achieved by listing the document graph tips at the point of reference by their operation id
- a _pinned_relation_ field prescribes a schema for the referenced document

### _relation_list_ fields

- encode a list of _relations_ to other documents
- a relation list field prescribes a schema that all referenced documents must follow

### _pinned_relation_list_ fields

- encode a list of _pinned relations_ to document views
- a _pinned_relation_list_ field prescribes a schema that all referenced document views must follow
