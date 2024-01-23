import React from 'react';

import { InitWasm } from './InitWasm';
import { P2pandaContext, P2pandaProvider } from './P2pandaContext';
import { MessageProvider } from './MessageContext';
import { CafeForm } from './CafeForm';
import { Main } from './Main';

import './styles.css';

export const App = ({ children, header = '' }) => {
  return (
    <InitWasm>
      <P2pandaProvider>
        <MessageProvider>
          <Main header={header}>{children}</Main>
        </MessageProvider>
      </P2pandaProvider>
    </InitWasm>
  );
};

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  App,
  CafeForm,
  P2pandaContext,
};

export default ReactLiveScope;
