const express=require('express');
const router = express.Router();
const { ensureLoggedIn} = require("../middleware/auth");
const jsonschema = require("jsonschema");
const MyBooks = require("../models/MyBooks");
const Books = require("../models/books");
const { BadRequestError } = require("../expressError");
const MyBooksUpdateSchema = require("../schemas/MyBooksUpdate.json");
const MyBooksSchema = require("../schemas/MyBooks.json");
const db=require('../db');

router.post("/add", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, MyBooksSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
          }         
          const newMyBook = await MyBooks.add({...req.body},res.locals.user.username);
          const book= await Books.get(req.body.book_id)
          newMyBook.progress=`%${(newMyBook.progress/book.page_count*100).toFixed(2)}`
      return res.status(201).json( newMyBook );
    } catch (err) {
      return next(err);
    }
  });

/** GET /[username] => { MyBook}
 *
 * Returns { username, book_id, name, author, cover, 
 *          current_status, rating, finished_date, progress }
 *
 * Authorization required: login
 **/

 router.get("/:username", ensureLoggedIn, async function (req, res, next) {
   console.log(req.params.username)
    try {
      const myBook = await MyBooks.get(req.params.username);
      return res.json({ myBook });
    } catch (err) {
      return next(err);
    }
  });

/** GET /status/[current_status] => { booklist of same status}
 *
 * Returns { book_id, name, author, cover, 
 *           rating, finished_date,progress}
 *
 * Authorization required: login
 **/

 router.get("/status/:status", ensureLoggedIn, async function (req, res, next) {
    try {
			let status='';
			if(req.params.status==="reading"){
				status="Reading";
			} else if(req.params.status==="finished"){
				status="Finished";
			} else {
				status="Want to Read";
			}
      const myBooks = await MyBooks.getStatus(status, res.locals.user.username);
			myBooks.map(MyBook=>MyBook.progress=`%${(MyBook.progress/MyBook.page_count*100).toFixed(2)}`)
      return res.json({ myBooks });
    } catch (err) {
      return next(err);
    }
  });

  /** PATCH /[book_id] { book } => { edited book }
 *
 * Data can include:
 *   { current_status, rating, finished_date, progress }
 *
 * Returns { book_id, current_status, rating, finished_date, progress }
 *
 * Authorization required: login
 **/

router.patch("/:book_id",ensureLoggedIn, async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, MyBooksUpdateSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const MyBook = await MyBooks.update(req.params.book_id,res.locals.user.username, req.body);
      const book= await Books.get(req.params.book_id)
          MyBook.progress=(MyBook.progress/book.page_count*100).toFixed(2)
      return res.json({ MyBook });
    } catch (err) {
      return next(err);
    }
  });

  /** DELETE /[book_id]  =>  { deleted: book_id }
 *
 * Authorization required: 
 **/

router.delete("/:book_id",ensureLoggedIn, async function (req, res, next) {
    try {
      await MyBooks.remove(req.params.book_id,res.locals.user.username);
      return res.json({ deleted: req.params.book_id });
    } catch (err) {
      return next(err);
    }
  });
  
  
  module.exports = router;