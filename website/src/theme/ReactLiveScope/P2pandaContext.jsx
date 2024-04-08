import React, { useMemo, useEffect, useState } from 'react';
import { KeyPair, Session } from 'shirokuma';
import { GraphQLClient } from 'graphql-request';

const LOCAL_STORAGE_KEY = 'privateKey';

const ENDPOINT = 'http://localhost:2020';

function getKeyPair() {
  // eslint-disable-next-line no-undef
  const privateKey = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (privateKey) {
    return new KeyPair(privateKey);
  }

  const keyPair = new KeyPair();
  // eslint-disable-next-line no-undef
  window.localStorage.setItem(LOCAL_STORAGE_KEY, keyPair.privateKey());
  return keyPair;
}

export const P2pandaContext = React.createContext({
  publicKey: null,
  keyPair: null,
  session: null,
  graphQLClient: null,
  endpoint: null,
});

export const P2pandaProvider = ({ children, endpoint = ENDPOINT }) => {
  const [ep, setEndpoint] = useState(endpoint);
  const state = useMemo(() => {
    const keyPair = getKeyPair();
    const session = new Session(`${ep}/graphql`).setKeyPair(keyPair);
    const graphQLClient = new GraphQLClient(`${ep}/graphql`);

    return {
      keyPair,
      publicKey: keyPair.publicKey(),
      session,
      graphQLClient,
      ep,
    };
  }, [ep]);

  // This component is used in live code editors which are independent components which only
  // re-render when the code is changed. To keep them all in sync with a global `endpoint` we do
  // this work-around.
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const timerID = setInterval(() => {
      // eslint-disable-next-line no-undef
      if (window.ENDPOINT && window.ENDPOINT != endpoint) {
        // eslint-disable-next-line no-undef
        setEndpoint(window.ENDPOINT);
      }
    }, 1000);

    return function cleanup() {
      // eslint-disable-next-line no-undef
      clearInterval(timerID);
    };
  });

  return (
    <P2pandaContext.Provider value={state}>{children}</P2pandaContext.Provider>
  );
};
