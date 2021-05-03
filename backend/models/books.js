const db = require("../db");
const { NotFoundError } = require("../expressError");


/** Related functions for books. */

class Books {

  /** Add book with data.
   *
   * Returns { name, author, cover }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async add(
      { id, name, author, cover }) {

    const result = await db.query(
          `INSERT INTO books
           (id,
            name,
            author,
            cover)
           VALUES ($1, $2, $3, $4)
           RETURNING name, author, cover `,
        [
          id,
          name,
          author,
          cover,
        ],
    );

    const book = result.rows[0];

    return book;
  }

  /** Given a id, return data about book.
   *
   * Returns { name, author, cover}
   *
   * Throws NotFoundError if book is not found.
   **/

  static async get(id) {
    const bookRes = await db.query(
          `SELECT id,
                  name,
                  author,
                  cover
           FROM books
           WHERE id = $1`,
        [id]
    );

    const book = bookRes.rows[0];

    if (!book) throw new NotFoundError(`No book: ${id}`);

    return book;
  }

  /** Delete book using id from database; returns undefined. */
  static async remove(id) {
    let result = await db.query(
          `DELETE
           FROM books
           WHERE id = $1
           RETURNING id`,
        [id],
    );
    const book = result.rows[0];

    if (!book) throw new NotFoundError(`No book: ${id}`);
  }
}


module.exports = Books;
