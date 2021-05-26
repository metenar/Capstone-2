
const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /books */

describe("POST /books/add", function () {
  const newBook = {
        id: "b4",
        name: "B4",
        author: "A4",
        cover: "http://B4.img",
        page_count: 4,
        publisher: "P4",
        published_date: '2011-02-04',
        description: "Desc4",
        categories: "C4"
  };

  test("ok for loggedin", async function () {
    const resp = await request(app)
        .post("/books/add")
        .send(newBook)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
        name: "B4",
        author: "A4",
        cover: "http://B4.img",
        totalpages: 4,
        publisher: "P4",
        published_date: '2011-02-04',
        description: "Desc4",
        categories: "C4"
    });
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/books")
        .send({
          id: "new",
          name: "neww",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/books")
        .send({
          ...newBook,
          author: 5,
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** GET /books */

describe("GET /books", function () {
  test("ok for logged in", async function () {
    const resp = await request(app)
        .get("/books/b1")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({      
            book:{
                id:"b1",
                name: "B1",
                author: "A1",
                cover: "http://B1.img",
                page_count: 1,
                publisher: "P1",
                published_date: '2011-02-01',
                description: "Desc1",
                categories: "C1"
            }
        });
  });

});

/************************************** DELETE /books/:id */

describe("DELETE /books/:id", function () {
  test("works for logged in", async function () {
    const resp = await request(app)
        .delete(`/books/b1`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ deleted: "b1" });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .delete(`/books/b1`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such book", async function () {
    const resp = await request(app)
        .delete(`/books/nope`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});
