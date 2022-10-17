// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Open Education Hub (OpenEdu)',
  tagline: 'Creating the Future of Education. Together',
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
        },
        items: [
          {
            to: 'docs/description/project-description',
            label: 'Project Description',
            position: 'left',
          },
          {
            to: 'docs/community/team',
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
            items: [
              {
                label: 'Discord',
                href: 'https://bit.ly/OpenEduHub',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Open-Education-Hub',
              },
            ],
          },
          {
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/OpenEduHub',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/openeducationhub',
              },
            ],
          },
          {
            items: [
              {
                label: 'Linkedin',
                href: 'https://www.linkedin.com/company/open-education-hub',
              },
              {
                label: 'Reddit',
                href: 'Reddit: https://www.reddit.com/user/Open_Education_Hub',
              },
            ],
          },
          {
            items: [
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/channel/UCumS6d-kaVXreY46eZLtEvA',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="http://www.upb.ro">University POLITEHNICA of Bucharest<a/>, <a href="https://english.hi.is/">University of Iceland</a>. Built with <a href="https://docusaurus.io/">Docusaurus</a>.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
