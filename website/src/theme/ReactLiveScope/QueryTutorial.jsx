import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { gql, GraphQLClient } from 'graphql-request';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

export const QueryTutorial = ({ query, endpoint }) => {
  const [result, setResult] = useState('No results');
  // eslint-disable-next-line no-undef, no-redeclare
  const [endpoint, setEndpoint] = useState(endpoint);

  const client = useMemo(() => {
    const graphQLClient = new GraphQLClient(`${endpoint}/graphql`);
    return graphQLClient;
  }, [endpoint]);

  // This component is used in live code editors which are independent components which only
  // re-render when the code is changed. To keep them all in sync with a global `endpoint` we do
  // this work-around.
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const timerID = setInterval(() => {
      // eslint-disable-next-line no-undef
      setEndpoint(window.ENDPOINT);
    }, 1000);

    return function cleanup() {
      // eslint-disable-next-line no-undef
      clearInterval(timerID);
    };
  });

  const makeQuery = useCallback(async () => {
    try {
      const result = await client.request(gql`
        query {${query}}
      `);
      setResult(result);
    } catch (err) {
      setResult(err);
    }
  }, [client, query]);

  useEffect(() => {
    makeQuery();
  }, [makeQuery]);

  return (
    <div id="query-tutorial-results">
      <button onClick={makeQuery}>&#8635;</button>
      <JsonView src={result} theme="default" />
    </div>
  );
};
