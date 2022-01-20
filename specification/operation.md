# Operation

## Summary

Operations describe updates performed on data over time. Every operation references the operation(s) it performs it's update on, a collection of linked operations can be composed as a graph which provides causal relationships between all operations.

Operation fields are validated against there schema deinition.

In the p2panda network operations are the payload of entries which are published to an authors logs.

## User stories

- as a developer
  - I want to be able to mutate data stored on the p2panda network.
  - I want invalid data to be detectable and rejected at time of publication.
  - I want to retain a causal relation between data updates without timestamping.

## Documentation

### Operation

Operations describe actions performed on data over time.

An Operation MUST specify which action it performs, these MUST be one of "CREATE", "UPDATE" or "DELETE".

An operation MUST reference a schema which can be used to validate its data fields.

An operations MAY contain a data payload made up of fields which MUST validate against the specified schema.

"UPDATE" and "DELETE" operations MUST contain a reference to all known graph tips (operations) visible at the time of writing. "CREATE" operations instantiate a new Document and therefore MUST NOT reference any previous operation.

Operations MUST contain a valid operation version number which can be used to validate the entire operation object itself against a coresponding operation meta schema.

```
{
    action: "CREATE” | “UPDATE" | "DELETE"
    schema: <HASH>
    version: <NUMBER>
    ? previous_operations: [HASH]
    ? fields: [{
        "<FIELD KEY>": <VALUE>
        "<FIELD VALUE>": <VALUE>
    }]
}

```

### OperationMeta

Expanded operation used when building/traversing an OperationGraph

```
{
    id: <HASH>
    author: <PUBLIC_KEY>
    operation: <OPERATION>
}
```

## Examples

> Concrete examples to expand understanding.

See: https://github.com/p2panda/p2panda/tree/main/p2panda-rs/src/operation
