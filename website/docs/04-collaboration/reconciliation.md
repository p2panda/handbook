---
sidebar_position: 3
---

# Reconciliation

- Reconciliation is the process of resolving sequences of changes made by multiple key pairs to the same document into a final datum
- p2panda is recording _causal information_ as part of operations in order to make reconciliation effective
    - p2panda doesn't have access to reliable information on the point in time that edits were made in, which would usually be used to reconcile sequences of edits
- See the [draft document spec](https://laub.liebechaos.org/wYzMa0w8S12iYvQommrdrA) for implementation details