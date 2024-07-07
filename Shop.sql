--CREATE DATABASE ShopDb
--COLLATE Norwegian_100_CI_AI_SC_UTF8;
--use ShopDb

--create table Images(
--ID int Identity(1,1) Primary Key,
--Name varchar(100),
--Image varchar(100),
--ActualPrice decimal(18,2),
--DiscountedPrice decimal(18,2))


--insert into Images values
--('Red shoes', 'd5.jpg', 115.00, 60.00),
--('Watch', 'd1.jpg', 195.00, 95.00),
--('Jeans', 'd8.jpg', 95.00, 40.00),
--('Smartphone', 'd4.jpg', 195.00, 95.00),
--('Shirt', 'd7.jpg', 95.00, 40.00),
--('Sneakers', 'd2.jpg', 65.00, 25.00),
--('Iron', 'd3.jpg', 95.00, 50.00),
--('Sunglasses', 'd6.jpg', 84.00, 36.00)

--create table ShoppingCart(
--ID int Identity(1,1) Primary Key,
--ProductID int)

-------------------------------------------------------------------------------------------------
----Create table Categories
--CREATE TABLE Categories (
--    cat_id INT IDENTITY(1,1),
--    cat_name VARCHAR(255) NOT NULL,
--	constraint PK_cat_id PRIMARY KEY (cat_id)
--);

--ALTER TABLE Categories
--ADD CONSTRAINT UQ_cat_name UNIQUE (cat_name);

----create table Products
--CREATE TABLE Products (
--    prod_id INT IDENTITY(1,1),
--    prod_name VARCHAR(255) NOT NULL,
--    prod_cat_id INT NOT NULL,
--    prod_price DECIMAL(18,2) NOT NULL,
--    prod_price_discounted DECIMAL(18,2) NULL,
--    prod_desc_short VARCHAR(255) NULL,
--    prod_desc_full VARCHAR(MAX) NULL,
--    prod_article_num VARCHAR(50) NULL,
--    prod_tags VARCHAR(255) NULL,
--    prod_is_stone BIT NOT NULL,
--    prod_label VARCHAR(100) NULL,
--	  prod_quantity INT NOT NULL DEFAULT 0,

--    CONSTRAINT PK_prod_id PRIMARY KEY (prod_id),
--);

---- Индексирование
--CREATE INDEX idx_prod_name ON Products(prod_name);
--CREATE INDEX idx_prod_cat_id ON Products(prod_cat_id);
--CREATE INDEX idx_prod_price ON Products(prod_price);
--CREATE INDEX idx_prod_article_num ON Products(prod_article_num);

---- Уникальные ограничения
--ALTER TABLE Products
--ADD CONSTRAINT UQ_prod_article_num UNIQUE (prod_article_num);

--ALTER TABLE Products
--ADD CONSTRAINT UQ_prod_name UNIQUE (prod_name);

---- Ограничение на диапазон значений prod_price и prod_price_discount
--ALTER TABLE Products
--ADD CONSTRAINT CK_prod_price CHECK (prod_price >= 0);

--ALTER TABLE Products
--ADD CONSTRAINT CK_prod_price_discounted CHECK (prod_price_discounted >= 0);


-----------USERS-----------

----create table Users
--CREATE TABLE Users (
--    user_id INT IDENTITY(1,1),
--	user_level INT NOT NULL DEFAULT 1, /*-1=guest, 1=not validated, 2=user, 9=admin  */
--	user_email VARCHAR(100) NOT NULL,
--	user_password VARCHAR(100) NOT NULL,
--    user_Fname VARCHAR(100) NOT NULL,
--    user_Lname VARCHAR(100) NOT NULL,
--	user_joindate DATE NOT NULL DEFAULT GETDATE(),
--	user_activationkey VARCHAR(32) NULL, /*for validation in the future*/
--	user_orders varchar(max) NULL,
--	user_address_id INT NULL,

--    CONSTRAINT PK_user_id PRIMARY KEY (user_id),
--);
--GO

---- Создание и вставка уникального значения (user_activationkey)
--IF OBJECT_ID('trgGenerateActivationKey', 'TR') IS NOT NULL
--    DROP TRIGGER trgGenerateActivationKey;
--GO

--CREATE TRIGGER trgGenerateActivationKey
--ON Users
--AFTER INSERT
--AS
--BEGIN
--    SET NOCOUNT ON;

--    -- Проверка, была ли произведена вставка. Если да, идет ее обработка
--    IF EXISTS (SELECT 1 FROM inserted)
--    BEGIN
--    -- Генерация случайного 32-символьного ключа
--    DECLARE @GeneratedKey VARCHAR(32);
--    SELECT @GeneratedKey = SUBSTRING(REPLACE(CONVERT(VARCHAR(36), NEWID()), '-', ''), 1, 32);

--    -- Обновление добавленных строк
--        UPDATE u
--        SET u.user_activationkey = @GeneratedKey
--        FROM Users u
--        INNER JOIN inserted i ON u.user_id = i.user_id;
--    END;
--END;
--GO

----create table UsersAddress
--CREATE TABLE UsersAddress(
--address_id INT IDENTITY(1,1),
--user_id INT NOT NULL,
--user_street VARCHAR(255) NOT NULL,
--user_city VARCHAR(100) NOT NULL,
--user_post_code VARCHAR(100) NOT NULL,
--user_district VARCHAR(100) NULL,
--user_country VARCHAR(100) NOT NULL,

--CONSTRAINT PK_UsersAddress_id PRIMARY KEY (address_id)
--);

----create table ShoppingCarts
--CREATE TABLE ShoppingCarts(
--sc_id int identity(1,1),
--sc_user_id INT NOT NULL,
--sc_prod_id int not null,
--sc_prod_quantity int not null,
--sc_prod_inStock bit not null,

--CONSTRAINT PK_sc_id PRIMARY KEY (sc_id)
--);

----create table Favorites
--CREATE TABLE Favorites (
--    fav_id varchar(32) not null,
--    fav_user_id INT not null,
--    fav_prod_ids varchar(max) null,
    
--	CONSTRAINT PK_fav_id PRIMARY KEY (fav_id)
--);

-------------------------------------------------------------------
---- ВТОРИЧНЫЕ КЛЮЧИ
--ALTER TABLE Products
--ADD CONSTRAINT FK_prod_cat_id FOREIGN KEY (prod_cat_id) REFERENCES Categories(cat_id);

--ALTER TABLE Users
--ADD CONSTRAINT FK_user_address_id FOREIGN KEY (user_address_id) REFERENCES UsersAddress(address_id);

--ALTER TABLE UsersAddress
--ADD CONSTRAINT FK_Users_id FOREIGN KEY (user_id) REFERENCES Users(user_id);

--ALTER TABLE ShoppingCarts
--ADD CONSTRAINT FK_sc_user_id FOREIGN KEY (sc_user_id) REFERENCES Users(user_id);

--ALTER TABLE ShoppingCarts
--ADD CONSTRAINT FK_sc_prod_id FOREIGN KEY (sc_prod_id) REFERENCES Products(prod_id);

--ALTER TABLE Favorites
--ADD CONSTRAINT FK_fav_user_id FOREIGN KEY (fav_user_id) REFERENCES Users(user_id);

-----------------------------------------------------------------------------------------
--ВСТАВКА ЗНАЧЕНИЙ В БД
----insert categories name
--insert into Categories (cat_name)
--values ('Rings'),('Earrings'), ('Necklaces'),('Bracelets'),('Anklets'),('Brooches'),('Pendants'),('Sets')

----insert products
--insert into Products(prod_name, prod_cat_id,prod_price,prod_price_discounted,prod_desc_short,prod_desc_full,prod_article_num,prod_tags,prod_is_stone,prod_label,prod_quantity)
--values('Clara', 1,4998,4248,'Diamantring i 375 hvitt gull 0,11 ct',
--'Clara diamantring i 375 hvitt gull med 50 skinnende diamanter i ulike størrelser som samlet er 0,11 ct W. Dette er en tidløs ring som er fin alene men også i kombinasjon med flere smykker i hvitt gull. Dekorasjonen på ringen er 7 mm i diameter og skaper et flott blikkfang.',
--'59079', 'white gold', 1,'15%',20)

--insert into Products(prod_name, prod_cat_id,prod_price,prod_desc_short,prod_desc_full,prod_article_num,prod_tags,prod_is_stone,prod_label,prod_quantity)
--values('Nora', 1,3499,'Diamantring i 375 gult gull 0,09 ct',
--'Klassisk diamantring i 375 (9 karat) gult gull med tre skinnende diamanter på totalt 0,09 ct. To av diamantene er 0,025 ct og den midterste diamanten er 0,04 ct. Diamantene har 16/16 slip med brilliant form som betyr at det er 16 fasetter på overdelen og 16 fasetter på underdelen. Ringen finnes også i hvitt gull og er en av våre bestselgere blant konfirmasjonsgaver til henne. Dette er en tidløs og vakker ring. Ringen er 2 mm bred og er fin i kombinasjon med flere ringer.',
--'56471', 'gold', 1,'new',10)

----insert default user "admin"
--insert into Users (user_level,user_email,user_password,user_Fname,user_Lname)
--values(9,'admin','admin','admin','admin');

--------------------------------------------------------------------------------------------------------
--TEST QUERIES
--test to get items in ShoppingCart
--select P.ID, P.Name, P.Image, P.ActualPrice, P.DiscountedPrice from ShoppingCart C
--INNER JOIN Images P
--ON C.ProductID = P.Id;

--test to get categories+labels
select cat_name from Categories
union all
select prod_label from Products

--test to get products by category/label
SELECT p.*, c.cat_name 
FROM Products p
INNER JOIN 
Categories c ON p.cat_id = c.cat_id
WHERE c.cat_name = 'new' or p.prod_label = 'new';

-------------------------------------------------------------------------------------------

--delete from ShoppingCart where ProductID = 6

--ALTER TABLE Products
--DROP COLUMN prod_size;

--ALTER TABLE Products
--ADD prod_quantity INT NOT NULL DEFAULT 0;

select * from Products
select * from Users
select * from ShoppingCart
select * from ShoppingCarts
select * from Categories
select * from Favorites
select * from Images
select * from UsersAddress

drop table Users

---------------------------------------------------------------------------------

