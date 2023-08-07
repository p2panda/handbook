---
title: 'Tutorial: Create a schema using `fishy`'
---

In this tutorial we want to register a new schema using the [`fishy`](https://github.com/p2panda/fishy) command line tool and [`aquadoggo`](https://github.com/p2panda/aquadoggo) node.

## What do I need?

- Rust
- Editor
- Terminal
- Browser

:::info Never worked with Rust before?

This tutorial requires you to have a working Rust environment. If you have never worked with Rust before this is no problem! Setting it up is fairly easy and besides using some basic command line commands there is no more Rust knowledge required to make the node run on your computer.

:::

<details><summary>How do I install Rust?</summary>

Make sure you have a working Rust environment installed on your computer before you begin with the tutorial. You can check this by running `rustc --version` in your terminal. This tutorial was written with Rust version `1.63.0` but it will probably also work with other versions.

If you don't have Rust installed yet you can follow the steps on the official Rust website: [How to install Rust](https://www.rust-lang.org/tools/install).

</details>

## What is `fishy`?

`fishy` is a command-line-tool for creating and publishing schema onto the p2panda network. It allows you to define collections of schema in a human readable `toml` file and then encodes the schema in the correct format for publishing directly to a node, sharing via other channels, or embedding in an application.

We'll go through the steps one at a time below, for now just know that `fishy` is your friend when it comes to creating schema for your application.

:::info Low-level view

For a much lower-level look at how schemas (and p2panda data in general) can be published, then take a look at the [send-to-node](/tutorials/send-to-node). In most situations however, you will want to use a tool like `fishy` for publishing schema.

:::

### Install `fishy`

Run the following commands in your terminal if you haven't installed `fishy` yet. It is a Rust program you can compile on your computer:

```bash
# Download source code
git clone https://github.com/p2panda/fishy.git
cd fishy

# Compile binary
cargo run
```

Compiling `fishy` might take a couple of seconds in the beginning, but next time it will start directly.

## Start node

In a moment we'll be publishing schema to a node, let's start it now so it's ready when we need it. You can follow the [Set up a local node](/tutorials/aquadoggo) to learn how to do this in detail, or just run the following steps here:

```bash
# Clone the `aquadoggo` git repository
git clone https://github.com/p2panda/aquadoggo.git

# Move into the folder you've just created
cd aquadoggo

# Compile and start the node with basic logging enabled
RUST_LOG=aquadoggo=info cargo run
```

Now you have a local node running on port `2020`. You can check if everything is alright by opening your browser and surfing to [http://localhost:2020/graphql](http://localhost:2020/graphql), do you see the GraphQL playground? Super. Let's play with it soon!

## Create a Schema

:::info When/why do we create schema?

All `p2panda` applications will have a collection of schema which they require, for example, a blog might need `blog`, `blog_post` and `comment`, these schema describe the shape of the documents the application will handle. `aquadoggo` looks at these schema to build an API which fits your use and to decide what data to look for on the network.

Creating and publishing schema might well be the first step you take when building an application, once you've done this you will have a powerful `GraphQl` interface available for publishing and querying data to/from the network.

:::

Ok, we want to create our own schema. To get the process started, make sure you're in the `fishy` directory and then run the following command:

```bash
cargo run -- init
```

A dialogue will ask you for the name of your first schema. Enter a name, for example cafe and press `enter` (don't worry, you can change this later). You will now find a `schema.toml` and `secret.txt` file in your folder.

The `schema.toml` contains some example schema definitions which we will edit in a moment, the `secret.txt` contains the private key which will be used for signing commits when building the schema.

`schema.toml` is where we define our schema, with any text editor edit the file so it contains the following definition:

```toml
[cafe]
description = "A list of cafes"

[cafe.fields]
name = { type = "str" }
address = { type = "str" }
opening_year = { type = "int" }

[icecream]
description = "Icecream flavours you can get in cafes"

[icecream.fields]
name = { type = "str" }
sweetness = { type = "str" }
cafes = { type = "relation_list", schema = { name = "cafe" } }
```

There's a lot going on here! We're defining two schema, `cafe` and `icecream`, they both have a `description` string and a list of `fields`. The `description` is required and at least one `field` must be defined for each schema.

The list of fields describe key-value pairs comprising of the field name, and it's type. Each key will be the fields name, it can be any string as long as it follows the [naming rules](/specification/data-types/schemas). The type object of each item indicates the fields type. Possible types are:

- `int`, which is an integer number (`i64`).
- `float`, which is a float number (`f64`).
- `bool`, which can be `true` or `false`.
- `str`, which can be any sort of text.

.. and now it gets interesting, there is even more:

- `relation`, which can be a reference to another document.
- `relation_list`, which can be a list of references to many documents!
- `pinned_relation`, which can be a reference to a _document view_. This is a document in a past, historical version. Like an _archived_ version you wanted to keep. So cool.
- `pinned_relation_list`, which is a list of document views! 🤯

If we look at the `cafes` field in our `[icecream.fields]` list, you can see that there is an additional `schema` value in the field type object. This indicates that any documents which are related to in the `cafe` field will be of the type `cafe`, the name used here refers to the schema defined earlier in the file.

:::info Why relations?

One benefit of defining relations between schemas is that the node's query API becomes even more powerful. If I want to check all the cafes where my favorite ice cream flavours are sold, I can write the following query:

```
{
  all_<ICECREAM_SCHEMA_ID> {
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

We can write nested queries like this because we defined a relation between `icecream` and `cafe`!!

:::

You can build the schema and commit them to `schema.lock` by running the following command:

```
cargo run -- build
```

This should output a result which looks very similar to this:

```bash
    Finished dev [unoptimized + debuginfo] target(s) in 0.10s
     Running `target/debug/fishy build`
fishy: Create operations and sign entries to update schema

- schema_path: /path/to/fishy/schema.toml
- lock_path: /path/to/fishy/schema.lock
- private_key_path: /path/to/fishy/secret.txt

The following changes (add, change, remove) will be applied:

cafe_0020446668351eb1a6974bd92238b268abc38a2353fd6b1d2b6ac0458c163ab9fcac

Name: cafe
Description: "A list of cafes"
╭───┬──────────────┬────────────╮
│ # ┆ Field Name   ┆ Field Type │
╞═══╪══════════════╪════════════╡
│ 1 ┆ opening_year ┆ int        │
├╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┤
│ 2 ┆ name         ┆ str        │
├╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┤
│ 3 ┆ address      ┆ str        │
╰───┴──────────────┴────────────╯

icecream_0020103b4ed88d228b2eac178719ad812af907a95b55b5cd5020fb8c0f94a411b452

Name: icecream
Description: "Icecream sorts you can get in cafes"
╭───┬────────────┬─────────────────────╮
│ # ┆ Field Name ┆ Field Type          │
╞═══╪════════════╪═════════════════════╡
│ 1 ┆ cafes      ┆ relation_list(cafe) │
├╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ 2 ┆ name       ┆ str                 │
├╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ 3 ┆ sweetness  ┆ str                 │
╰───┴────────────┴─────────────────────╯

Public key used for signing: 7cb75fcafba0b64e4bdf72926fb13418e5526d80b6e91545000c639b2e7315f5

Do you want to commit these changes (8 total)? yes
Successfully written 8 new commits to schema.lock file

```

The tool will automatically show you the changes which will be committed and ask for your confirmation. Hit `y` to confirm.

So, what just happened? `fishy` looked at the schema definitions in `schema.toml` and then created, signed and encoded entries containing the schema definitions for us. This version of the schema now lives in `schema.lock`. It contains entries which are ready to be published to a node.

The printed output also gives us some useful information, as well as outlining the fields of the schema we just created, it tells us the `schema_id` (eg. `icecream_0020103b4ed88d228b2eac178719ad812af907a95b55b5cd5020fb8c0f94a411b452`) and the public key of the signing author. 

## Deploy a Schema

The entries for our schema currently live in the `schema.lock` file, but actually we want them on our `aquadoggo` node. For this we use another `fishy` command:

```bash
cargo run -- deploy
```

If your node is still running at the default location, then you should see the following output:

```
fishy: Deploy created schemas on a node

- lock_path: /path/to/fishy/schema.lock
- endpoint: http://localhost:2020/graphql
```

You can now visit [http://localhost:2020/graphql](http://localhost:2020/graphql) to see your new schema as well as the dynamically constructed query endpoints!

## Making a query

We've created a new field now, so we can also directly inspect it via the GraphQL playground of the `aquadoggo` node. For this you can just surf to [http://localhost:2020/graphql](http://localhost:2020/graphql) and run the following query, replacing <ICECREAM_SCHEMA_ID> with the schema id output when you ran `deploy` earlier:

```
{
  all_<ICECREAM_SCHEMA_ID> {
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
