CREATE DATABASE 'trello-clone-back';
CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    state character varying(50) NOT NULL CHECK(state in 
    ('todo', 'inprogress', 'done', 'blocked')),
    title character varying(100) NOT NULL,
    content text NOT NULL,
);