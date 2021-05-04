--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.status AS ENUM (
    'Finished',
    'Reading',
    'Want to Read'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: books; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.books (
    id integer NOT NULL,
    name text NOT NULL,
    author text NOT NULL,
    cover text,
    page_count integer
);


--
-- Name: my_books; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.my_books (
    id integer NOT NULL,
    username text NOT NULL,
    book_id integer NOT NULL,
    current_status public.status,
    rating text,
    finished_date text,
    progress integer
);


--
-- Name: my_books_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.my_books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: my_books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.my_books_id_seq OWNED BY public.my_books.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    username character varying(25) NOT NULL,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    image text DEFAULT 'anonim.jpg'::text NOT NULL,
    CONSTRAINT users_email_check CHECK (("position"(email, '@'::text) > 1))
);


--
-- Name: my_books id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.my_books ALTER COLUMN id SET DEFAULT nextval('public.my_books_id_seq'::regclass);


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.books (id, name, author, cover, page_count) FROM stdin;
1234	Toprak	Buket Uzuner	harika.jpg	145
1235	Su	Buket Uzuner	harika su.jpg	165
\.


--
-- Data for Name: my_books; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.my_books (id, username, book_id, current_status, rating, finished_date, progress) FROM stdin;
6	metenar	1235	Reading	5	\N	40
7	metenar	1234	\N	5	2020-12-03	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (username, password, first_name, last_name, email, image) FROM stdin;
metenar	$2b$12$mcjGWQqNV6ps45V.3tK8TenARoyD/8FHYtudmRUOu9kRM5AfYN7Zi	Metem	NAR	metenar@gmail.com	default.jpg
\.


--
-- Name: my_books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.my_books_id_seq', 7, true);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: my_books my_books_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.my_books
    ADD CONSTRAINT my_books_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- Name: my_books my_books_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.my_books
    ADD CONSTRAINT my_books_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- Name: my_books my_books_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.my_books
    ADD CONSTRAINT my_books_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

