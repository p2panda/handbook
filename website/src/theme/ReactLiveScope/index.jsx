import React from 'react';

import BrowserOnly from '@docusaurus/BrowserOnly';

import './styles.css';

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
        const Component = require('./fishy-tutorial/CafeForm').CafeForm;
        return <Component {...props} />;
      }}
    </BrowserOnly>
  );
}

export function QueryTutorial(props) {
  return (
    <BrowserOnly fallback={<div>...</div>}>
      {() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
        const Component = require('./query-tutorial/QueryTutorial').QueryTutorial;
        return <Component {...props} />;
      }}
    </BrowserOnly>
  );
}

export function StudySetForm(props) {
  return (
    <BrowserOnly fallback={<div>...</div>}>
      {() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
        const Component = require('./query-tutorial/StudySetForm').StudySetForm;
        return <Component {...props} />;
      }}
    </BrowserOnly>
  );
}

export function QueryTutorialNodeBootstrap(props) {
  return (
    <BrowserOnly fallback={<div>...</div>}>
      {() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
        const Component = require('./query-tutorial/QueryTutorialNodeBootstrap').QueryTutorialNodeBootstrap;
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
  StudySetForm,
  QueryTutorial,
  QueryTutorialNodeBootstrap,
};

export default ReactLiveScope;
