# Queries

Clients can use the `panda_query` API command to query a server for data. Servers automatically build materialized views on top of the Bamboo logs to create faster and easier to query data tables of data the server is interested in / schemas it has installed.

The query API gives a few simple arguments to filter and sort data depending on the clients needs, for example:

```json
{
  "post": {
    "author": "...",
    "createdAt": {
      "lte": "2019-01-01"
    }
  }
}
```

# TODO

* Define query format
