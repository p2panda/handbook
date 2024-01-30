import React, { useEffect, useContext, useState } from 'react';
import toml from 'toml';
import { gql } from 'graphql-request';
import 'react18-json-view/src/style.css';
import vocabulary from '@site/static/jp-words.json';

import { P2pandaContext } from './P2pandaContext';
import { MessageContext } from './MessageContext';
import { NodeStatusContext } from './NodeStatusContext';
import { publish } from './queries';

export const BootstrapNode = ({ schemaLockUrl, schemaId }) => {
  const { graphQLClient, session } = useContext(P2pandaContext);
  const { nodeOnline } = useContext(NodeStatusContext);
  const { setError } = useContext(MessageContext);

  const [schemaDeployed, setSchemaDeployed] = useState(false);
  const [vocabularyPublished, setVocabularyPublished] = useState(false);

  useEffect(() => {
    if (!nodeOnline) {
      return;
    }

    const query = gql`
      query checkSchema {
        all_${schemaId} {
          totalCount
        }
      }
    `;

    const checkSchema = async () => {
      try {
        await graphQLClient.request(query);
        setSchemaDeployed(true);
      } catch {
        setSchemaDeployed(false);
      }
    };

    checkSchema();
  }, [nodeOnline, graphQLClient, schemaId]);

  useEffect(() => {
    if (!schemaDeployed || !nodeOnline) {
      return;
    }

    const query = gql`
      query checkSchema {
        all_${schemaId} {
          totalCount
        }
      }
    `;

    const publishVocabulary = async () => {
      const result = await graphQLClient.request(query);
      if (result[`all_${schemaId}`]['totalCount'] != 0) {
        setVocabularyPublished(true);
        return;
      }

      let vocabularyPublished = true;
      for (const item of vocabulary) {
        try {
          await session.create(item, {
            schemaId: schemaId,
          });
        } catch {
          vocabularyPublished = false;
        }
      }
      setVocabularyPublished(vocabularyPublished);
    };

    publishVocabulary();
  }, [schemaDeployed, nodeOnline, session, graphQLClient, schemaId]);

  const migrateSchema = async () => {
    try {
      // eslint-disable-next-line no-undef
      const response = await fetch(schemaLockUrl);
      const data = await response.text();
      const schemaLock = toml.parse(data);
      for (const { entry, operation } of Array.from(schemaLock.commits)) {
        await publish(graphQLClient, entry, operation);
      }
      setSchemaDeployed(true);
    } catch (err) {
      setError(`${err}`);
      setSchemaDeployed(false);
    }
  };

  const schemaDeployDisabed = !nodeOnline;

  return (
    <div id="bootstrap-node">
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
