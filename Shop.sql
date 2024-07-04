--create database ShopDb
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
-----------------------------------------------------------------


--изменение кодировки БД на utf8

--ALTER DATABASE ShopDb
--COLLATE Latin1_General_100_CI_AS_SC_UTF8;

--изменение кодировки столбца на utf8
--ALTER TABLE Categories
--ALTER COLUMN cat_name VARCHAR(255) COLLATE Latin1_General_100_CI_AS_SC_UTF8;

--проверка кодировки таблицы
--SELECT 
--    TABLE_NAME, 
--    COLUMN_NAME, 
--    COLLATION_NAME 
--FROM 
--    INFORMATION_SCHEMA.COLUMNS 
--WHERE 
--    TABLE_NAME = 'Categories';



--CREATE TABLE Categories (
--    cat_id INT IDENTITY(1,1),
--    cat_name VARCHAR(255) NOT NULL,
--	constraint PK_cat_id PRIMARY KEY (cat_id)
--);

--ALTER TABLE Categories
--ADD CONSTRAINT UQ_cat_name UNIQUE (cat_name);

--insert into Categories (cat_name)
--values ('Earrings'), ('Necklaces'),('Bracelets'),('Anklets'),('Brooches'),('Pendants'),('Sets')


CREATE TABLE Products (
    prod_id INT IDENTITY(1,1),
    prod_name VARCHAR(255) NOT NULL,
    cat_id INT NOT NULL,
    prod_price DECIMAL(18,2) NOT NULL,
    prod_price_discounted DECIMAL(18,2) NULL,
    prod_desc_short VARCHAR(255) NULL,
    prod_desc_full VARCHAR(MAX) NULL,
    prod_article_num VARCHAR(50) NULL,
    prod_tags VARCHAR(255) NULL,
    prod_is_stone BIT NOT NULL,
    prod_label VARCHAR(100) NULL,
    CONSTRAINT PK_prod_id PRIMARY KEY (prod_id),
    CONSTRAINT FK_prod_cat_id FOREIGN KEY (cat_id) REFERENCES Categories(cat_id)
);

-- Индексирование
--CREATE INDEX idx_prod_name ON Products(prod_name);
--CREATE INDEX idx_cat_id ON Products(cat_id);
--CREATE INDEX idx_prod_price ON Products(prod_price);
--CREATE INDEX idx_prod_article_num ON Products(prod_article_num);

-- Уникальные ограничения
--ALTER TABLE Products
--ADD CONSTRAINT UQ_prod_article_num UNIQUE (prod_article_num);

--ALTER TABLE Products
--ADD CONSTRAINT UQ_prod_name UNIQUE (prod_name);

-- Ограничение на диапазон значений prod_price и prod_price_discount
--ALTER TABLE Products
--ADD CONSTRAINT CK_prod_price CHECK (prod_price >= 0);

--ALTER TABLE Products
--ADD CONSTRAINT CK_prod_price_discounted CHECK (prod_price_discounted >= 0);

--составление меню категорий
--select cat_name from Categories
--union all
--select prod_label from Products

use ShopDb

insert into Products(prod_name, cat_id,prod_price,prod_price_discounted,prod_desc_short,prod_desc_full,prod_article_num,prod_tags,prod_is_stone,prod_label)
values('Clara', 1,4998,4248,'Diamantring i 375 hvitt gull 0,11 ct',
'Clara diamantring i 375 hvitt gull med 50 skinnende diamanter i ulike størrelser som samlet er 0,11 ct W. Dette er en tidløs ring som er fin alene men også i kombinasjon med flere smykker i hvitt gull. Dekorasjonen på ringen er 7 mm i diameter og skaper et flott blikkfang.',
'59079', 'white gold', 1,'15%')

insert into Products(prod_name, cat_id,prod_price,prod_desc_short,prod_desc_full,prod_article_num,prod_tags,prod_is_stone,prod_label)
values('Nora', 1,3499,'Diamantring i 375 gult gull 0,09 ct',
'Klassisk diamantring i 375 (9 karat) gult gull med tre skinnende diamanter på totalt 0,09 ct. To av diamantene er 0,025 ct og den midterste diamanten er 0,04 ct. Diamantene har 16/16 slip med brilliant form som betyr at det er 16 fasetter på overdelen og 16 fasetter på underdelen. Ringen finnes også i hvitt gull og er en av våre bestselgere blant konfirmasjonsgaver til henne. Dette er en tidløs og vakker ring. Ringen er 2 mm bred og er fin i kombinasjon med flere ringer.',
'56471', 'gold', 1,'new')

insert into Products(prod_name, cat_id,prod_price,prod_desc_short,prod_desc_full,prod_article_num,prod_tags,prod_is_stone,prod_label)
values('Nora', 1,3499,'Diamantring i 375 gult gull 0,09 ct',
'Klassisk diamantring i 375 (9 karat) gult gull med tre skinnende diamanter på totalt 0,09 ct. To av diamantene er 0,025 ct og den midterste diamanten er 0,04 ct. Diamantene har 16/16 slip med brilliant form som betyr at det er 16 fasetter på overdelen og 16 fasetter på underdelen. Ringen finnes også i hvitt gull og er en av våre bestselgere blant konfirmasjonsgaver til henne. Dette er en tidløs og vakker ring. Ringen er 2 mm bred og er fin i kombinasjon med flere ringer.',
'56471', 'gold', 1,'new')

SELECT p.*, c.cat_name 
FROM Products p
INNER JOIN 
Categories c ON p.cat_id = c.cat_id
WHERE p.cat_id = 1;











select P.ID, P.Name, P.Image, P.ActualPrice, P.DiscountedPrice from ShoppingCart C
INNER JOIN Images P
ON C.ProductID = P.Id;

--delete from ShoppingCart where ProductID = 6

--ALTER TABLE Products
--DROP COLUMN prod_size;



select * from Products
select * from Categories
select * from ShoppingCart

drop table Products