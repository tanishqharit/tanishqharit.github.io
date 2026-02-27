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

  // Custom preset for our website
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'Z_MarkDowns',
          routeBasePath: '/',
          sidebarPath: false,
          sidebarItemsGenerator: async ({ defaultSidebarItemsGenerator, ...args }) => {
            return defaultSidebarItemsGenerator(args);
          },
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
