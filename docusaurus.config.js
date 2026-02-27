import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Tanishq Harit Portfolio',
  favicon: 'img/favicon.ico',

  future: {
    v4: true, // To improve compatibility with the upcoming Docusaurus v4
  },

  // URL
  url: 'https://tanishqharit.github.io',
  baseUrl: '/Portfolio/',

  // GitHub pages deployment config.
  organizationName: 'tanishqharit', // Github user name 
  projectName: 'Portfolio',         // Github repository name 
  trailingSlash: false,
  onBrokenLinks: 'throw',

  // Language Configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Algolia Custom Meta Tags Header - for search bar functionality approval
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: 'AEA78EBD943D8C37',
      },
    },
  ],

  // Custom preset for our website
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'Z_MarkDowns',
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },

        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      algolia: {
        appId: '5CRHSE3JIM',
        apiKey: '37c69ea7ccc268b9e6fc24aebcad6e52',
        indexName: 'tanishqharit_portfolio',
        contextualSearch: true,
      },
      navbar: {
        title: 'Tanishq Harit',
        items: [
          {
            href: 'https://github.com/tanishqharit',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://www.linkedin.com/in/tanishqharit/',
            label: 'LinkedIn',
            position: 'right',
          },
          {
            href: 'https://public.tableau.com/app/profile/tanishq.harit',
            label: 'Tableau Public',
            position: 'right'
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Tanishq Harit. Built with ❤️`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
