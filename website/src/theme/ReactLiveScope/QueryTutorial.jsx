import React, { useCallback, useEffect, useContext, useState } from 'react';
import { gql } from 'graphql-request';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

import { P2pandaContext } from './P2pandaContext';

export const QueryTutorial = ({ query }) => {
  const { graphQLClient } = useContext(P2pandaContext);

  const [result, setResult] = useState('No results');

  const makeQuery = useCallback(async () => {
    try {
      const result = await graphQLClient.request(gql`
        query {${query}}
      `);
      setResult(result);
    } catch (err) {
      setResult(err);
    }
  }, [query, graphQLClient]);

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
