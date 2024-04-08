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

export function Query(props) {
  return (
    <BrowserOnly fallback={<div>...</div>}>
      {() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
        const Component = require('./query-tutorial/Query').Query;
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

export function BootstrapNode(props) {
  return (
    <BrowserOnly fallback={<div>...</div>}>
      {() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
        const Component = require('./query-tutorial/BootstrapNode').BootstrapNode;
        return <Component {...props} />;
      }}
    </BrowserOnly>
  );
}

export function PaginatedQuery(props) {
  return (
    <BrowserOnly fallback={<div>...</div>}>
      {() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
        const Component = require('./query-tutorial/PaginatedQuery').PaginatedQuery;
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
  Query,
  BootstrapNode,
  PaginatedQuery,
};

export default ReactLiveScope;
