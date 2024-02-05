import React, { useCallback, useEffect, useState, useContext } from 'react';
import { gql } from 'graphql-request';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';
import { P2pandaContext } from '../P2pandaContext';
import { MessageContext } from '../MessageContext';

export const Query = ({ query }) => {
  const [result, setResult] = useState('No results, is your node online?');
  const { graphQLClient } = useContext(P2pandaContext);
  const { setError } = useContext(MessageContext);
  
  const makeQuery = useCallback(async () => {
    try {
      const result = await graphQLClient.request(gql`
        ${query}
      `);
      setResult(result);
    } catch (err) {
      setError(`${err}`);
    }
  }, [graphQLClient, query, setError]);

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
