# XRPL Dapp

## Technologies Used

### Blockchain

- [XRP Ledger](https://xrpl.org/)

### Wallet

- [CROSSMARK](https://crossmark.io/)
- [XUMM](https://xumm.app/)

### Frontend

- [Next.js 13](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Wallets

| Name        | Address                              |
| :---------- | :----------------------------------- |
| COLD WALLET | `rpjpQizArxwQcjhWmioaqjojqv634LJ4as` |
| HOT WALLET  | `rEMej33dSAxNhTKGmdK72489HFqf55m7HK` |

## Assets

| Currency | Issuer                               |
| :------- | :----------------------------------- |
| BTC      | `rpjpQizArxwQcjhWmioaqjojqv634LJ4as` |
| ETH      | `rpjpQizArxwQcjhWmioaqjojqv634LJ4as` |
| BNB      | `rpjpQizArxwQcjhWmioaqjojqv634LJ4as` |

## Pools

- XRP/BTC
- XRP/ETH
- XRP/BNB
- BTC/ETH
- BTC/BNB
- ETH/BNB

## How to Use

### Clone the Template from GitHub Repository

To create a new project using this template, execute the following command:

```bash
git clone git@github.com:cicada2290/xrpl-dapp.git
```

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

## Directory structure

```bash
src/
 ├ app/
 ├ components/
 │  ├ elements/
 │  ├ features/
 │  └ layouts/
 ├ config/
 ├ context/
 ├ hooks/
 ├ libs/
 ├ styles/
 └ types/
```

## Tips

### Prisma

```bash
# Run a migration to create your database tables with Prisma Migrate
npx prisma migrate dev --name init
```
