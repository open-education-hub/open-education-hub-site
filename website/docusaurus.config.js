// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Open Education Hub',
  url: 'https://openeducationhub.github.io',
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Open Education Hub', // Usually your GitHub org/user name.
  projectName: 'open-education-hub-website', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/open-education-hub/open-education-hub-site/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }
      ),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Open Education Hub',
        logo: {
          alt: 'Open Education Hub Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg',
        },
        items: [
          {
            to: 'docs/description/project-description',
            label: 'Project description',
            position: 'left',
          },
          {
            to: 'docs/community/people',
            label: 'Community',
            position: 'left',
          },
          {
            href: 'https://github.com/open-education-hub/open-education-hub-site/',
            label: 'Repository',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                to: 'docs/community/people',
                label: 'Community members',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/UXjumUSGHx',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/OpenEduHub',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Open-Education-Hub',
              },
              {
                label: 'Reddit',
                href: 'Reddit: https://www.reddit.com/user/Open_Education_Hub',
              },
              {
                label: 'Linkedin',
                href: 'https://www.linkedin.com/company/open-education-hub',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/channel/UCumS6d-kaVXreY46eZLtEvA',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/openeducationhub',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Universitatea Politehnica București. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
