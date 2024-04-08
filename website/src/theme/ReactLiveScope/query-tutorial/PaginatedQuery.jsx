import React, { useState, useContext, useEffect, useCallback } from 'react';
import { gql } from 'graphql-request';

import { P2pandaContext } from '../P2pandaContext';
import { MessageContext } from '../MessageContext';
import { VOCAB_SCHEMA_ID } from '../consts';

export const PaginatedQuery = ({ queryBuilder }) => {
  const { graphQLClient } = useContext(P2pandaContext);
  const { setError } = useContext(MessageContext);

  const [vocabulary, setVocabulary] = useState([]);
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const getVocabulary = useCallback(
    async (after) => {
      const query = queryBuilder(after);
      try {
        let result = await graphQLClient.request(gql`
          ${query}
        `);
        result = result[`all_${VOCAB_SCHEMA_ID}`];
        setEndCursor(result['endCursor']);
        setVocabulary(result['documents']);
        setHasNextPage(result['hasNextPage']);
        setCurrentPageIndex(currentPageIndex + 1);
      } catch (err) {
        setError(`${err}`);
      }
    },
    [currentPageIndex, graphQLClient, queryBuilder, setError],
  );

  const renderVocabulary = () => {
    if (!vocabulary) {
      return (
        <option key={0} value={''}>
          {'no data'}
        </option>
      );
    }
    return vocabulary.map((item, index) => {
      const itemIndex =
        Number(vocabulary.length * (currentPageIndex - 1)) + index;
      const id = item['meta']['documentId'];
      const word = item['fields']['word'];
      return (
        <option key={id}>
          {itemIndex}: {word}
        </option>
      );
    });
  };

  useEffect(() => {
    if (!endCursor) {
      getVocabulary(endCursor);
    }
  }, [endCursor, getVocabulary]);

  const onClick = (event) => {
    event.preventDefault();
    getVocabulary(endCursor);
  };

  return (
    <div className="vocabulary-pagination">
      <h2>Vocabulary</h2>
      <fieldset>
        <select id="vocabulary" name="vocabulary" size={vocabulary.length}>
          {renderVocabulary()}
        </select>
      </fieldset>
      <button disabled={!hasNextPage} onClick={onClick}>
        Next Page
      </button>
    </div>
  );
};
