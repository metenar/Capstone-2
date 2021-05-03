const express=require('express');
const router = express.Router();
const { ensureLoggedIn} = require("../middleware/auth");
const jsonschema = require("jsonschema");
const MyBooks = require("../models/MyBooks");
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
          const newMyBook = await MyBooks.add({...req.body});
      return res.status(201).json( newMyBook );
    } catch (err) {
      return next(err);
    }
  });

/** GET /[username] => { MyBook}
 *
 * Returns { username, book_id, lastName, image }
 *
 * Authorization required: login
 **/

 router.get("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
      const myBook = await MyBooks.get(req.params.username);
      return res.json({ myBook });
    } catch (err) {
      return next(err);
    }
  });

  /** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: login
 **/

router.patch("/:username",ensureLoggedIn, async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, userUpdateSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const user = await User.update(req.params.username, req.body);
      return res.json({ user });
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
      await MyBooks.remove(req.params.book_id);
      return res.json({ deleted: req.params.book_id });
    } catch (err) {
      return next(err);
    }
  });
  
  
  module.exports = router;