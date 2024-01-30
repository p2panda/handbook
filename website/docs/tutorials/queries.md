---
title: 'Tutorial: Advanced Queries'
---

```toml
[vocabulary]
description = "Japanese-Language Proficiency Test vocabulary from N5 to N1"

[vocabulary.fields]
word = { type = "str" }
meaning = { type = "str" }
furigana = { type = "str" }
romaji = { type = "str" }
level = { type = "int" }

[study_set]
description = "Custom JLPT vocabulary study set"

[study_set.fields]
title = { type = "str" }
description = { type = "str" }
vocabulary = { type = "relation_list", schema = { name = "study_set_items" } }

[study_set_items]
description = "Item in a custom JLPT vocabulary study set"

[study_set_items.fields]
vocabulary = { type = "relation", schema = { name = "vocabulary" } }
date_added = { type = "int" }
rating = { type = "float" }
last_studied = { type = "int" }
```

```jsx live
function BootstrapNodeApp(props) {
  // window.ENDPOINT = 'http://wolke.liebechaos.org:2020';
  window.ENDPOINT = 'http://localhost:2020';
  const SCHEMA_ID =
    'vocabulary_0020a14f78ab4950661db6e5a44849c3770735cb723abc08097d65bbfe0ad8ddcd11';

  return (
    <App header="🐬 🆗" endpoint={window.ENDPOINT}>
      <BootstrapNode
        schemaLockUrl="/schemas/query-tutorial/schema.lock"
        schemaId={SCHEMA_ID}
      ></BootstrapNode>
    </App>
  );
}
```

```jsx live
function QueriesApp(props) {
  const SCHEMA_ID =
    'vocabulary_0020a14f78ab4950661db6e5a44849c3770735cb723abc08097d65bbfe0ad8ddcd11';

  const query = `
    all_${SCHEMA_ID}(filter: { word: { contains: "狭" }}) {
      totalCount
      documents {
        fields {
          word
          meaning
        }
      }
    }
  `;

  return <QueryTutorial query={query}></QueryTutorial>;
}
```
