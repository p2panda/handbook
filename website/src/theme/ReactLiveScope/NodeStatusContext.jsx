import React, { useContext, useState, useEffect } from 'react';
import { gql } from 'graphql-request';

import { P2pandaContext } from './P2pandaContext';
import { MessageContext } from './MessageContext';

export const NodeStatusContext = React.createContext();

export const NodeStatusProvider = ({ children }) => {
  const { graphQLClient } = useContext(P2pandaContext);
  const { setError } = useContext(MessageContext);

  const POLLING_INTERVAL = 1000;

  const [nodeOnline, setNodeOnline] = useState();

  useEffect(() => {
    const checkNode = async () => {
      try {
        await graphQLClient.request(gql`
          query checkNode {
            all_schema_definition_v1 {
              totalCount
            }
          }
        `);
        if (!nodeOnline) {
          setError(null);
          setNodeOnline(true);
        }
      } catch (err) {
        if (nodeOnline) {
          setNodeOnline(false);
          setError('Node offline');
        }
      }
    };

    // eslint-disable-next-line no-undef
    const intervalId = setInterval(() => {
      checkNode();
    }, POLLING_INTERVAL);

    // eslint-disable-next-line no-undef
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [graphQLClient, nodeOnline, setError]);

  return (
    <NodeStatusContext.Provider value={{ nodeOnline }}>
      {children}
    </NodeStatusContext.Provider>
  );
};
