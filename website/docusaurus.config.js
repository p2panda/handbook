/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'p2panda',
  tagline: 'p2panda is a protocol for local-first applications',
  url: 'https://p2panda.org',
  // @TODO: Change this to `/` for replacing p2panda.org with this docusaurus
  baseUrl: '/handbook/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'images/p2panda.svg',

  // GitHub pages deployment config.
  organizationName: 'p2panda',
  projectName: 'handbook',

  // Even if you don't use internalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Serve the docs at the site's root
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      prism: {
        theme: require('prism-react-renderer/themes/github'),
        darkTheme: require('prism-react-renderer/themes/oceanicNext'),
        additionalLanguages: ['rust', 'bash'],
      },
      navbar: {
        hideOnScroll: true,
        logo: {
          alt: 'p2panda Handbook',
          src: 'images/handbook.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'about/index',
            position: 'left',
            label: 'About',
          },
          {
            type: 'doc',
            docId: 'learn/index',
            position: 'left',
            label: 'Learn',
          },
          {
            type: 'doc',
            docId: 'tutorials/index',
            position: 'left',
            label: 'Tutorials',
          },
          {
            type: 'doc',
            docId: 'libraries/index',
            position: 'left',
            label: 'Libraries',
          },
          {
            type: 'doc',
            docId: 'specification/index',
            position: 'left',
            label: 'Specification',
          },
          {
            type: 'doc',
            docId: 'faq',
            position: 'right',
            label: 'FAQ',
          },
          {
            type: 'doc',
            docId: 'links',
            position: 'right',
            label: 'Links',
          },
        ],
      },
      footer: {
        copyright: 'CC BY-SA 4.0',
      },
      colorMode: {
        disableSwitch: true, // Do not show light/dark mode switch
        respectPrefersColorScheme: true, // Automatically set mode to user preferences instead
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
