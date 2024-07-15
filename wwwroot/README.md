This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Installed

- npm install axios
- npm install cors
- npm install cookie

## TO DO

- [ ] change email input type
- [ ] add validation of email and password user's input
- [ ] create confirmation email with link for new user
- [ ] after registration/login:
  - [ ] check cookies, if exist Favorites and/or ShoppingCart insert them to DB and delete from cookies
  - [x] change UserIcon to use first letters
  - [ ] change FavoritesIcon, ShoppingCartIcon in ProductCart
- [ ] change ShoppingCartIcon when add/delete item from SC
- [ ] in ShoppingCart, when place order, check if user_level!=0
- [ ] coding userPassword with MD5 or scrypt/bcrypt
- [ ] add "Reset password" function
