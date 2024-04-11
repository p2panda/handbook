/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'p2panda',
  tagline: 'p2panda is a protocol for local-first applications',
  url: 'https://p2panda.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'images/deepsea-panda.svg',

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
        blog: {
          showReadingTime: false,
          feedOptions: {
            type: 'rss',
            title: 'p2panda News',
            language: 'en',
          },
        },
      }),
    ],
  ],

  plugins: ['@docusaurus/plugin-ideal-image'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        hideOnScroll: true,
        logo: {
          alt: 'p2panda Handbook',
          src: 'images/p2panda-book.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'about/index',
            position: 'left',
            label: 'About',
          },
          // @TODO: We won't make the blog public fully public until the first installment is completed
          // {
          //   position: 'left',
          //   to: 'blog',
          //   label: 'News',
          // },
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
            docId: 'sdks/index',
            position: 'left',
            label: 'SDKs',
          },
          {
            type: 'doc',
            docId: 'specifications/index',
            position: 'left',
            label: 'Specifications',
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
          {
            type: 'doc',
            docId: 'contact',
            position: 'right',
            label: 'Contact',
          },
        ],
      },
      footer: {
        copyright: 'CC BY-SA 4.0',
      },
      colorMode: {
        disableSwitch: true, // Do not show light/dark mode switch
        respectPrefersColorScheme: true, // Automatically set mode to user preferences instead
        defaultMode: 'light',
      },
      prism: {
        theme: require('./src/codeTheme'),
        additionalLanguages: ['rust', 'bash', 'graphql', 'toml'],
      },
    }),

  themes: ['@docusaurus/theme-live-codeblock'],
};

module.exports = config;
