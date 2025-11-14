# Project name: LuxGleam

### Project Goal:

The goal of this project is to integrate a `Next.js` frontend with a `C#` backend and a `SQL Server` database, making all parts work together smoothly.
This is my first experience working with multiple languages and a full-scale database — a step up from my earlier projects that used `React` or `Next.js` with public APIs or JSON files.

### Project Status:

Development was paused after realizing that several architectural and security aspects could be improved. Some features could have been implemented differently or delegated to external libraries.
Although the core integration works — all three layers communicate successfully — the project will not be continued in its current form.
Still, it was an excellent learning experience and a valuable step forward in understanding backend integration and system design.

<br />

[<img src="preview.png" height="250" align="right" style="margin-left:20px" />](preview.png)

### 🧩 Tech Stack

#### **🖥️ Frontend:**

![Next.js](https://img.shields.io/badge/Next.js_14.2.5-424242?logo=nextdotjs)
![React](https://img.shields.io/badge/React_18-424242?logo=react&logoColor=61DAFB)

![react-dom](https://img.shields.io/badge/react--dom_18-424242?logo=react&logoColor=61DAFB)
![react-select](https://img.shields.io/badge/react--select_5.8.0-424242)
![axios](https://img.shields.io/badge/axios_1.7.2-424242)
![cookie](https://img.shields.io/badge/cookie_0.6.0-424242)
![joi](https://img.shields.io/badge/joi_17.13.3-424242)

#### **⚙️ Backend: C# / .NET** (ASP.NET Core Web API)

![C#](https://img.shields.io/badge/C%23_7.3-424242?logo=csharp&logoColor=white)
![.NET](https://img.shields.io/badge/.NET_8.0-424242)
![Swashbuckle.AspNetCore](https://img.shields.io/badge/Swashbuckle.AspNetCore_6.5.0-424242)
![System.Data.SqlClient](https://img.shields.io/badge/System.Data.SqlClient_4.8.3-424242)
![BCrypt.Net-Next](https://img.shields.io/badge/BCrypt.Net--Next_4.0.2-424242)
![FluentValidation.AspNetCore](https://img.shields.io/badge/FluentValidation.AspNetCore_11.6.0-424242)

#### **🛢 DB: SQL Server**

![SQL Server](https://img.shields.io/badge/SQL--Server_2019-424242?logo=microsoftsqlserver&logoColor=white)

<!-- end:tech-stack -->

<details style="border:1px solid #d4d4d4; border-radius:2px; padding:1rem;">
<summary><h4 style="display:inline; padding-left:6px;">Dependencies</h4></summary>

**frontend:**

```bash
npm install axios
npm install cookie
npm install prop-types
npm i --save react-select
npm install joi
```

**backend:**

```bash
Swashbuckle.AspNetCore
System.Data.SqlClient
BCrypt.Net-Next
FluentValidation.AspNetCore
```

</details>
<br />

## 💎 Features Implemented

### ✨ Frontend (Next.js + React)

- SPA built with **Next.js App Router**
- User interface for product categories, filters, and sorting
- Dynamic **category menu** populated from database:
  - Categories from `Categories` table
  - Additional product labels like "Discount 15%", "New", etc. (`union all select prod_label from Products`)
- Shopping cart and favorites handled via `axios` and `UserContext`
- Guest support:
  - Temporary storage of cart and favorites in **cookies**
  - Synchronization upon login

### 🛂 Authentication & User Management

- **Registration and login implemented without external services**
- Forms validated with **Joi**:
  - Email, password, first name, last name
  - Password strength enforced
- **Sessions stored in HTTP-only cookies** for security
- Server-side registration and login handled via C# Web API:
  - Passwords hashed securely with `BCrypt.Net-Next`
- Support for **guest users** with temporary ID (`userId = -1`)

### 🛒 Shopping Cart & Favorites

- Add and remove products from the cart
- Favorites and cart synchronized with server upon login
  -Guest users’ data stored in cookies, enabling local interaction

### 🗄️ Backend (C#, .NET, SQL Server)

- APIs for managing users, products, cart, and favorites
- Model validation using `FluentValidation.AspNetCore`
- **SQL Server** used to store categories, products, users, cart, and favorites
- Server manages authentication and cookies, with no reliance on external services

---

<details style="border:1px solid #d4d4d4; border-radius:2px; padding:1rem;">
<summary><h4 style="display:inline; padding-left:6px;">📋 TODO</h4></summary>

#### email/forms:

- [ ] create confirmation email with link for new user
- [ ] add "Reset password" function

#### after registration/login

- [ ] check cookies, if exist Favorites and/or ShoppingCart ask to insert them to DB and delete from cookies

#### global:

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
</details>
<details style="border:1px solid #d4d4d4; border-radius:2px; padding:1rem;">
<summary><h4 style="display:inline; padding-left:6px;">✅ Done</h4></summary>

- [x] change email input type
- [x] add validation of email and user's input
- [x] create userPassword hash with BCrypt, Argon2 or PBKDF2
- [x] changing of the UserIcon to user's initials
- [x] changing of the FavoritesIcon, ShoppingCartIcon in ProductCart (depends on userId)
- [x] changing of the ShoppingCartIcon when add/delete item from SC (users + guests)
- [x] changing of the FavoritesIcon when add/delete item from Fav.list (users + guests)
- [x] favorites page
- [x] check if category exists
- [x] button toTop
- [x] display badge on icons Bag and Favorites in user menu
- [x] SortBy function
- [x] filters function

</details>
