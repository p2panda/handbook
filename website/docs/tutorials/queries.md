---
title: 'Tutorial: Advanced Queries'
---

When building an app with p2panda using an `aquadoggo` node (embedded/local/shared) for your the
primary interface you'll use for interacting with application data is the GraphQL API. Once you've
published some data, this is how you get it back to populate your UI. Especially when your node is
embedded or local (meaning it's running on the same system as your app) then you can rely on the
local node for much of your application state, greatly reducing the state logic you need to write
in the frontend. This is greatly thanks to the fact that for the schema supported by your node,
GraphQL query methods are automagically generated, and they come with a powerful API for filtering, ordering,
paginating your collection queries, as well as query trees giving you access to values on related
documents.

:::info Is it really automagical?

Yes! This is worth re-stating, to get the query interface we're going to explore in this tutorial,
you don't need to write any backend code, just use `aquadoggo`, then design and publish the schema
you want to use. Your data will instantly be exposed via a fancy query interface, ready to be used
in your application (it'll also have p2p superpowers, but that's not what we're here to talk about
now).

:::

We're going to look mostly at the generated GraphQL endpoints in this tutorial, and some previous
knowledge of p2panda schema is assumed. If you need, take a look at the ["Create a
schema"](/tutorials/fishy) tutorial to learn about schema, or if it all feels unfamiliar then you
can start from the beginning with ["Set up a local node"](/tutorials/aquadoggo/).

:::warning This isn't a GraphQL tutorial

GraphQL is a common query language, it's possible to work through this tutorial without any
knowledge of it, but a little primer would probably be beneficial. [GraphQL
homepage](https://graphql.org/) has useful learning resources.

:::

## What do I need?

- Browser
- `aquadoggo` node

## What is `aquadoggo`?

`aquadoggo` is a p2panda node implementation and command-line-tool, it's our gateway into the p2panda network. You can learn more about it in the [Set up a local node](/tutorials/aquadoggo) tutorial.

### Install `aquadoggo`

Head over to the [Releases](https://github.com/p2panda/aquadoggo/releases) page and download the pre-compiled binary for your platform. This tutorial was written using `v0.7.1`.

Or on the command line (linux system example):

```bash
curl -L https://github.com/p2panda/aquadoggo/releases/download/v0.7.1/aquadoggo-v0.7.1-x86_64-unknown-linux-gnu.tar.gz | tar -xz
```

## About the tutorial

This tutorial is itself a p2panda client! You will use `shirokuma` (p2panda TypeScript SDK) to create documents on your
local node, and then query them back with a minimal GraphQL client. In a moment you'll be asked to
work in live code editors to update configuration variables and try out different queries. Each of
these code editors is using p2panda under the hood and talking with your local node!

:::info But how does it all work?

In this tutorial we're only focussing on the query API so as much of the inner-workings of a
p2panda application are hidden as possible. There will be a little hand-waving magic. Please
explore our other tutorials to learn about these other aspects of p2panda development.

:::

## Schema

Before we can start playing around with queries, we need some schema. I've prepared some we can
work with for this tutorial, in a moment we'll publish some seed data for them too. We have three
schema which could be used to build a language learning tool, they are:

- `vocabulary`: Japanese-Language Proficiency Test vocabulary from N5 to N1
- `study_sets`: Study sets for group vocabulary into useful categories (eg. "new words", "holiday
  vocab", etc...)
- `study_set_members`: A join between a `vocabulary` document and a `study_sets` document, we use
  this for adding words to a study set and attaching some useful meta data

This `schema.toml` file defines the schema, their field types and relations, and can be used to
build and deploy the schema to a node with the command line tool `fishy`. `fishy` also, very
helpfully, generates a `schema.lock` file which can be included in your project and published to
the node from the client. That's what has been done in this tutorial! So you don't need to do
anything yet.

Through exploring examples of how one would want to work with this data in a real application
we'll learn about the different ways you can tailor your queries over collections of data.

```toml
[vocabulary]
description = "Japanese-Language Proficiency Test vocabulary from N5 to N1"

[vocabulary.fields]
word = { type = "str" }
meaning = { type = "str" }
furigana = { type = "str" }
romaji = { type = "str" }
level = { type = "int" }

[study_sets]
description = "Custom JLPT vocabulary study set"

[study_sets.fields]
title = { type = "str" }
description = { type = "str" }

[study_set_members]
description = "Item in a custom JLPT vocabulary study set"

[study_set_members.fields]
study_set = { type = "relation", schema = { name = "study_sets" } }
member = { type = "relation", schema = { name = "vocabulary" } }
date_added = { type = "int" }
rating = { type = "float" }
last_studied = { type = "int" }
```

## Step 1: Deploy Schema and Seed Data

**ACTION**: Ok, now you need to start your `aquadoggo`. If you downloaded it as described above
and you're in the correct folder you can start it with the following command.

```bash
./aquadoggo --log-level=info
```

:::warning Ephemeral node

A node started with the above command is in "ephemeral" mode, meaning it won't persist any data between
runs. If you stop it at any point, you'll have to repeat the following step before continuing with the
tutorial again.

:::

If this is the first time working through this tutorial then your node won't know about the schema
yet, or contain any seed data. This should be apparent from the UI interface rendered in the live
code editor below. There should be a ✅ showing the node is online, but a ❌ showing no schema or
seed data was detected.

:::info Node status

We're getting this status info by already sending queries to the node and seeing if the expected
schema exist.

:::

```jsx live
function BootstrapNodeApp(props) {
  window.ENDPOINT = 'http://localhost:2020';

  return (
    <App header="🐬 🆗">
      <BootstrapNode></BootstrapNode>
    </App>
  );
}
```

**ACTION**: Click the `Deploy Schema` and then `Publish Seed Data` buttons above. This will deploy the schema and then publish
all the seed data we're gunna use in the rest of this tutorial. If for any reason your node isn't listening on the default http address
(it should be if you ran the above command) then just update `ENDPOINT` in the code above.

:::info GraphQL playground

At this point I have to hold up my hands and admit that some parts of this tutorial tooling are
massive over-kill... That's because `aquadoggo` already gives you a full featured query interface
onto your nodes data with the GraphQL playground which is accessible at
[http://localhost:2020/graphql](http://localhost:2020/graphql). If you head over there now you
will be able to inspect the deployed schema already and run queries against them.

It's _more fun_ to do it inline in fancy little live code editors though!! Right??

:::

## Step 2: Filtering

So now we have our schema and seed data deployed, the node has automatically rebuilt the GraphQL
api in the background and we can start querying data.

Let's begin with a query over all vocabulary documents. The seed data contained 100 words from
level N5 - N1 Japanese vocabulary. We want to retrieve the actual Japanese `word` and it's english
`meaning` from the document's fields, and we want to filter on sub-strings from the `meaning`
field and match against certain levels.

Additionally we want to take the `documentId` from the `meta` fields section. This is the unique
id of a document and we'll be using it later.

**ACTION**: The above can be achieved with the following query, try changing the `MEANING` and `LEVEL` values
and see the returned results change. If your node was offline when you started the tutorial you
may need to refresh the query to see initial query results (top right refresh button in UI below),
editing the query in the code below also triggers a new query to occur.

```jsx live
function QueriesApp(props) {
  const SCHEMA_ID =
    'vocabulary_0020840f74f3a3ca502c80b12ba54e5738c435d27e9c0717214a38173a3e31a75752';

  const MEANING = '';
  const LEVELS = [4, 5];

  const query = `
    query {
      all_${SCHEMA_ID}(
        filter: { 
          meaning: { contains: "${MEANING}" }, 
          level: { in: [${LEVELS}] }
        }
      ) {
        totalCount
        documents {
          fields {
            word
            meaning
          }
          meta {
            documentId
          }
        }
      }
    }
  `;

  return (
    <App header="🔍 🗟">
      <Query query={query}></Query>
    </App>
  );
}
```

All the filters available to you are:

- `in`: Filter by values in set.
- `notIn`: Filter by values not in set.
- `eq`: Filter by equal to.
- `notEq`: Filter by not equal to.
- `gte`: Filter by greater than or equal to.
- `gt`: Filter by greater than.
- `lte`: Filter by less than or equal to.
- `lt`: Filter by less than.
- `contains`: Filter for items which contain given value.
- `notContains`: Filter for items which don't contain given value.

## Step 3: Using relations

In the previous step we searched over a collection of documents following the `vocabulary` schema.
We want to be able to add vocabulary documents to a `schema_sets` document and track our progress
in learning them. There are already some example study sets published to the node, let's add some
vocabulary to them.

If we look at the `study_set_members` schema above, we'll see that there is a field called
`member` which is of type `relation` which points to a vocabulary document. Additionally we can
see the `study_set` field is also a relation pointing to a `study_sets` document. With these two
fields we can join a vocabulary document to a study set document, that's exactly what we want.

The other fields (`data_added`, `last_studied` and `rating`) are all metadata attached to this
particular entry in this particular study set.

In step 2 we already queried all vocabulary, we can use `documentId` from the results to add
vocabulary to a study set below.

**ACTION**: Copy a `documentId` from one of the words returned by your vocabulary query in step 2
and paste it into the "Vocabulary ID" input field below. You also need to select the study set you
want to add it to. Then click the "Add" button. You should see a message pop up saying "Created
study set member with document id: ...". Well done, you created a relation between documents! Copy
the `document id` printed in the message as we'll need this in a moment. You can also add a few
more words to the study sets so our later queries are a little more interesting.

```jsx live
function QueriesApp(props) {
  const STUDY_SETS_SCHEMA_ID =
    'study_sets_002055142f8a42052fe558891fb33b707fa16367ae4ebba876ba900cf4870a352ad6';

  // We use this query to get back 3 study sets and use them in our form element. You don't
  // need to change this, it's just here for demonstration purposes. We'll learn more about
  // this "first" argument in Step 6.
  const query = `
    query {
      all_${STUDY_SETS_SCHEMA_ID}(first: 3) {
        documents {
          fields {
            title
          }
          meta {
            documentId
          }
        }
      }
    }
  `;

  return (
    <App header="💕 🗂️">
      <StudySetForm studySetsQuery={query}></StudySetForm>
    </App>
  );
}
```

We've now created some `study_set_members` documents so let's compose a query for fetching them
back from the node, selecting not only fields from the target document, but also documents it
contains a relation to.

**ACTION**: Paste the document ID which popped up under the form after you clicked "Add" into the
code below, replacing `<DOCUMENT_ID>`. You'll see that the results come back with values included
from the related `study_sets` and `vocabulary` documents.

```jsx live
function QueriesApp(props) {
  const SCHEMA_ID =
    'study_set_members_0020c2500c3088b01a98f4a7cfdab6037371ac64d4b929d4677daf39a3aa0c257612';

  const STUDY_SET_ITEM_DOCUMENT_ID = '<DOCUMENT_ID>';

  const query = `
    query {
      ${SCHEMA_ID}(id: "${STUDY_SET_ITEM_DOCUMENT_ID}") {
        fields {
          date_added
          last_studied
          rating
          member {
            fields {
              word
              meaning
            }
          }
          study_set {
            fields {
              title
            }
          }
        }
      }
    }
  `;

  return (
    <App header="🔍 🗟">
      <Query query={query}></Query>
    </App>
  );
}
```

## Step 4: Ordering

A common approach to learning new vocabulary for any language is to priorities studying words
which you don't know very well, or which you haven't looked at in a while. The query below models
this behavior by requesting to order the resulting collection by `last_studied` timestamp, oldest
first. We additionally filter by `rating` as we want to only look at words where our rating is
low. And we want to look at one word at a time, so we just get the first word.

**ACTION**: Currently the query looks at vocabulary from _all_ study sets, this is likely not the
behavior we want, normally you'd be interested in words from one single study set. Try adding in a
filter on the `study_set` field containing the `documentId`.

```jsx live
function QueriesApp(props) {
  const SCHEMA_ID =
    'study_set_members_0020c2500c3088b01a98f4a7cfdab6037371ac64d4b929d4677daf39a3aa0c257612';

  const RATING = 5;

  const query = `
    query {
      all_${SCHEMA_ID}(
        first: 1
        orderBy: last_studied
        orderDirection: ASC
        filter: { 
          rating: { lte: ${RATING} }
        }
      ) {
        totalCount
        documents {
          fields {
            date_added
            last_studied
            rating
            member {
              fields {
                word
                meaning
              }
            }
            study_set {
              fields {
                title
              }
              meta {
                documentId
              }
            }
          }
        }
      }
    }
  `;

  return (
    <App header="🔍 🗟">
      <Query query={query}></Query>
    </App>
  );
}
```

## Step 5: Pagination

Ok, finally, pagination. When you're querying over larger collections of data, you want to be able
to get back smaller chunks at a time, and incrementally fetch the "next" batch. This is called
pagination, you get one page at a time, which contains a specified number of items. The
`aquadoggo` API we're working with now implements cursor based pagination. Each item in your query
result can be identified by a cursor, and we can choose which cursor a queries results should
start after. This allows us to paginate over large query results from our application.

```jsx live
function QueriesApp(props) {
  const SCHEMA_ID =
    'vocabulary_0020840f74f3a3ca502c80b12ba54e5738c435d27e9c0717214a38173a3e31a75752';

  const queryBuilder = (after) => `
    query {
      all_${SCHEMA_ID}(
        first: 10
        ${after ? `after: "${after}",` : ''} 
      ) {
        totalCount
        hasNextPage
        endCursor
        documents {
          fields {
            word
          }
          meta {
            documentId
          }
        }
      }
    }
  `;

  return (
    <App header="🔍 🗟">
      <PaginatedQuery queryBuilder={queryBuilder} endCursor=""></PaginatedQuery>
    </App>
  );
}
```

## The End

We covered a lot there, well done making it to the end 🎉! From here you should be able to start
designing schema for your application with the resulting query interface in mind. Happy querying!
