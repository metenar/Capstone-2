const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");


async function commonBeforeAll() {
    // noinspection SqlWithoutWhere
    await db.query("DELETE FROM my_books");
    // noinspection SqlWithoutWhere
    await db.query("DELETE FROM books");
    // noinspection SqlWithoutWhere
    await db.query("DELETE FROM users");
    
    await db.query(`
        INSERT INTO users(username,
            password,
            first_name,
            last_name,
            email,
            image)
            VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com', 'http://u1.img'),
            ('u2', $2, 'U2F', 'U2L', 'u2@email.com', 'http://u2.img')`,
            [
                await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
                await bcrypt.hash("password2", BCRYPT_WORK_FACTOR)
            ]);

    await db.query(`
    INSERT INTO books(id, name, author, cover, page_count,
        publisher, published_date, description, categories)
        VALUES ('b1', 'B1', 'A1', 'http://B1.img', 1, 'P1', '2011-02-01', 'Desc1', 'C1'),
        ('b2', 'B2', 'A2', 'http://B2.img', 2, 'P2', '2011-02-02', 'Desc2', 'C2'),
        ('b3', 'B3', 'A3', 'http://B3.img', 3, 'P3', '2011-02-03', 'Desc3', 'C3')`);
    await db.query(`
        INSERT INTO my_books (username, book_id, current_status, 
            rating, finished_date, progress)
            VALUES ('u1', 'b1', 'reading', 5, null, '25'),
            ('u2', 'b1', 'finished', 5, '2011-11-02', '100')`);              
    }
            
async function commonBeforeEach() {
    await db.query("BEGIN");
}
        
async function commonAfterEach() {
    await db.query("ROLLBACK");
}
        
async function commonAfterAll() {
    await db.end();
}
            
            
module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
};