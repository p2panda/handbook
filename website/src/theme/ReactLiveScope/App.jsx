import React from 'react';

import { InitWasm } from './InitWasm';
import { P2pandaProvider } from './P2pandaContext';
import { MessageProvider } from './MessageContext';
import { NodeStatusProvider } from './NodeStatusContext';
import { Main } from './Main';

export const App = ({ children, header = '', sayHello = false, endpoint }) => {
  return (
    <InitWasm>
      <P2pandaProvider endpoint={endpoint}>
        <MessageProvider>
          <NodeStatusProvider>
            <Main header={header} sayHello={sayHello}>
              {children}
            </Main>
          </NodeStatusProvider>
        </MessageProvider>
      </P2pandaProvider>
    </InitWasm>
  );
};
