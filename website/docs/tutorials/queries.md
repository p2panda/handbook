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

```jsx live
function BootstrapNodeApp(props) {
  // window.ENDPOINT = 'http://wolke.liebechaos.org:2020';
  window.ENDPOINT = 'http://localhost:2020';

  return (
    <App header="🐬 🆗" endpoint={window.ENDPOINT}>
      <QueryTutorialNodeBootstrap></QueryTutorialNodeBootstrap>
    </App>
  );
}
```

```jsx live
function QueriesApp(props) {
  const SCHEMA_ID =
    'vocabulary_0020840f74f3a3ca502c80b12ba54e5738c435d27e9c0717214a38173a3e31a75752';

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

  return (
    <App>
      <QueryTutorial query={query} endpoint={window.ENDPOINT}></QueryTutorial>
    </App>
  );
}
```

```jsx live
function QueriesApp(props) {
  const STUDY_SETS_SCHEMA_ID =
    'study_sets_002055142f8a42052fe558891fb33b707fa16367ae4ebba876ba900cf4870a352ad6';

  const VOCAB_SCHEMA_ID =
    'vocabulary_0020840f74f3a3ca502c80b12ba54e5738c435d27e9c0717214a38173a3e31a75752';

  const studySetsQuery = `
    query {
      all_${STUDY_SETS_SCHEMA_ID} {
        documents {
          fields {
            title
            description
          }
          meta {
            documentId
            viewId
          }
        }
      }
    }
  `;

  const vocabularyQuery = `
    query {
      all_${VOCAB_SCHEMA_ID} {
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
    <App header="🐬 🆗" endpoint={window.ENDPOINT}>
      <StudySetForm
        studySetsQuery={studySetsQuery}
        vocabularyQuery={vocabularyQuery}
      ></StudySetForm>
    </App>
  );
}
```
