// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  about: [
    'about/index',
    'about/things-were-interested-in',
    'about/implementations',
    'about/specification',
    'about/roadmap',
    'about/contribute',
    'about/history',
  ],
  learn: [
    'learn/index',
  ],
  specification: [
    'specification/index',
    {
      type: 'category',
      label: 'Data types',
      items: [
        'specification/data-types/bamboo',
        'specification/data-types/key-pairs',
        'specification/data-types/operations',
        'specification/data-types/schemas',
        'specification/data-types/documents',
        'specification/data-types/materialization',
      ],
    },
    {
      type: 'category',
      label: 'Networking',
      items: [
        'specification/networking/clients-nodes',
        'specification/networking/queries',
        'specification/networking/discovery',
        'specification/networking/replication',
      ],
    },
    {
      type: 'category',
      label: 'Collaboration',
      items: [
        'specification/collaboration/key-groups',
        'specification/collaboration/secret-groups',
      ],
    },
  ],
};

module.exports = sidebars;
