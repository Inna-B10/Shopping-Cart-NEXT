CREATE DATABASE ShopDb
COLLATE Norwegian_100_CI_AI_SC_UTF8;
use ShopDb

--Create table Categories
CREATE TABLE Categories (
  cat_id INT IDENTITY(1,1),
  cat_name NVARCHAR(255) NOT NULL,

  CONSTRAINT PK_cat_id PRIMARY KEY (cat_id),
  CONSTRAINT UQ_cat_name UNIQUE (cat_name)
);

--create table Products
CREATE TABLE Products (
    prod_id INT IDENTITY(1,1),
    prod_name NVARCHAR(255) NOT NULL,
    prod_cat_id INT NOT NULL,
    prod_price DECIMAL(18,2) NOT NULL CHECK (prod_price >= 0),
    prod_price_discounted DECIMAL(18,2) NULL CHECK (prod_price_discounted >= 0),
    prod_desc_short NVARCHAR(255) NULL,
    prod_desc_full NVARCHAR(MAX) NULL,
    prod_article_num NVARCHAR(50) NULL,
    prod_tags NVARCHAR(255) NULL,
    prod_is_stone BIT NOT NULL,
    prod_label NVARCHAR(100) NULL,
	prod_quantity INT NOT NULL DEFAULT 0,

    CONSTRAINT PK_prod_id PRIMARY KEY (prod_id),
    CONSTRAINT UQ_prod_article_num UNIQUE (prod_article_num),
    CONSTRAINT UQ_prod_name UNIQUE (prod_name)
);

-- Indexes for Products
CREATE INDEX idx_prod_name ON Products(prod_name);
CREATE INDEX idx_prod_cat_id ON Products(prod_cat_id);
CREATE INDEX idx_prod_price ON Products(prod_price);
CREATE INDEX idx_prod_article_num ON Products(prod_article_num);
CREATE INDEX idx_prod_label ON Products(prod_label);
CREATE INDEX idx_prod_is_stone ON Products(prod_is_stone);
CREATE INDEX idx_prod_tags ON Products(prod_tags);


---------USERS-----------

--create table Users
CREATE TABLE Users (
  user_id INT IDENTITY(1,1),
	user_level INT NOT NULL DEFAULT 0, /*-1=guest, 0=not validated, 1=user, 9=admin  */
	user_email NVARCHAR(100) NOT NULL,
	user_password NVARCHAR(100) NOT NULL,
    user_Fname NVARCHAR(100) NOT NULL,
    user_Lname NVARCHAR(100) NOT NULL,
	user_joindate DATE NOT NULL DEFAULT GETDATE(),
	user_activationkey NVARCHAR(32) NULL, /*for validation in the future*/
	user_address_id INT NULL,
	
    CONSTRAINT PK_user_id PRIMARY KEY (user_id),
	CONSTRAINT UQ_user_email UNIQUE (user_email)
);
GO

 --Trigger for generating activation key
IF OBJECT_ID('trgGenerateActivationKey', 'TR') IS NOT NULL
    DROP TRIGGER trgGenerateActivationKey;
GO

CREATE TRIGGER trgGenerateActivationKey
ON Users
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

     --Check if an insert occurred and process it
    IF EXISTS (SELECT 1 FROM inserted)
    BEGIN
     --Generate a random 32-character key
    DECLARE @GeneratedKey NVARCHAR(32);
    SELECT @GeneratedKey = SUBSTRING(REPLACE(CONVERT(NVARCHAR(36), NEWID()), '-', ''), 1, 32);

     --Update inserted rows
        UPDATE u
        SET u.user_activationkey = @GeneratedKey
        FROM Users u
        INNER JOIN inserted i ON u.user_id = i.user_id;
    END;
END;
GO

 --Indexes for Users
CREATE INDEX idx_user_email ON Users(user_email);
CREATE INDEX idx_user_phone ON Users(user_phone);


--create table UsersAddress
CREATE TABLE UsersAddress(
address_id INT IDENTITY(1,1),
address_user_id INT NOT NULL,
address_street NVARCHAR(255) NOT NULL,
address_city NVARCHAR(100) NOT NULL,
address_post_code NVARCHAR(20) NOT NULL,
address_district NVARCHAR(100) NULL,
address_country NVARCHAR(100) NOT NULL,
address_phone NVARCHAR(15) NULL,

CONSTRAINT PK_UsersAddress_id PRIMARY KEY (address_id)
);

 --Indexes for UsersAddress
CREATE INDEX idx_address_user_id ON UsersAddress(address_user_id);
CREATE INDEX idx_address_phone ON UsersAddress(address_phone);

--create table ShoppingCarts
CREATE TABLE ShoppingCarts(
sc_id int identity(1,1),
sc_user_id INT NOT NULL,
sc_prod_id int not null,
sc_prod_quantity int not null DEFAULT 1,

CONSTRAINT PK_sc_id PRIMARY KEY (sc_id)
);

--Indexes for ShoppingCarts
CREATE INDEX idx_sc_user_id ON ShoppingCarts(sc_user_id);
CREATE INDEX idx_sc_prod_id ON ShoppingCarts(sc_prod_id);

--create table Favorites
CREATE TABLE Favorites (
    fav_id varchar(32) not null,
    fav_user_id INT not null,
    fav_prod_id INT not null,
    
	CONSTRAINT PK_fav_id PRIMARY KEY (fav_id)
);

--Indexes for Favorites
CREATE INDEX idx_fav_user_id ON Favorites(fav_user_id);
CREATE INDEX idx_fav_prod_id ON Favorites(fav_prod_id);

-----------------------------------------------------------------
-- ВТОРИЧНЫЕ КЛЮЧИ
ALTER TABLE Products
ADD CONSTRAINT FK_prod_cat_id FOREIGN KEY (prod_cat_id) REFERENCES Categories(cat_id);

ALTER TABLE UsersAddress
ADD CONSTRAINT FK_UsersAddress_user_id FOREIGN KEY (address_user_id) REFERENCES Users(user_id);

ALTER TABLE ShoppingCarts
ADD CONSTRAINT FK_sc_user_id FOREIGN KEY (sc_user_id) REFERENCES Users(user_id);

ALTER TABLE ShoppingCarts
ADD CONSTRAINT FK_sc_prod_id FOREIGN KEY (sc_prod_id) REFERENCES Products(prod_id);

ALTER TABLE Favorites
ADD CONSTRAINT FK_fav_user_id FOREIGN KEY (fav_user_id) REFERENCES Users(user_id);

ALTER TABLE Favorites
ADD CONSTRAINT FK_fav_prod_id FOREIGN KEY (fav_prod_id) REFERENCES Products(prod_id);

---------------------------------------------------------------------------------------
--ВСТАВКА ЗНАЧЕНИЙ В БД
--insert categories name
insert into Categories (cat_name)
values ('Rings'),('Earrings'), ('Necklaces'),('Bracelets'),('Anklets'),('Brooches'),('Pendants'),('Sets');

--insert products
insert into Products(prod_name, prod_cat_id,prod_price,prod_price_discounted,prod_desc_short,prod_desc_full,prod_article_num,prod_tags,prod_is_stone,prod_label,prod_quantity)
values('Clara', 1,4998,4248,'Diamantring i 375 hvitt gull 0,11 ct',
'Clara diamantring i 375 hvitt gull med 50 skinnende diamanter i ulike størrelser som samlet er 0,11 ct W. Dette er en tidløs ring som er fin alene men også i kombinasjon med flere smykker i hvitt gull. Dekorasjonen på ringen er 7 mm i diameter og skaper et flott blikkfang.',
'59079', 'white gold', 1,'15%',20);

insert into Products(prod_name, prod_cat_id,prod_price,prod_desc_short,prod_desc_full,prod_article_num,prod_tags,prod_is_stone,prod_label,prod_quantity)
values('Nora', 1,3499,'Diamantring i 375 gult gull 0,09 ct',
'Klassisk diamantring i 375 (9 karat) gult gull med tre skinnende diamanter på totalt 0,09 ct. To av diamantene er 0,025 ct og den midterste diamanten er 0,04 ct. Diamantene har 16/16 slip med brilliant form som betyr at det er 16 fasetter på overdelen og 16 fasetter på underdelen. Ringen finnes også i hvitt gull og er en av våre bestselgere blant konfirmasjonsgaver til henne. Dette er en tidløs og vakker ring. Ringen er 2 mm bred og er fin i kombinasjon med flere ringer.',
'56471', 'gold', 1,'new',10);

--insert default user "admin"
insert into Users (user_level,user_email,user_password,user_Fname,user_Lname)
values(9,'admin','admin','admin','admin');

------------------------------------------------------------------------------------------------------
--TEST QUERIES

--test to get categories+labels
select cat_name from Categories
union all
select prod_label from Products

--test to get products by category/label
SELECT p.*, c.cat_name 
FROM Products p
INNER JOIN 
Categories c ON p.prod_cat_id = c.cat_id
WHERE c.cat_name = 'new' or p.prod_label = 'new';

--test to add item to ShoppingCarts
insert into ShoppingCarts(sc_user_id,sc_prod_id)
values(1,1);

--test to get items from ShoppingCarts whis user_id
select p.*, sc.sc_prod_quantity 
from Products p
inner join
ShoppingCarts sc on p.prod_id = sc.sc_prod_id
where sc.sc_user_id = 1

-----------------------------------------------------------------------------------------


ALTER TABLE Products
DROP COLUMN prod_size;

ALTER TABLE Products
ADD prod_quantity INT NOT NULL DEFAULT 0;

select * from Products
select * from Users
select * from ShoppingCarts
select * from Categories
select * from Favorites
select * from UsersAddress

drop table Users

delete from Users where user_id>2

SELECT * FROM Products WHERE prod_id IN (2,1)

SELECT p.*, c.cat_name FROM Products p INNER JOIN Categories c ON p.prod_cat_id = c.cat_id WHERE c.cat_name = "Silver-earrings";

-------------------------------------------------------------------------------

ALTER TABLE Products
DROP CONSTRAINT FK_prod_cat_id;

ALTER TABLE UsersAddress
DROP CONSTRAINT FK_UsersAddress_user_id;

ALTER TABLE ShoppingCarts
DROP CONSTRAINT FK_sc_user_id;

ALTER TABLE ShoppingCarts
DROP CONSTRAINT FK_sc_prod_id;

ALTER TABLE Favorites
DROP CONSTRAINT FK_fav_user_id;

ALTER TABLE Favorites
DROP CONSTRAINT FK_fav_prod_id;