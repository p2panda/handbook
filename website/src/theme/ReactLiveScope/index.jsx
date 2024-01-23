import React from 'react';

import BrowserOnly from '@docusaurus/BrowserOnly';

export function App(props) {
  return (
    <BrowserOnly fallback={<div>...</div>}>
      {() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
        const Component = require('./App').App;
        return <Component {...props} />;
      }}
    </BrowserOnly>
  );
}

export function CafeForm(props) {
  return (
    <BrowserOnly fallback={<div>...</div>}>
      {() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
        const Component = require('./CafeForm').CafeForm;
        return <Component {...props} />;
      }}
    </BrowserOnly>
  );
}

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  App,
  CafeForm,
};

export default ReactLiveScope;
