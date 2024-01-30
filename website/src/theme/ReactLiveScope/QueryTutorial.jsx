import React, { useEffect, useContext, useState } from 'react';
import toml from 'toml';
import { gql } from 'graphql-request';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';
import vocabulary from '@site/static/jp-words.json';

import { P2pandaContext } from './P2pandaContext';
import { MessageContext } from './MessageContext';
import { publish } from './queries';

const VOCABULARY_SCHEMA_ID =
  'vocabulary_0020a14f78ab4950661db6e5a44849c3770735cb723abc08097d65bbfe0ad8ddcd11';

const SCHEMA_LOCK_FILE = '/schemas/query-tutorial/schema.lock';

export const QueryTutorial = ({ query }) => {
  const { graphQLClient, session } = useContext(P2pandaContext);
  const { setError } = useContext(MessageContext);

  const POLLING_INTERVAL = 1000;

  const [schemaLock, setSchemaLock] = useState();
  const [nodeOnline, setNodeOnline] = useState();
  const [schemaDeployed, setSchemaDeployed] = useState(false);
  const [vocabularyPublished, setVocabularyPublished] = useState(false);
  const [result, setResult] = useState('No results');

  useEffect(() => {
    // fetch schema lock file.
    const fetchSchemaLock = async () => {
      // eslint-disable-next-line no-undef
      const response = await fetch(SCHEMA_LOCK_FILE);
      const data = await response.text();

      const schemaLock = toml.parse(data);

      // set state when the file received
      setSchemaLock(schemaLock);
    };

    fetchSchemaLock();
  }, []);

  useEffect(() => {
    const checkNode = async () => {
      const query = gql`
        query checkNode {
          all_schema_definition_v1 {
            totalCount
          }
        }
      `;
      let responseOk = true;
      try {
        await graphQLClient.request(query);
      } catch {
        responseOk = false;
      } finally {
        if (!responseOk) {
          setError('Node offline');
        } else {
          setError(null);
        }
        setNodeOnline(responseOk);
      }
    };

    // eslint-disable-next-line no-undef
    const intervalId = setInterval(() => {
      checkNode();
    }, POLLING_INTERVAL);

    // eslint-disable-next-line no-undef
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [graphQLClient, setError]);

  useEffect(() => {
    if (!nodeOnline) {
      return;
    }

    const query = gql`
      query checkSchema {
        all_${VOCABULARY_SCHEMA_ID} {
          documents {
            fields {
              word
            }
          }
        }
      }
    `;

    const checkSchema = async () => {
      let schemaExist = true;
      try {
        await graphQLClient.request(query);
      } catch {
        schemaExist = false;
      } finally {
        setSchemaDeployed(schemaExist);
      }
    };

    checkSchema();
  }, [nodeOnline, graphQLClient]);

  useEffect(() => {
    if (!schemaDeployed || !nodeOnline) {
      return;
    }

    const query = gql`
      query checkSchema {
        all_${VOCABULARY_SCHEMA_ID} {
          totalCount
        }
      }
    `;

    const publishVocabulary = async () => {
      const result = await graphQLClient.request(query);
      if (result[`all_${VOCABULARY_SCHEMA_ID}`]['totalCount'] != 0) {
        setVocabularyPublished(true);
        return;
      }

      let vocabularyPublished = true;
      for (const item of vocabulary) {
        try {
          await session.create(item, {
            schemaId: VOCABULARY_SCHEMA_ID,
          });
        } catch {
          vocabularyPublished = false;
        } finally {
          setVocabularyPublished(vocabularyPublished);
        }
      }
    };

    publishVocabulary();
  }, [schemaDeployed, nodeOnline, session, graphQLClient]);

  useEffect(() => {
    if (!schemaDeployed || !nodeOnline) {
      return;
    }

    makeQuery();
  });

  const makeQuery = async () => {
    let success = true;
    let result = null;
    try {
      result = await graphQLClient.request(gql`
        query {${query}}
      `);
    } catch (err) {
      setResult(err);
      success = false;
    }

    if (success) {
      setResult(result[`all_${VOCABULARY_SCHEMA_ID}`]);
    }
  };

  const migrateSchema = async () => {
    let migrationOccured = false;
    for (const { entry, operation } of Array.from(schemaLock.commits)) {
      try {
        await publish(graphQLClient, entry, operation);
      } catch {
        break;
      }
      migrationOccured = true;
    }

    // set state when the data received
    setSchemaDeployed(migrationOccured);
  };

  const schemaDeployDisabed = !schemaLock || !nodeOnline;
  const queryDisabed = !schemaLock || !nodeOnline || !vocabularyPublished;

  return (
    <div id="query-tutorial">
      <div id="query-tutorial-results">
        <button disabled={queryDisabed} onClick={makeQuery}>
          &#8635;
        </button>
        <JsonView src={result} theme="default" />
      </div>
      <div>
        schema deployed:
        {schemaDeployed ? <span> &#9989;</span> : <span> &#10062;</span>}
      </div>
      <div>
        seed data published:{' '}
        {vocabularyPublished ? <span> &#9989;</span> : <span> &#10062;</span>}
      </div>
      {!schemaDeployed ? (
        <button disabled={schemaDeployDisabed} onClick={migrateSchema}>
          Deploy Schema
        </button>
      ) : null}
    </div>
  );
};
