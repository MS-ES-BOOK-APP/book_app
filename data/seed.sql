-- CREATE DATABASE books_app;

-- CREATE TABLE books (
--     id SERIAL PRIMARY KEY,
--     author VARCHAR(255),
--     title VARCHAR(255),
--     isbn VARCHAR(255),
--     image_url VARCHAR(2083),
--     description VARCHAR(255),
--     bookshelf VARCHAR(255)
-- );


INSERT INTO books 
    (author, title, isbn, image_url, description, bookshelf) 
VALUES 
    ('Mark Wahlberg', 
    'Man Book', 
    '123456789', 
    'https://m.media-amazon.com/images/M/MV5BMTc0NDQzNTA2Ml5BMl5BanBnXkFtZTcwNzI2OTQzMw@@._V1_.jpg',
    'this is a book about crime.', 
    '1A'),

    ('Bob Ross', 
    'Painting for a Living', 
    '111111111', 
    'https://www.biography.com/.image/t_share/MTIwNjA4NjMzOTU5NTgxMTk2/bob-ross-9464216-1-402.jpg',
    'this is a book about painting skillfully with smelly crayons', 
    '1B')
RETURNING * ;

-- HOW TO INTIIATE .SQL FILE WHEN NOT LOGGED INTO PSQL AND IN ROOT DIRECTORY OF PROJECT.
-- psql books_app -f books.sql -d books_app;

-- HOW TO INITIATE A .SQL FILE WHEN ALREADY IN DIRECTORY
-- -f books.sql -d books_app;