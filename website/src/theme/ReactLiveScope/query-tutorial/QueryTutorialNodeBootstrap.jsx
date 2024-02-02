import React, { useEffect, useContext, useState } from 'react';
import toml from 'toml';
import { gql } from 'graphql-request';
import 'react18-json-view/src/style.css';

import { P2pandaContext } from '../P2pandaContext';
import { MessageContext } from '../MessageContext';
import { NodeStatusContext } from '../NodeStatusContext';
import { VOCAB_SCHEMA_ID, STUDY_SETS_SCHEMA_ID, SCHEMA_LOCK } from '../consts';

const POLLING_INTERVAL = 1000;

export const QueryTutorialNodeBootstrap = () => {
  const { session, graphQLClient } = useContext(P2pandaContext);
  const { nodeOnline } = useContext(NodeStatusContext);
  const { setError } = useContext(MessageContext);

  const [schemaReady, setSchemaReady] = useState(false);
  const [schemaMigrated, setSchemaMigrated] = useState(false);
  const [seedDataPublished, setSeedDataPublished] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!nodeOnline) {
      setSeedDataPublished(false);
      setSchemaReady(false);
    }
  }, [nodeOnline]);

  useEffect(() => {
    const checkSchema = async () => {
      try {
        let seedDataFound = false;
        for (const schemaId of [STUDY_SETS_SCHEMA_ID, VOCAB_SCHEMA_ID]) {
          const result = await graphQLClient.request(gql`
            query {
              all_${schemaId} {
                totalCount
              }
            }
          `);
          if (result[`all_${schemaId}`]['totalCount'] > 0) {
            seedDataFound = true;
          }
        }
        setSchemaReady(true);
        setSeedDataPublished(seedDataFound);
      } catch {
        setSchemaReady(false);
        setSeedDataPublished(false);
      }
    };

    if (!schemaReady) {
      // eslint-disable-next-line no-undef
      const intervalId = setInterval(() => {
        checkSchema();
      }, POLLING_INTERVAL);

      // eslint-disable-next-line no-undef
      return () => clearInterval(intervalId); // Cleanup on component unmount
    }
  }, [graphQLClient, nodeOnline, schemaReady, setError]);

  const migrateSchema = async () => {
    try {
      setBusy(true);
      // eslint-disable-next-line no-undef
      const response = await fetch(SCHEMA_LOCK);
      const data = await response.text();
      const schemaLock = toml.parse(data);
      for (const { entry, operation } of Array.from(schemaLock.commits)) {
        await session.publish(entry, operation);
      }
      setSchemaMigrated(true);
    } catch (err) {
      setError(`${err}`);
      setSchemaMigrated(false);
    } finally {
      setBusy(false);
    }
  };

  const seedData = async () => {
    try {
      setBusy(true);
      for (const schemaId of [STUDY_SETS_SCHEMA_ID, VOCAB_SCHEMA_ID]) {
        // eslint-disable-next-line no-undef
        const response = await fetch(`/seed-data/${schemaId}.json`);
        const seedData = await response.json();
        for (const fields of seedData) {
          await session.create(fields, {
            schemaId,
          });
        }
      }

      setSeedDataPublished(true);
    } catch (err) {
      setSeedDataPublished(false);
      setError(`${err}`);
    } finally {
      setBusy(false);
    }
  };

  const schemaDisabled = !nodeOnline || schemaMigrated || schemaReady || busy;
  const seedDisabled = !nodeOnline || !schemaReady || seedDataPublished || busy;

  return (
    <div id="bootstrap-node">
      <div>
        node online:
        {nodeOnline ? <span> &#9989;</span> : <span> &#10062;</span>}
      </div>
      <div>
        schema deployed:
        {schemaReady ? <span> &#9989;</span> : <span> &#10062;</span>}
      </div>
      <div>
        seed data published:{' '}
        {seedDataPublished ? <span> &#9989;</span> : <span> &#10062;</span>}
      </div>
      <button disabled={schemaDisabled} onClick={migrateSchema}>
        Deploy Schema
      </button>
      <button disabled={seedDisabled} onClick={seedData}>
        Publish Seed Data
      </button>
    </div>
  );
};
