import React from 'react';

import { P2pandaContext } from './P2pandaContext';

export const Header = ({ header }) => {
  return (
    <header className="header">
      <h1>{header}</h1>
      <P2pandaContext.Consumer>
        {({ publicKey }) => {
          return <p className="public-key">Hello, {publicKey}!</p>;
        }}
      </P2pandaContext.Consumer>
    </header>
  );
};
