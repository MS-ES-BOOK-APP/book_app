

-- CREATE TABLE books
-- id as the primary key
-- author VARCHAR(255),
-- title VARCHAR(255),
-- isbn
-- image_url
-- description
-- bookshelf

-- CREATE DATABASE books_app;
-- \l -- list all DB
-- \c -- connects to named db.
-- \c books_app;

-- CREATE TABLE books (
--     id SERIAL PRIMARY KEY,
--     author VARCHAR(255),
--     title VARCHAR(255),
--     isbn VARCHAR(255),
--     image_url VARCHAR(2083),
--     description VARCHAR(255),
--     bookshelf VARCHAR(255)
-- );


-- \-- List columns in all tables whose name is like 'TableName'
-- SELECT 
--     TableName = tbl.TABLE_SCHEMA + '.' + tbl.TABLE_NAME, 
--     ColumnName = col.COLUMN_NAME, 
--     ColumnDataType = col.DATA_TYPE
-- FROM INFORMATION_SCHEMA.TABLES tbl
-- INNER JOIN INFORMATION_SCHEMA.COLUMNS col 
--     ON col.TABLE_NAME = tbl.TABLE_NAME
--     AND col.TABLE_SCHEMA = tbl.TABLE_SCHEMA

-- WHERE tbl.TABLE_TYPE = 'BASE TABLE' and tbl.TABLE_NAME like '%TableName%'
-- GO

