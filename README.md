# Online jewelry shop: Next.js + C# + SQL server

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- Used [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

- Used app routing

## Installed

- npm install axios
- npm install cors
- npm install cookie
- npm install prop-types

## TO DO

#### email/forms:

- [ ] change email input type
- [ ] add validation of email and password user's input
- [ ] create confirmation email with link for new user
- [ ] add "Reset password" function
- [ ] coding userPassword with MD5 or scrypt/bcrypt

#### after registration/login:

- [x] changing of the UserIcon to user's first letters
- [x] changing of the FavoritesIcon, ShoppingCartIcon in ProductCart(depends on userId)
- [ ] check cookies, if exist Favorites and/or ShoppingCart ask to insert them to DB and delete from cookies

#### global:

- [x] changing of the ShoppingCartIcon when add/delete item from SC (users + guests)
- [x] changing of the FavoritesIcon when add/delete item from Fav.list (users + guests)
- [x] favorites page
- [x] check if category exists
- [x] button toTop
- [x] display badge on icons Bag и Favorites in user menu
- [ ] home page
  - [x] subCategories
  - [x] text
  - [ ] contact form
  - [ ] ?gallery on main page
- [ ] navBar CSS @media
- [ ] header img/video
- [ ] footer
- [ ] user info page
- [ ] product details page
- [ ] change alert messages to modal

- [ ] ?в куках для гостя хранить количество товара(доступно только в корзине)
- [ ] ?display only products with quantity>0 or display "out of stock"
- [ ] @media
- [ ] search function
- [ ] filters

#### orders/ShoppingCart:

- [ ] in ShoppingCart, when place order, check if user_level != 0
- [ ] в ShoppingCart проверять наличие и количество товара
- [ ] button for quantity
- [ ] registration/login if user is guest
