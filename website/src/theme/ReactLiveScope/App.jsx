import { React, useContext } from 'react';

import { Header } from './Header';
import { MessageContext } from './MessageContext';

const Main = ({ children }) => {
  return <main>{children}</main>;
};

export const Error = () => {
  const { error } = useContext(MessageContext);

  return error ? <div className="error">{error}</div> : null;
};

export const Success = () => {
  const { success } = useContext(MessageContext);

  return success ? <div className="success">{success}</div> : null;
};

export const App = ({ children }) => {
  return (
    <div className="app">
      <Header />
      <Main>{children}</Main>
      <Error></Error>
      <Success></Success>
    </div>
  );
};
