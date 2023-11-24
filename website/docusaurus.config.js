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
          src: 'img/eea-grants.png',
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
            to: 'docs/events/m1',
            label: 'Events',
            position: 'left',
          },
          {
            to: 'docs/blog/intro',
            label: 'Blog',
            position: 'left',
          },
          {
            to: 'docs/published-papers/intro',
            label: 'Published Papers',
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
                href: 'https://www.youtube.com/@OpenEduHub',
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
          {
            items: [
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/open.education.hub/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="http://www.upb.ro">University POLITEHNICA of Bucharest<a/>, <a href="https://english.hi.is/">University of Iceland</a>. Built with <a href="https://docusaurus.io/">Docusaurus</a>.
          <p>
          The Financial Mechanism Office maintains this website to enhance public access to information about the programmes and projects of the EEA and Norway Grants.
          The information is of a general nature, based on information and data registered by third parties and is not intended to be comprehensive or complete.

          We make our best efforts to keep this information timely and accurate.
          If errors are brought to our attention we will try to correct them.
          However, The Financial Mechanism Office accepts no responsibility or liability whatsoever with regard to the information on this site and is in no event liable for damages of any kind incurred or suffered as a result of the use of the information presented on this website.

          The Financial Mechanism Office reserves the right to alter, amend or remove pages, in whole or in part, without prior notice or to discontinue publication for a period of time or even completely.
          </p>
          <p>
          This material was realised with the EEA Financial Mechanism 2014-2021 financial support.
          Its content (text, photos, videos) does not reflect the official opinion of the Programme Operator, the National Contact Point and the Financial Mechanism Office.
          Responsibility for the information and views expressed therein lies entirely with the author(s).
          </p>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
