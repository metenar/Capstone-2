const express=require('express');
const router = express.Router();
const { ensureLoggedIn} = require("../middleware/auth");
const jsonschema = require("jsonschema");
const Books = require("../models/books");
const { BadRequestError } = require("../expressError");
const db=require('../db');
const newBooksSchema = require("../schemas/newBooks.json");

router.post("/add", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, newBooksSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
          }
          
          const newBook = await Books.add({...req.body});
          console.log(validator.valid)
      return res.status(201).json( newBook );
    } catch (err) {
      return next(err);
    }
  });


/** GET /[id] => { book }
 *
 * Returns { name, author, cover, page_count }
 *
 * Authorization required: login
 **/

 router.get("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
      const book = await Books.get(req.params.id);
      console.log(book)
      return res.json({ book });
    } catch (err) {
      return next(err);
    }
  });

  /** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization required: 
 **/

router.delete("/:id",ensureLoggedIn, async function (req, res, next) {
    try {
      await Books.remove(req.params.id);
      return res.json({ deleted: req.params.id });
    } catch (err) {
      return next(err);
    }
  });
  
  
  module.exports = router;