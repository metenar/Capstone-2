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
   * Throws NotFoundError if no such user.
   **/

  static async add(
      { book_id, current_status, rating, finished_date, progress },username) {
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
            current_status,
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
   * Returns { author, cover, current_status, rating, finished_date, progress}
   *
   * Throws NotFoundError if book is not found.
   **/

  static async get(username) {
    const MyBookRes = await db.query(
          `SELECT m.book_id,
                  b.name,
                  b.author,
                  b.cover,
                  m.current_status,
                  m.rating,
                  m.finished_date,
                  m.progress
           FROM my_books AS m JOIN books AS b ON m.book_id=b.id
           WHERE m.username = $1 ORDER BY m.current_status`,
        [username]
    );

    const MyBooks = MyBookRes.rows;

    if (!MyBooks) throw new NotFoundError(`No MyBook: ${username}`);

    return MyBooks;
  }
  /** Given a status, return data about Mybook.
   *
   * Returns { author, cover, rating, finished_date, progress}
   *
   * Throws NotFoundError if book is not found.
   **/
  static async getStatus(current_status,username) {
    const MyBookRes = await db.query(
          `SELECT m.book_id,
                  b.name,
                  b.author,
                  b.cover,
                  b.page_count,
                  m.rating,
                  m.finished_date,
                  m.progress
           FROM my_books AS m JOIN books AS b ON m.book_id=b.id
           WHERE m.username = $1 AND m.current_status = $2`,
        [username, current_status]
    );

    const MyBooks = MyBookRes.rows;

    if (!MyBooks) throw new NotFoundError(`No MyBook: ${username}`);

    return MyBooks;
  }

  /** Update my_book data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { current_status, rating, finished_date, progress }
   *
   * Returns { book_id, status, rating, finished_date, progress }
   *
   * Throws NotFoundError if not found.
   *
   */

   static async update(book_id, username,data) {
     console.log(username)

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          current_status: "current_status",
          rating: "rating",
          finished_date: "finished_date",
          progress: "progress",
        });
    const book_idVarIdx = "$" + (values.length + 1);
    const usernameIdx="$" + (values.length+2);

    const querySql = `UPDATE my_books 
                      SET ${setCols} 
                      WHERE book_id = ${book_idVarIdx} AND username=${usernameIdx}
                      RETURNING book_id,
                                current_status,
                                rating,
                                finished_date,
                                progress`;
    const result = await db.query(querySql, [...values, book_id,username]);
    const MyBook = result.rows[0];

    if (!MyBook) throw new NotFoundError(`No book: ${book_id}`);
    return MyBook;
  }

  /** Delete book using book_id from MyBook table; returns undefined. */
  static async remove(book_id,username) {
    let result = await db.query(
          `DELETE
           FROM my_books
           WHERE book_id = $1 AND username=$2
           RETURNING book_id`,
        [book_id,username],
    );
    const MyBook = result.rows[0];

    if (!MyBook) throw new NotFoundError(`No MyBook: ${book_id}`);
  }
}


module.exports = MyBooks;
