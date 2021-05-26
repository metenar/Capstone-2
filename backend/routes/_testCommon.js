"use strict";

const db = require("../db.js");
const User = require("../models/users");
const Books = require("../models/books");
const MyBooks = require("../models/MyBooks");
const { createToken } = require("../helpers/tokens");

const testJobIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM my_books");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM books");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await Books.add(
      {
        id: "b1",
        name: "B1",
        author: "A1",
        cover: "http://B1.img",
        page_count: 1,
        publisher: "P1",
        published_date: '2011-02-01',
        description: "Desc1",
        categories: "C1"
      });
  await Books.add(
      {
        id: "b2",
        name: "B2",
        author: "A2",
        cover: "http://B2.img",
        page_count: 2,
        publisher: "P2",
        published_date: '2011-02-02',
        description: "Desc2",
        categories: "C2"
      });
  await Books.add(
      {
        id: "b3",
        name: "B3",
        author: "A3",
        cover: "http://B3.img",
        page_count: 3,
        publisher: "P3",
        published_date: '2011-02-03',
        description: "Desc3",
        categories: "C3"
      });

  await User.register({
    username: "u1",
    first_name: "U1F",
    last_name: "U1L",
    email: "user1@user.com",
    password: "password1",
    image: 'http://u1.img'
  });
  await User.register({
    username: "u2",
    first_name: "U2F",
    last_name: "U2L",
    email: "user2@user.com",
    password: "password2",
    image: 'http://u2.img'
  });

  await MyBooks.add({
    book_id: "b1",
    current_status: "reading",
    rating: 5,
    finished_date: null,
    progress: "25"
  },"u1");

  await MyBooks.add({
    book_id: "b1",
    current_status: "finished",
    rating: 5,
    finished_date: '2011-11-02',
    progress: "100"
  },"u2")
};
async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


const u1Token = createToken({ username: "u1"});
const u2Token = createToken({ username: "u2"});


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
};
