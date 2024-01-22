---
title: 'Tutorial: Create a schema'
---

In this tutorial we want to register a new schema using the [`fishy`](https://github.com/p2panda/fishy) command line tool and [`aquadoggo`](https://github.com/p2panda/aquadoggo) node.

## What do I need?

- Editor
- Terminal
- Browser

## What is `fishy`?

`fishy` is a command-line-tool for creating and publishing schema onto the p2panda network. It allows you to define collections of schema in a human readable `toml` file and then encodes the schema in the correct format for publishing directly to a node, sharing via other channels, or embedding in an application.

We'll go through the steps one at a time below, for now just know that `fishy` is your friend when it comes to creating schema for your application.

### Install `fishy`

Head over to the [Releases](https://github.com/p2panda/fishy/releases) page and download the pre-compiled binary for your platform. This tutorial was written using `v0.2.1`.

Or on the command line:

```bash
curl -L https://github.com/p2panda/fishy/releases/download/v0.2.1/fishy-v0.2.1-x86_64-unknown-linux-gnu.tar.gz | tar -xz
```

For the rest of the tutorial we will run fishy simply using the command `./fishy`. If required, in your own commands adjust this to match the name of the binary you downloaded or rename it to accordingly.

## What is `aquadoggo`?

`aquadoggo` is a p2panda node implementation and command-line-tool, it's our gateway into the p2panda network. You can learn more about it in the [Set up a local node](/tutorials/aquadoggo) tutorial.

### Install `aquadoggo`

Head over to the [Releases](https://github.com/p2panda/aquadoggo/releases) page and download the pre-compiled binary for your platform. This tutorial was written using `v0.7.0`.

Or on the command line:

```bash
curl -L https://github.com/p2panda/aquadoggo/releases/download/v0.7.0/aquadoggo-v0.7.0-x86_64-unknown-linux-gnu.tar.gz | tar -xz
```

For the rest of the tutorial we will run aquadoggo simply using the command `./aquadoggo`. If required, in your own commands adjust this to match the name of the binary you downloaded or rename it to accordingly.

## Create a Schema

:::info When/why do we create schema?

All `p2panda` applications will have a collection of schema which they require, for example, a blog might need `blogs`, `blog_posts` and `comments`, these schema describe the shape of the documents the application will handle. `aquadoggo` looks at these schema to build an API which fits your use and to decide what data to look for on the network.

Creating and publishing schema might well be the first step you take when building an application, once you've done this you will have a very useful `GraphQl` interface available for publishing and querying data to/from the network.

:::

Ok, we want to create our own schema. To get the process started, make sure you're in the `fishy` directory and then run the following command:

```bash
./fishy init
```

A dialogue will ask you for the name of your first schema. Enter a name, for example "cafes" and press `enter` (don't worry, you can change this later). You will now find a `schema.toml` and `secret.txt` file in your folder.

The `schema.toml` contains some example schema definitions which we will edit in a moment, the `secret.txt` contains the private key which will be used for signing commits when building the schema.

`schema.toml` is where we define our schema, with any text editor edit the file so it contains the following definition:

```toml
[cafes]
description = "All the cafes where icecream is sold"

[cafes.fields]
name = { type = "str" }
address = { type = "str" }
opening_year = { type = "int" }

[icecreams]
description = "Icecream flavours you can get in cafes"

[icecreams.fields]
name = { type = "str" }
sweetness = { type = "str" }
cafes = { type = "relation_list", schema = { name = "cafes" } }
```

There's a lot going on here! We're defining two schema, `cafe` and `icecream`, they both have a `description` string and a list of `fields`. The `description` is required and at least one `field` must be defined for each schema.

The list of fields describe key-value pairs comprising of the field name, and it's type. Each key will be the fields name, it can be any string as long as it follows the [naming rules](/specifications/aquadoggo/data-types/schemas). The type object of each item indicates the fields type. Possible types are:

- `int`, which is an integer number (`i64`).
- `float`, which is a float number (`f64`).
- `bool`, which can be `true` or `false`.
- `str`, which can be any sort of text.

.. and now it gets interesting, there is even more:

- `relation`, which can be a reference to another document.
- `relation_list`, which can be a list of references to many documents!
- `pinned_relation`, which can be a reference to a _document view_. This is a document in a past, historical version. Like an _archived_ version you wanted to keep.
- `pinned_relation_list`, which is a list of document views!

If we look at the `cafes` field in our `[icecreams.fields]` list, you can see that there is an additional `schema` value in the field type object. This indicates that any documents which are related to in the `cafes` field will be of the type `cafes`, the name used here refers to the schema defined earlier in the file.

:::info Why relations?

One benefit of defining relations between schemas is that the node's query API becomes even more powerful. If I want to check all the cafes where my favorite ice cream flavours are sold, I can write the following query:

```graphql
{
  all_<ICECREAMS_SCHEMA_ID> {
    documents {
      fields {
        name
        sweetness
        cafes {
          documents {
            fields {
              name
              address
              opening_year
            }
          }
        }
      }
    }
  }
}
```

We can write nested queries like this because we defined a relation between `icecreams` and `cafes`!!

:::

You can build the schema and commit them to `schema.lock` by running the following command:

```bash
./fishy build
```

This should output a result which looks very similar to this:

```bash
fishy: Create operations and sign entries to update schema

- schema_path: /home/sandreae/Code/mushroom-app-tutorial/schemas/icecream_schema.toml
- lock_path: /home/sandreae/Code/mushroom-app-tutorial/schemas/schema.lock
- private_key_path: /home/sandreae/Code/mushroom-app-tutorial/schemas/secret.txt

The following changes (add, change, remove) will be applied:

cafes_002092aa71ef4d4b52bd082c15b208d4c1aa7134181beb0e5f75542f794717d10617

Name: cafes
Description: "All the cafes where icecream is sold"
╭───┬──────────────┬────────────╮
│ # ┆ Field Name   ┆ Field Type │
╞═══╪══════════════╪════════════╡
│ 1 ┆ opening_year ┆ int        │
├╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┤
│ 2 ┆ address      ┆ str        │
├╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┤
│ 3 ┆ name         ┆ str        │
╰───┴──────────────┴────────────╯

icecreams_0020fe08a0b2f3a7f395df580db551c823e73e9936420ece7c5eae5a27b8d71c8632

Name: icecreams
Description: "Icecream flavours you can get in cafes"
╭───┬────────────┬──────────────────────╮
│ # ┆ Field Name ┆ Field Type           │
╞═══╪════════════╪══════════════════════╡
│ 1 ┆ name       ┆ str                  │
├╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ 2 ┆ cafes      ┆ relation_list(cafes) │
├╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ 3 ┆ sweetness  ┆ str                  │
╰───┴────────────┴──────────────────────╯

Public key used for signing: 8e4e1af5417f64306862b123ab621739f025449e0da23dc0e1049e88cc2569cb

Do you want to commit these changes (8 total)? yes
```

`fishy` will automatically show you the changes which will be committed and ask for your confirmation. Hit `y` to confirm.

So, what just happened? `fishy` looked at the schema definitions in `schema.toml` and then created, signed and encoded entries containing the schema definitions for us. This version of the schema now lives in `schema.lock`. It contains entries which are ready to be published to a node.

The printed output also gives us some useful information, as well as outlining the fields of the schema we just created, it tells us the `schema_id` (eg. `icecreams_0020fe08a0b2f3a7f395df580db551c823e73e9936420ece7c5eae5a27b8d71c8632`) and the public key of the signing author.

## Start node

In a moment we'll be publishing schema to a node, let's start it now so it's ready when we need it.

In a new terminal (making sure you're in the directory where you downloaded `aquadoggo` earlier) run the following command.

```bash
./aquadoggo --log-level=info
```

You should see the following output (as well as some additional info logging omitted for brevity):

```
                       ██████ ███████ ████
                      ████████       ██████
                      ██████            ███
                       █████              ██
                       █     ████      █████
                      █     ██████   █ █████
                     ██      ████   ███ █████
                    █████         ██████    █
                   ███████                ██
                   █████████   █████████████
                   ███████████      █████████
                   █████████████████         ████
              ██████    ███████████              ██
          ██████████        █████                 █
           █████████        ██          ███       ██
             ██████        █            █           ██
                ██       ██             ███████     ██
              ███████████                      ██████
████████     ████████████                   ██████
████   ██████ ██████████            █   ████
  █████████   ████████       ███    ███████
    ████████             ██████    ████████
█████████  ████████████████████████   ███
█████████                      ██

aquadoggo v0.7.0

No config file provided

Configuration

Allow schema IDs: * (any schema id)
Database URL: memory (data is not persisted)
mDNS: enabled
Private key: ephemeral (not persisted)
Relay mode: disabled

Node is ready!

Go to http://0.0.0.0:2020/graphql to use GraphQL playground
Peer id: 12D3KooWEWfho5JPyoWn97V2Zn7JFYcepA4CV1Dsb5tFRWyzoG9g
Node is listening on 0.0.0.0:2022
```

Now you have a local node running on port `2020`. You can check if everything is alright by opening your browser and surfing to [http://localhost:2020/graphql](http://localhost:2020/graphql), do you see the GraphQL playground? Super. Let's play with it soon!

## Deploy a Schema

The operations for our schema currently live in the `schema.lock` file, but actually we want them on our `aquadoggo` node. For this we use another `fishy` command:

```bash
./fishy deploy
```

You should see the following output from `fishy`:

```
fishy: Deploy created schemas on a node

- lock_path: /home/sandreae/Code/mushroom-app-tutorial/schemas/schema.lock
- endpoint: http://localhost:2020/graphql

████████████████████████████████████████████████████████████████████████████████████████████████████████████ 8/8
Successfully deployed 8 commits on node (ignored 0).
```

Interestingly, if you check the logs of your running `aquadoggo` node then you can see this:

```
[2024-01-22T13:08:39Z INFO  aquadoggo::schema::schema_provider] Updating cafes d10617
[2024-01-22T13:08:39Z INFO  aquadoggo::graphql::schema] Changed schema cafes d10617, rebuilding GraphQL API
[2024-01-22T13:08:39Z INFO  aquadoggo::schema::schema_provider] Updating icecreams 1c8632
[2024-01-22T13:08:39Z INFO  aquadoggo::graphql::schema] Changed schema icecreams 1c8632, rebuilding GraphQL API
```

We can see that the node received the published schema and automatically re-built the GraphQL API for us.

You can now visit [http://localhost:2020/graphql](http://localhost:2020/graphql) to see your new schema as well as the dynamically constructed query endpoints!

## Querying `icecreams` documents

We've created a new field now, so we can also directly inspect it via the GraphQL playground of the `aquadoggo` node. For this you can just surf to [http://localhost:2020/graphql](http://localhost:2020/graphql) and run the following query, replacing ICECREAMS_SCHEMA_ID with the schema id output when you ran `deploy` earlier:

```graphql
{
  all_<ICECREAMS_SCHEMA_ID> {
    documents {
      fields {
        name
        sweetness
        cafes {
          documents {
            fields {
              name
              address
              opening_year
            }
          }
        }
      }
    }
  }
}
```

It unfortunately won't return any results as we didn't publish any documents yet, and doing so is outside the scope of this tutorial. However check-out the [Let's build a mushroom app!](/tutorials/mushroom-app) tutorial on publishing data using our TypeScript SDK [`shirokuma`](https://github.com/p2panda/shirokuma) or try out our tiny CLI client [`send-to-node`](https://github.com/p2panda/send-to-node).

```jsx live
function MyPlayground(props) {
  return (
    <div>
      <AddIcecream></AddIcecream>
    </div>
  );
}
```

## Bonus Round: Updating a schema

It is also possible to update an existing schema using `fishy`. To do this, first open the `schema.toml` file in your editor and add a `rating` field to the `icecreams` schema.

```toml
[cafes]
description = "All the cafes where icecream is sold"

[cafes.fields]
name = { type = "str" }
address = { type = "str" }
opening_year = { type = "int" }

[icecreams]
description = "Icecream flavours you can get in cafes"

[icecreams.fields]
name = { type = "str" }
sweetness = { type = "str" }
rating = { type = "float" }
cafes = { type = "relation_list", schema = { name = "cafes" } }
```

To update the schema we run the `build` command:

```bash
./fishy build
```

The output will tell us what changes are to be applied and check if we want to proceed:

```
fishy: Create operations and sign entries to update schema

- schema_path: /home/sandreae/Code/mushroom-app-tutorial/schemas/icecream_schema.toml
- lock_path: /home/sandreae/Code/mushroom-app-tutorial/schemas/schema.lock
- private_key_path: /home/sandreae/Code/mushroom-app-tutorial/schemas/secret.txt

The following changes (add, change, remove) will be applied:

icecreams_00203a83b21416a852089d66f6c9c79c7ec4ddb74234d74b51d4d4535358c4342905
Previously: icecreams_0020fe08a0b2f3a7f395df580db551c823e73e9936420ece7c5eae5a27b8d71c8632

Name: icecreams
Description: "Icecream flavours you can get in cafes"
╭───┬────────────┬──────────────────────╮
│ # ┆ Field Name ┆ Field Type           │
╞═══╪════════════╪══════════════════════╡
│ 1 ┆ name       ┆ str                  │
├╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ 2 ┆ cafes      ┆ relation_list(cafes) │
├╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ 3 ┆ rating     ┆ float                │
├╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ 4 ┆ sweetness  ┆ str                  │
╰───┴────────────┴──────────────────────╯

Public key used for signing: 8e4e1af5417f64306862b123ab621739f025449e0da23dc0e1049e88cc2569cb

Do you want to commit these changes (2 total)? [y/n]
```

(in the actual output the changes are highlighted in nice colours....)

Confirming here will update the `schema.lock` file, then all we need to do is `deploy` again:

```bash
./fishy deploy
```

If you once again check [http://localhost:2020/graphql](http://localhost:2020/graphql) you can see that both our original and updated `icecreams` schema are now in the GraphQL API. These two schema are views onto the same schema document in it's original and updated state.
