import React from 'react';

import { InitWasm } from './InitWasm';
import { P2pandaProvider } from './P2pandaContext';
import { MessageProvider } from './MessageContext';
import { Main } from './Main';

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
