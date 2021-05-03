const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError
} = require("../expressError");

/** Related functions for MyBooks. */

class MyBooks {

  /** Add book with data to MyBooks.
   *
   * Returns { book_id, status, rating, finished_date, progress }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async add(
      { username, book_id, status, rating, finished_date, progress }) {
        const userCheck=await db.query(
          `SELECT username FROM users
          WHERE username=$1`,[username]);
        const user=userCheck.rows[0];
        if (!user) throw new NotFoundError(`No such user with username: ${username}`);
      const result = await db.query(
          `INSERT INTO my_books
            (username,
            book_id,
            current_status,
            rating,
            finished_date,
            progress)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING book_id, current_status AS status, rating, finished_date, progress `,
        [
            username,
            book_id,
            status,
            rating,
            finished_date,
            progress
        ],
      );

      const MyBook = result.rows[0];

      return MyBook;
  }

  /** Given a username, return data about Mybook.
   *
   * Returns { username, author, cover, status, rating, finished_date, progress}
   *
   * Throws NotFoundError if book is not found.
   **/

  static async get(username) {
    const MyBookRes = await db.query(
          `SELECT m.book_id,
                  m.username,
                  b.author,
                  b.cover,
                  m.status,
                  m.rating,
                  m.finished_date,
                  m.progress
           FROM my_books AS m JOIN books AS b ON m.book_id=b.id
           WHERE m.username = $1`,
        [username]
    );

    const MyBook = MyBookRes.rows[0];

    if (!MyBook) throw new NotFoundError(`No MyBook: ${username}`);

    return MyBook;
  }

  /** Update my_book data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { status, rating, finished_date, progress }
   *
   * Returns { book_id, status, rating, finished_date, progress }
   *
   * Throws NotFoundError if not found.
   *
   */

   static async update(book_id, data) {

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          status: "status",
          rating: "rating",
          finished_date: "finished_date",
          progress: "progress",
        });
    const book_idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE my_books 
                      SET ${setCols} 
                      WHERE book_id = ${book_idVarIdx} 
                      RETURNING book_id,
                                status,
                                rating,
                                finished_date,
                                progress`;
    const result = await db.query(querySql, [...values, book_id]);
    const MyBook = result.rows[0];

    if (!MyBook) throw new NotFoundError(`No book: ${book_id}`);
    return MyBook;
  }

  /** Delete book using book_id from MyBook table; returns undefined. */
  static async remove(book_id) {
    let result = await db.query(
          `DELETE
           FROM my_books
           WHERE book_id = $1
           RETURNING book_id`,
        [book_id],
    );
    const MyBook = result.rows[0];

    if (!MyBook) throw new NotFoundError(`No MyBook: ${book_id}`);
  }
}


module.exports = MyBooks;
