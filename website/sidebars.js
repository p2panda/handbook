// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  about: [
    'about/index',
    'about/things-were-interested-in',
    'about/roadmap',
    'about/contribute',
    'about/history',
  ],
  // @TODO: We need to re-write the learn section a little as things like "Bamboo" etc. got removed from the specification.
  // See related issue: https://github.com/p2panda/handbook/issues/306
  learn: ['learn/index', 'learn/entries', 'learn/operations', 'learn/networks'],
  specifications: [
    'specifications/index',
    'specifications/namakemono/index',
    {
      type: 'category',
      label: 'aquadoggo API',
      items: [
        {
          type: 'doc',
          id: 'specifications/aquadoggo/index',
          label: 'Introduction',
        },
        'specifications/aquadoggo/key-concepts',
        {
          type: 'category',
          label: 'Core data types',
          items: [
            'specifications/aquadoggo/data-types/bamboo',
            'specifications/aquadoggo/data-types/key-pairs',
            'specifications/aquadoggo/data-types/operations',
            'specifications/aquadoggo/data-types/schemas',
            'specifications/aquadoggo/data-types/documents',
            'specifications/aquadoggo/data-types/document-views',
            'specifications/aquadoggo/data-types/blobs',
          ],
        },
        {
          type: 'category',
          label: 'APIs',
          items: [
            'specifications/aquadoggo/APIs/overview',
            'specifications/aquadoggo/APIs/publishing',
            'specifications/aquadoggo/APIs/queries',
            'specifications/aquadoggo/APIs/blob-http',
          ],
        },
        {
          type: 'category',
          label: 'Networking',
          items: [
            'specifications/aquadoggo/networking/clients-nodes',
            'specifications/aquadoggo/networking/networking',
          ],
        },
        'specifications/aquadoggo/replication',
        'specifications/aquadoggo/encoding-data',
        'specifications/aquadoggo/glossary',
      ],
    },
  ],
};

module.exports = sidebars;
