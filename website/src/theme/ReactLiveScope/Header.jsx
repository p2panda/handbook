import React from 'react';

import { P2pandaContext } from './P2pandaContext';

export const Header = ({ header, sayHello }) => {
  return (
    <header className="header">
      <h1>{header}</h1>
      {sayHello ? (
        <P2pandaContext.Consumer>
          {({ publicKey }) => {
            return <p className="public-key">Hello, {publicKey}!</p>;
          }}
        </P2pandaContext.Consumer>
      ) : null}
    </header>
  );
};
