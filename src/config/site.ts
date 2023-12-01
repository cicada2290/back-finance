export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'BackFinance',
  description:
    'A decentralized financial swap platform built on the XRP Ledger.',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Swap',
      href: '/swap',
    },
    {
      label: 'Liquidity',
      href: '/liquidity',
    },
    {
      label: 'Faucet',
      href: '/faucet',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
}
