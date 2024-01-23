import { React, useContext } from 'react';

import { Header } from './Header';
import { MessageContext } from './MessageContext';

export const Error = () => {
  const { error } = useContext(MessageContext);

  return error ? <div className="error">{error}</div> : null;
};

export const Success = () => {
  const { success } = useContext(MessageContext);

  return success ? <div className="success">{success}</div> : null;
};

export const Main = ({ children, header }) => {
  return (
    <div className="app">
      <Header header={header} />
      <main>{children}</main>
      <Error></Error>
      <Success></Success>
    </div>
  );
};
