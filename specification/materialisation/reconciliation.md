# Reconciliation

## Summary

Reconciliation of concurrent `Operations` on an `Instance` (if any occured) are resolved during the reconciliation phase of materialisation. This is accomplished by constructing a Directed Acyclic Graph from all known `Operations` on an `Instance` and then topologically sorting the graph where branching occurs. 

The result of this is a deterministic ordered list of `Operations` which can then be passed on down the materialisation chain into the reduction process.

A key element of this function is that *any nodes with knowledge of the same entry data should arrive at equivalent materialised state*.

## User stories

> Describe who is affected by your proposal and what changes they can expect by writing user stories about it. It can help to think about the questions: Why are we doing this? What use cases does it support? What is the expected outcome?

- As a developer I want to work with multi-writer data which can automatically resolve any conflicts and/or concurrent edits
- As a user I want concurrent writes on an `Instance` to be resolved automatically in a dertministic fasion.

## Documentation

> This section is a more formal description of the proposal, written as if it was a sub-section of the standard (for technical proposals) or a formal process or "fine print" for process proposals. It should be unambiguous and cover all known corner-cases. Formal language (such as protobuf schemas or binary header diagrams) is appropriate here.

### Struct `Node`

```rs
pub type Node = String;
```

### Struct `Edge`

```rs
pub type Edge = (Option<Node>, Node);
```

### Struct `PanDAG`
Can be sorted topologically into a deterministic list of `Node`s.

```rs
pub type PanDAG = Vec<Edge>;
```

## Examples

> Concrete examples to expand understanding.

With these simple structs and associated methods we can resolve conflicts and/or concurrent updates which may have been applied to a p2panda `Instance`. To do this we would assign the hashes and update_links from all known `Entries` associated with an `Instance` to the `Node`s and `Edge`s of a graph. This graph is then be sorted topologically resulting in an ordered list of `Entry` hashes whose associated `Operation`s could then be applied in order.

## Rationale, alternatives and drawbacks

> Why is this design the best in the space of possible designs? What other designs have been considered and what is the rationale for not choosing them? What is the impact of not doing this? Why should we _not_ do this?

This design strips out any knowledge of p2panda data types in order to keep the reconciliation logic seperate.

Another approach would be to contain more meta data in the `Node` struct. This may well be needed for implementing optimisations such as operation squashing, instance validation, things-we-don't-know-about-yet. 

## Outlook (optional)

> More thoughts on the topic that don’t need to go on the first version.
