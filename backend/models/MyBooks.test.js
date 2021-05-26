
const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const MyBooks = require("./MyBooks.js");
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
    book_id: "b1",
    current_status: "reading",
    rating: "5.0",
    finished_date: "2021-05-05",
    progress: "15.00"
  };

  test("works", async function () {
    let myBook = await MyBooks.add(newBook,"u1");
    expect(myBook).toEqual({
        book_id: "b1",
        status: "reading",
        rating: "5.0",
        finished_date: "2021-05-05",
        progress: "15.00"
    });
  });
});

/************************************** getByusername */

describe("getByusername", function () {
  test("works: by username", async function () {
    let book = await MyBooks.get("u1");
    expect(book).toEqual([
      {
        book_id: "b1",
        name: "B1",
        author: "A1",
        cover: "http://B1.img",
        description: "Desc1",
        categories: "C1",
        current_status:"reading",
        rating:"5.0",
        finished_date:null,
        progress:"25.00"
      }]);
  });
});

/************************************** getBybook_id */

describe("getBybook_id", function () {
    test("works: by book_id", async function () {
      let book = await MyBooks.getByBookId("b1","u1");
      expect(book).toEqual(
        {
          book_id: "b1",
        });
    });
  });

  /************************************** getByStatus */
  
  describe("getByStatus", function () {
    test("works: by Status", async function () {
      let book = await MyBooks.getStatus("reading","u1");
      expect(book).toEqual([
        {
            book_id: "b1",
            name:"B1",
            author:"A1",
            cover:"http://B1.img",
            page_count:1,
            description: "Desc1",
            categories: "C1",
            rating:"5.0",
            finished_date:null,
            progress:"25.00"

        }]);
    });
  });

/************************************** update */
  
describe("update my_book", function () {
    test("update:", async function () {
        const data={
            progress:"30"
        }
      let book = await MyBooks.update("b1","u1",data);
      expect(book).toEqual(
        {
            book_id: "b1",
            current_status: "reading",
            rating:"5.0",
            finished_date:null,
            progress:"30.00"

        });
    });
  });

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await MyBooks.remove("b1","u1");
    const res = await db.query(
        "SELECT book_id FROM my_books WHERE book_id='b1' AND username='u1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such book", async function () {
    try {
      await MyBooks.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
