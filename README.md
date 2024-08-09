# LuxGleam - jewelry e-shop

### NEXT.JS :

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- Used [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize a custom Google Font.

- Used app routing

      - npm install axios
      - npm install cookie
      - npm install prop-types
      - npm i --save react-select
      - npm install joi

### C#: .NET 8.0 (ASP.NET Core Web API)

          - Swashbuckle.AspNetCore
          - System.Data.SqlClient
          - BCrypt.Net-Next
          - FluentValidation.AspNetCore

### DB: SQL Server

## TO DO

#### email/forms:

- [x] change email input type
- [x] add validation of email and user's input
- [ ] create confirmation email with link for new user
- [ ] add "Reset password" function
- [x] create userPassword hash with BCrypt, Argon2 or PBKDF2

#### after registration/login:

- [x] changing of the UserIcon to user's initials
- [x] changing of the FavoritesIcon, ShoppingCartIcon in ProductCart (depends on userId)
- [ ] check cookies, if exist Favorites and/or ShoppingCart ask to insert them to DB and delete from cookies

#### global:

- [x] changing of the ShoppingCartIcon when add/delete item from SC (users + guests)
- [x] changing of the FavoritesIcon when add/delete item from Fav.list (users + guests)
- [x] favorites page
- [x] check if category exists
- [x] button toTop
- [x] display badge on icons Bag and Favorites in user menu
- [x] SortBy function
- [x] filters function
- [ ] home page
  - [x] subCategories
  - [x] text
  - [x] add category desc into DB (new column)
  - [ ] contact form
  - [ ] ?gallery on main page
- [ ] navBar CSS @media
- [ ] header img/video
- [ ] footer
- [ ] user info page
- [ ] product details page
- [ ] change alert messages to modal
- [ ] ?в куках для гостя хранить количество товара (доступно только в корзине)
- [ ] ?display only products with quantity>0 or display "out of stock"
- [ ] @media
- [ ] links
- [ ] ?search function

#### orders/ShoppingCart:

- [ ] shoppingCart page
- [ ] in ShoppingCart, when place order, check if user_level != 0
- [ ] в ShoppingCart проверять наличие и количество товара
- [ ] button for quantity
- [ ] registration/login if user is guest

#### admin panel:

- [ ] login
- [ ] dashboard
- [ ] add new item/category
- [ ] update exist item/category
- [ ] view orders+++
