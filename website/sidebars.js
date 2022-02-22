// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'overview',
    {
      type: 'category',
      label: 'Writing Data',
      link: {
        type: 'generated-index',
      },
      items: [
        'writing-data/bamboo',
        'writing-data/key-pairs',
        'writing-data/schemas',
        'writing-data/operations',
        'writing-data/client-nodes',
      ],
    },
    {
      type: 'category',
      label: 'Organising Data',
      link: {
        type: 'generated-index',
      },
      items: [
        'organising-data/documents',
        'organising-data/reduction',
        'organising-data/queries',
      ],
    },
    {
      type: 'category',
      label: 'Networking',
      link: {
        type: 'generated-index',
      },
      items: [
        'networking/discovery',
        'networking/replication',
      ],
    },
    {
      type: 'category',
      label: 'Collaboration',
      link: {
        type: 'generated-index',
      },
      items: [
        'collaboration/overview',
        'collaboration/key-groups',
        'collaboration/reconciliation',
        'collaboration/encryption',
      ],
    },
    {
      type: 'category',
      label: 'Extensions',
      link: {
        type: 'generated-index',
      },
      items: [
        'extensions/overview',
        'extensions/migration',
        'extensions/blobs',
      ],
    },
  ],
};

module.exports = sidebars;
