import React from 'react';
import Layout from '@theme/Layout';
import { ZooAdventures } from 'zoo-adventures';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Home"
      description="Description will go into a meta tag in <head />">
      <h1>p2panda is a protocol for local-first applications</h1>
      <div className="panda-zoo">
        <div className="panda-zoo-inner">
          <ZooAdventures />
        </div>
      </div>
    </Layout>
  );
}
