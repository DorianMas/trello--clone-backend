CREATE DATABASE 'trello-clone-back';
CREATE TABLE IF NOT EXISTS tasks(
    state character varying(50) NOT NULL CHECK(state in 
    ('todo', 'inprogress', 'done', 'blocked') ),
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    content text ,
    index integer,
    CONSTRAINT tasks_pkey PRIMARY KEY (id)
);