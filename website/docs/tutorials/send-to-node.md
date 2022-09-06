---
title: "Tutorial: Create a schema"
---

In this tutorial we want to register a new schema on a p2panda node and create our first document with it! We will use the [`send-to-node`](https://github.com/p2panda/send-to-node) command line tool and [`aquadoggo`](https://github.com/p2panda/aquadoggo) node for this.

## What do I need?

* Rust
* Editor
* Terminal
* Browser

<details><summary>How do I install Rust?</summary>

Make sure you have a working Rust environment installed on your computer before you begin with the tutorial. You can check this by running `rustc --version` in your terminal. This tutorial was written with Rust version `1.63.0` but it will probably also work with other versions.

If you don't have Rust installed yet you can follow the steps on the official Rust website: [How to install Rust](https://www.rust-lang.org/tools/install).

:::info Never worked with Rust before?

This tutorial requires you to have a working Rust environment. If you have never worked with Rust before this is no problem! Setting it up is fairly easy and besides using some basic command line commands there is no more Rust knowledge required to make `aquadoggo` and `send-to-node` run on your computer.

:::

</details>

## What is `send-to-node`?

`send-to-node` is the most minimal program to send data to an p2panda node. It takes the data you want to send, signs it with a private key and sends it to the node via GraphQL. It is great for doing very _basic_ things with p2panda, especially if you want to learn how everything works!

:::tip More tools

In the future you will probably not do _everything_ with `send-to-node` as it is may be even too minimal and therefore tedious to do more involved tasks, like creating complex schemas. But for learning, testing and understanding it is really great.

:::

### How does it work?

Let's have a quick look at the [source code of `send-to-node`](https://github.com/p2panda/send-to-node/blob/main/src/main.rs). You will notice that it is a fairly small program where most of the code is about parsing user input and preparing everything we need to make GraphQL queries.

Let's look at the interesting bits! The program ..

1. Checks if a file with a private key inside exists (encoded as a hexadecimal string). The default path is `key.txt`. If it exists, we derive the key pair from it, if it doesn't, we generate a new key pair and store it under that path.
2. Reads a JSON-formatted string from _stdin_ which gets deserialized into a p2panda operation. Operations are the actual data we send around in the network.
3. Makes a `nextArgs` GraphQL query to retreive the latest information from the node we need to create our next entry. You can [read more about entries](/learn/entries) in our learn section.
4. Takes the required informations (like `seqNum`, `logId`, `backlink` and `skiplink`) to encode the operation and entry
5. Signs the entry with the given key pair
6. Sends the encoded and signed data to the node using the `publish` GraphQL mutation!

:::tip Re-Write it in JavaScript!

A fun exercise could be to try implement `send-to-node` in JavaScript with the [`p2panda-js`](https://www.npmjs.com/package/p2panda-js) package.

:::

:::note Why JSON?

p2panda does not use JSON internally, even though `send-to-node` works with `.json` files. It is just the choosen format for this program to create operations. Internally all operations are actually encoded as [CBOR](http://localhost:3000/handbook/specification/data-types/operations#encoding-format).

:::

### Install `send-to-node`

Run the following commands in your terminal if you haven't installed `send-to-node` yet. It is a Rust program you can compile on your computer:

```bash
# Clone the `send-to-node` git repository
git clone https://github.com/p2panda/send-to-node.git

# Move into the folder you've just created
cd send-to-node

# Compile and run to test it
cargo run -- --help
```

Compiling `send-to-node` might take a couple of seconds in the beginning, but next time it will start directly.

## Start node

We want to send data to a node, but for this we need a node first! You can follow the [Set up a local node](/tutorials/aquadoggo) to learn how to do this in detail, or just run the following steps here:

```bash
# Clone the `aquadoggo` git repository
git clone https://github.com/p2panda/aquadoggo.git

# Move into the folder you've just created
cd aquadoggo

# Compile and start the node with basic logging enabled
RUST_LOG=aquadoggo=info cargo run
```

Now you have a local node running on port `2020`. You can check if everything is alright by opening your browser and surfing to [http://localhost:2020/graphql](http://localhost:2020/graphql), do you see the GraphQL playground? Super. Let's play with it soon!

## Create a schema

We want to register a new schema on the node now, this means that the node we've just started will learn about a new data type which can then be used inside the p2panda network. This is the starting point for building an application!

But what application do we want to build? Let's try a chat where we can send messages! Every message should contain a **plain text string** and a **timestamp** indicating when it was sent.

:::tip Time is funny

Timestamps in p2p applications are interesting. Check out the [Entry](/learn/entries) section to learn more about it.

:::

To do this we need to send three operations: 

1. One operation creating the `message` field
2. One operation creating the `timestamp` field
3. One operation to finally create the `chat` schema which contains both of these fields

:::note Schemas are only created once

Creating a schema only happens once! Afterwards you and others can just use it, they do not need to "register" it again or anything, but other nodes can simply just replicate the data from your node to also receive the schema you've created.

:::

### Create `message` field

As already mentioned, `send-to-node` requires us to format the data we want to send in JSON. In a text editor of your choice we can write our first operation into a file named `001-message-field.json`:

:::note Naming

The filename does not matter to `send-to-node`, but it can be helpful to give it a meaningful name for you plus some sort of numbering system to indicate that these operations should be created in that order.

:::

Insert the following content into the `001-message-field.json` file:

```json
[1, 0, "schema_field_definition_v1", { "name": "message", "type": "str" }]
```

#### What is an operation?

What does all of this mean? We look at an array with four fields inside. Let's go through all of them from left to right.

**Version**

The first field with the value `1` indicates the version we're using to write this operation. For now it will probably stay `1` for a longer time until there are any important updates to the p2panda [specification](/specification).

**Action**

The second field with the value `0` indicates the _action_ of this operation. `0` stands for CREATE, `1` would stand for UPDATE and `2` for DELETE. You can read more about operations in the [learn](/learn/operations) section or the [specification](/specification/data-types/operations) but for now it is enough to understand that with these three actions we can create, update or delete _documents_.

In this particular case we're creating a new _schema field_ document, the one containing the `message` field! This is why the action is set to `0`.

:::note Why these numbers?

We could have also written `create`, `update`, `delete` instead of these weird numbers, but then we realised that at one point you will send hundreds of operations, so it becomes quite redundant to mention this so explicitly. We decided to encode actions as numbers, simply to save some bytes!

:::

**Schema Id**

The third field with the value `schema_field_definition_v1` is the _schema id_. This identifier indicates which schema we're following with this operation. Together with the _action_ we can say now: "I'm creating a new schema field document!". We know this because the _action_ is a CREATE action and the schema id says that we're interested in a schema field.

You will see later that there are other schema ids as well, and by creating a `chat` schema we will even create our own! Other developers will later use your created schema id to indicate that they want to create documents with it!

:::note System vs. application schemas

`schema_field_definition_v1` is a _system_ schema which means that it is already registered by default on every node which follows the [p2panda specification](/specification/data-types/schemas). Our `chat` schema will be an _application_ schema, it is not used for special p2panda cases like creating a new schema but for building a chat application!

:::

**Fields**

The last and fourth field is probably the most interesting one, it contains the actual data we want to send: The operation _fields_ with all our _values_! You see, it is a simple key-value map where we're setting two fields:

* `name` is set to `message`
* `type` is set to `str`

First of all, where does `name` and `type` come from? It comes from the defined _schema id_ `schema_field_definition_v1` which is a system schema _requiring_ us to fill out these fields by specification: Every schema field _needs_ a `name` and a `type`.

:::tip Try to break it!

You can try to send a `schema_field_definition_v1` with missing or wrong fields inside, you will see, it will not be accepted by the `aquadoggo` node.

:::

The `name` field indicates what the name of our future schema field should be and we decided it should be `message`. You can put in anything else here if you want to come up with a different schema, just make sure it follows the [naming rules](/specification/data-types/schemas).

The `type` field indicates what type this `message` field should have. We can pick a couple of options here, but `str` is probably what we want. Otherwise there is:

- `int`, which is an integer number (`i64`), like `54` or `-21` ranging from `-9223372036854775808` to `9223372036854775807`, hui!
- `float`, which is a float number (`f64`), like `23.98` ranging from `-1.7976931348623157E+308f64` to `1.7976931348623157E+308f64`, oha!
- `bool`, which can be `true` or `false`
- `str`, which can be any sort of text, for example a chat message!

.. and now it gets interesting, there is even more:

- `relation`, which can be a reference to another document! Woah.
- `relation_list`, which can be a list of references to many documents!
- `pinned_relation`, which can be a reference to a _document view_. This is a document in a past, historical version. Like an _archived_ version you wanted to keep. So cool.
- `pinned_relation_list`, which is a list of document views! 🤯

:::tip Why do we need relations?

Relations are really handy if you want to connect one document to another, even across different schemas. For example you might want to connect every `chat` message to a user `profile` document, then you would first create a new `profile` schema, and indicate in `chat` that there is now a `relation` to it!

:::

We will not use any relations in this tutorial, but if you're curious you can read more about them in the [learn section](/learn/operations).

#### Send to node

Okay, we looked now at what this whole operation is about! Let's send it finally to the node! Make sure it is all up and running.

We send the operation with `send-to-node` by simply _piping_ it into the `stdin` input of the program, like that:

```bash
cat 001-message-field.json | cargo run
```

As already mentioned above, this will now encode the operation into the right format, wrap it into a [Bamboo entry](/learn/entries), append it to the Bamboo log, sign it with your new key pair and send it to the node.

If everything went fine we should see something similar like this now:

```
▶ Public Key: "b129339f1264614a7c6b62cc20f9bfa21a0763a5198db82d85ae9c8543578f10"
▶ Operation Id: "0020f7be169cacc814b21526e018ad3cb423c93b215b5bd4901146b6bed1b1c4560e"

Woho! ヽ(￣(ｴ)￣)ﾉ
```

First we see the _Public Key_ of our key pair. It will be different for you since these keys are securely and randomly generated. Your key will be unique! You can probably find the private part in the file now which has been generated for you by `send-to-node` when running it for the first time, have a look at it via `less ./key.txt`.

The second _Operation Id_ is the identifier of the operation we've just created! In this case it was even a CREATE operation which means that we've just created a new document and that means that the document id will be the same. So now we could say: "I've created a `message` field and its document id is `0020f7be169...`". This hash of course will also be different from mine since it is all a combination of your key pair, created entry and operation and this is also _unique_.

This also means that _every_ operation, document and schema you create _is_ unique! Even when you would create the field again, it will have a different identifier.

Let's remember this operation id for now, we need it later. Ah, of course its too long to remember, maybe you paste it quickly into a text document or something?

:::info Sensitive data

Private keys are sensitive information which should never leave your computer, usually you want to keep them somewhere in a well protected place. For this tutorial it may not be that important though, you could delete that file again and generate a new one if you want. If you keep the file `send-to-node` will re-use it next time which is cool. 

By the way, in p2panda it is important to have [multiple keys](/specification/data-types/key-pairs) for different applications, purposes or devices.

:::

#### Query the field

We've created a new field now, so we can also directly inspect it via the GraphQL playground of the `aquadoggo` node. For this you can just surf to [http://localhost:2020/graphql](http://localhost:2020/graphql) and run the following query in the left area:

```
{
  all_schema_field_definition_v1 {
    meta {
      documentId
    }
    fields {
      name
      type
    }
  }
}
```

Press the _Play_ button in the middle and you will see the node's response appear in the right area. Here is the field document we've just created! And if you compare your _Operation Id_ with the `documentId` you will see that they are the same.

### Create `timestamp` field

We looked into many details now when we've created that `message` field. This time we're doing something very similar, so we don't need to talk about anything new.

Let's create a second file, named `002-timestamp-field.json` with the following content:

```json
[1, 0, "schema_field_definition_v1", { "name": "timestamp", "type": "int" }]
```

It looks almost the same, just has a different `name` and `type`. This time we choose an integer type because we want our timestamp to be a regular [Unix time number](https://en.wikipedia.org/wiki/Unix_time).

We create a new field document by sending this operation as well to the node:

```bash
cat 002-timestamp-field.json | cargo run
```

You will get a similar output again when everything went fine. Keep a note of the _Operation Id_ for this field, we need it in the next step.

Also, if you are curious, you can run the GraphQL query again and find out that there are two field documents now on your node.

### Create `chat` schema

Finally we want to create the actual schema! Here we define the `name` of the schema, give it a small `description` and refer to the `fields` we've created before.

:::note Tedious work?

We need to send three operations to create a schema, this is so much work! But remember, we're doing it with a very minimal `send-to-node` tool right now for the purpose of learning how it works _under the hood_ or _behind the scenes_ and so on.

Later there will be tools like `fishyfish` to create schemas in one step, they handle all of these requests automatically for you. Or you can write your own tool or scripts of course using the p2panda [libraries](/libraries).

:::

We do this again by creating a new document named `003-chat-schema.json` with the following operation inside:

```json
[
  1,
  0,
  "schema_definition_v1",
  {
    "description": "My first p2panda chat schema",
    "fields": [
      ["<insert your `message` document id here>"],
      ["<insert your `timestamp` document id here>"]
    ],
    "name": "chat"
  }
]
```

This looks slightly different from the previous operations we were sending, but a couple of things are the same: We're again sending a CREATE operation, but this time using the `schema_definition_v1` schema id which requires us to fill out the three fields: `description`, `fields` and `name`.

:::note Ordering of the fields

You would probably like to start with `name` as the first field, right? The ordering of the field names _needs_ to be alphabetical though. You can try a different order, but the `aquadoggo` will reject it with a friendly error message telling you what order it expected the fields to be.

All of this is required to ensure an [canonical encoding](/specification/encoding-data) of operations.

:::

Did you keep track of the document id's of your `message` and `timestamp` documents somewhere? Insert them in the placeholders in the .json file. If you don't have them anymore, you can also check the GraphQL playground using the same query we already tried before. It will give you the `documentId` of the two fields.

My `fields` looks like this now, yours should be similar, just with different hashes:

```json
"fields": [
  ["0020f7be169cacc814b21526e018ad3cb423c93b215b5bd4901146b6bed1b1c4560e"],
  ["002074ffa5d2e9e5c721483cad91cdfd8ebbd3ac1e716831ff5934becc83f5e13329"]
]
```

:::tip Pinned relations and schema migrations

The `fields` look funny with their nested array structure, did you notice that? You're using a pinned relation here actually, which means that we're pointing our `chat` schema at _exactly_ these versions of our fields.

Since a document version can consist of multiple, concurrent operations we have a multi-dimensional array here, to give us the option to address more than one operation expressing our _view_. Concurrent operations can happen if multiple users update the document at the same time! We usually don't have to worry much about it though, as all of this is handled by p2panda, but it might be interesting to know for you what is going on here.

Currently there is only one view id since you've just created the fields, but imagine you will update your fields in the future. That might break something for some users as suddenly the name of the field changed etc. To prevent this, we're pinning everything to a historical state, so there are no surprises.

Of course the users can still follow your update, but then they have to use the new schema id. Isn't that cool? We get **schema migrations** for free.

:::

We send this operation again to our node via:

```bash
cat 003-chat-schema.json | cargo run
```

And now it gets exciting! Let's open the playground and have a look into the _Docs_ tab on the right hand side. There it is! Our new `chat` schema!

:::tip Huh, I don't see anything?

Oh, maybe you should refresh the page then (the playground's auto-refresh can be turned on / off). If it still doesn't work you might have used the wrong hashes? Double check it! I hope you didn't use the ones from my example, because your hashes will surely be different!

:::

We can even query that schema now, you just need to insert your schema id before (you'll find it in the _Docs_ tab, or just use the autocomplete feature of the Playground):

```
{
  all_<insert your schema id here> {
    fields {
      message
      timestamp
    }
  }
}
```

It will return an empty response. Of course, we haven't created a chat message yet, let's do it!

:::tip Curious polar bear

Did you have a peek at the logs of your `aquadoggo`?

:::

## Create a new chat message!

We create our first document using the application schema we've just created. For this we need it's _Schema Id_, we should have already checked it in the steps before, if not, please have a look in the Playground, you'll find it in the _Docs_ tab on the right hand side.

Use this schema id to write your first CREATE operation, again we need a new file `004-create-message.json` for this with the following content:

```json
[
  1,
  0,
  "<insert your schema id here>",
  {
    "message": "Hello, Panda!",
    "timestamp": 1662459998
  }
]
```

Just replace the schema id with your own and send the operation via:

```bash
cat 004-create-message.json | cargo run
```

Woho! Have a look in the GraphQL playground, you can query your chat message there now.

## Update chat message

We are building a special chat program where we can also edit our messages afterwards. Let's send an UPDATE operation to change the chat message document we've created in the step before.

:::tip Show changes

If we want to build a _really cool_ chat application we could even show the history of edits with pinned relations.

:::

For this we're creating another file named `005-update-message.json` with the following content:

```json
[
  1,
  1,
  "<insert your schema id here>",
  ["<insert your view id here>"],
  {
    "message": "Good night, Panda!"
  }
]
```

This looks again a little bit different now. UPDATE operations have the `action` field set to `1` as you can see and require us to specify a `previous` field. It indicates where we are planning to apply the update.

:::note Operation graphs

The `previous` field is really powerful. Imagine many users applying updates to a document at the same time, with the `previous` field we are able to understand what all of these users meant when they wanted to apply their changes. Not every user might have seen the same as the others, for example one user might have been offline and worked on a slightly _outdated_ version of the document, another one was writing right after another user and did not take that change into account yet and so on.

With the help of the `previous` field we can build a whole _Operation Graph_ of all changes which have been applied to a document and try to reconstruct one document version of it, even though the changes might have been made concurrently.

:::

Another thing to note here is that we do not have to mention _all_ fields of our `chat` schema, but only the ones we want to update, in this case it is the `message` field.

We're already having the schema id and we can insert it into `005-update-message.json` but where do we get that _view id_ from? It is basically the last known version of that document we want to apply the changes on, we also call this a [_Document View Id_](/specification/data-types/document-views).

Again, the GraphQL playground can help us here. We can simply just query all chat messages and ask for their regarding `viewId` with the following query:

```
{
  all_<insert your schema id here> {
    meta {
      documentId
      viewId
    }
    fields {
      message
      timestamp
    }
  }
}
```

You might notice that the `viewId` is actually currently the same as the `documentId`, this is because there is _only_ one version of this document right now. As soon as we apply some updates you will notice that the `documentId` will stay the same, but the `viewId` will evolve to something else.

:::tip Latest document vs. document view

This is exactly the difference between a _document id_ and a _view id_: The document id will always give you the _latest known_ version of a document, the data might change over time as soon as there are more updates coming. The _view id_ will give you a particular version which will never change ever. It is _immutable_.

What is the _latest_ is up to the node, it might _think_ it knows the latest version, but actually it has not synced up yet with other nodes to really see the latest changes. But that's just how it is in a p2p network. Thanks to p2panda operations and [CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) we don't need to worry about it too much.

:::

We have all informations now to finally send this update:

```bash
cat 005-update-message.json | cargo run
```

Go back to the playground and re-play your query, you should see the latest version now and maybe even see that the `viewId` changed!

## Delete chat message

Last but not least we want to delete our chat message, just to also learn how to use DELETE operations.

This is our last JSON file named `006-delete-message.json`:

```json
[
  1,
  2,
  "<insert your schema id here>",
  ["<insert your last view id here>"]
]
```

Woah, no _fields_? Yes, we do not need them when we delete a document. Also you may have noticed that the _action_ field is now set to `2` to indicate that this is a DELETE operation.

Similar to UPDATE operations we also need to set the `previous` field again. We need to tell the `aquadoggo` where we're applying that deletion. Again, we can get that information from the GraphQL playground, run the query again and retrieve the `viewId` from there, it is the _latest known state_ from our node's perspective.

After running the `send-to-node` program via ..

```bash
cat 006-delete-message.json | cargo run
```

.. we should now get an empty response again in the GraphQL playground. There are no chat messages anymore!

:::tip Comparison with databases

Think about it from the perspective of a "traditional" database. You probably need to specify the ID of the row or item you want to delete in the database.

:::

## Done!

Yay! Now you know how to create a schema and even documents with the `send-to-node` tool. You could also write your own program which sends and signs the operations using the p2panda [libraries](/libraries). Querying documents and publishing operations via GraphQL is basically everything a p2panda client is doing. In this tutorial we did it _manually_ but a client of course would do it all for us in the background.

Check out the [next tutorial](/tutorials/mushroom-app) on how to build a client in React if you're curious about how to actually do this.
