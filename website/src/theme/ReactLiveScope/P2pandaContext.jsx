import React, { useMemo } from 'react';
import { KeyPair, Session } from 'shirokuma';
import { GraphQLClient } from 'graphql-request';

const LOCAL_STORAGE_KEY = 'privateKey';

const ENDPOINT = 'http://localhost:2020/graphql';

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
});

export const P2pandaProvider = ({ children }) => {
  const state = useMemo(() => {
    const keyPair = getKeyPair();
    const session = new Session(ENDPOINT).setKeyPair(keyPair);
    const graphQLClient = new GraphQLClient(ENDPOINT);

    return {
      keyPair,
      publicKey: keyPair.publicKey(),
      session,
      graphQLClient,
    };
  }, []);

  return (
    <P2pandaContext.Provider value={state}>{children}</P2pandaContext.Provider>
  );
};
