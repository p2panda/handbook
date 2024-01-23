import React from 'react';

import { InitWasm } from './InitWasm';
import { P2pandaContext, P2pandaProvider } from './P2pandaContext';
import { MessageProvider } from './MessageContext';
import { CafeForm } from './CafeForm';
import { App } from './App';

import './styles.css';

export const Root = ({ children }) => {
  return (
    <InitWasm>
      <P2pandaProvider>
        <MessageProvider>
          <App>{children}</App>
        </MessageProvider>
      </P2pandaProvider>
    </InitWasm>
  );
};

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  Root,
  CafeForm,
  P2pandaContext,
};

export default ReactLiveScope;
