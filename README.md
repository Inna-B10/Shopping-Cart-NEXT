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

#### email/forms:

- [ ] change email input type
- [ ] add validation of email and password user's input
- [ ] create confirmation email with link for new user
- [ ] add "Reset password" function
- [ ] coding userPassword with MD5 or scrypt/bcrypt

#### after registration/login:

- [ ] check cookies, if exist Favorites and/or ShoppingCart ask to insert them to DB and delete from cookies
- [x] changing of the UserIcon to user's first letters
- [ ] changing of the FavoritesIcon, ShoppingCartIcon in ProductCart

#### global:

- [ ] change alert messages to modal
- [x] changing of the ShoppingCartIcon when add/delete item from SC (users + guests)

- [ ] ?в куках для гостя хранить количество товара(доступно только в корзине)
- [ ] check if category exists
- [ ] favorites
- [ ] user info page

#### orders/ShoppingCart:

- [ ] in ShoppingCart, when place order, check if user_level != 0
- [ ] в ShoppingCart проверять наличие и количество товара
