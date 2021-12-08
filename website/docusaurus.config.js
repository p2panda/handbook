// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "p2panda",
  tagline: "Official p2panda website",
  url: "https://p2panda.org",
  // @TODO: Change this to `/` before merging into `main`
  baseUrl: "/handbook/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  // favicon: "img/favicon.ico",
  organizationName: "p2panda",
  projectName: "p2panda",

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/p2panda/handbook/edit/main/website/",
        },
        blog: {
          showReadingTime: false,
          blogTitle: 'Releases',
          routeBasePath: 'releases',
          path: './releases',
          blogSidebarTitle: 'Releases',
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "p2🐼",
        // logo: {
        //   alt: "My Site Logo",
        //   src: "img/panda2by2.png",
        // },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Handbook",
          },
          { to: "/releases", label: "Releases", position: "left" },
          {
            href: "https://github.com/p2panda",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Documentation",
            items: [
              {
                label: "Handbook",
                to: "/docs",
              },
              {
                label: "Releases",
                to: "/releases",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Chat",
                href: "https://wald.liebechaos.org/channel/p2panda",
              },
              {
                label: "Code of Conduct",
                href: "https://github.com/p2panda/handbook/blob/main/CODE_OF_CONDUCT.md",
              },
            ],
          },
          {
            title: "Source Code",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/p2panda",
              },
              {
                label: "Contribute",
                href: "https://github.com/p2panda/handbook/blob/main/CONTRIBUTING.md",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} p2panda`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
