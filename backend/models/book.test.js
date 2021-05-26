"use strict";
const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Books = require("./books.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** add */

describe("add", function () {
  const newBook = {
    id: "book1",
    name: "New Book",
    author: "New Author",
    cover: "http://new.img",
    page_count:145,
    publisher: "New Publisher",
    published_date: "2021-05-05",
    description: "New Description",
    categories: "New Categories"
  };

  test("works", async function () {
    let book = await Books.add(newBook);
    expect(book).toEqual({
        name: "New Book",
        author: "New Author",
        cover: "http://new.img",
        totalpages:145,
        publisher: "New Publisher",
        published_date: "2021-05-05",
        description: "New Description",
        categories: "New Categories"
    });

    const result = await db.query(
          `SELECT id, name, author, cover, page_count
           FROM books
           WHERE id = 'book1'`);
    expect(result.rows).toEqual([
      {
        id: "book1",
        name: "New Book",
        author: "New Author",
        cover: "http://new.img",
        page_count: 145
      }
    ]);
  });

});

/************************************** getById */

describe("getById", function () {
  test("works: byId", async function () {
    let book = await Books.get("b1");
    expect(book).toEqual(
      {
        id: "b1",
        name: "B1",
        author: "A1",
        cover: "http://B1.img",
        page_count: 1,
        publisher: "P1",
        published_date: "2011-02-01",
        description: "Desc1",
        categories: "C1"
      });
  });
});
/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Books.remove("b1");
    const res = await db.query(
        "SELECT id FROM books WHERE id='b1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such book", async function () {
    try {
      await Books.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

