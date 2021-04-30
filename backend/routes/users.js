const express=require('express');
const router = express.Router();
const { ensureLoggedIn} = require("../middleware/auth");
const jsonschema = require("jsonschema");
const User = require("../models/users");
const { BadRequestError } = require("../expressError");
const userUpdateSchema = require("../schemas/userUpdate.json");
const db=require('../db');


/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, image }
 *
 * Authorization required: login
 **/

 router.get("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
      const user = await User.get(req.params.username);
      return res.json({ user });
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

  /** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: 
 **/

router.delete("/:username",ensureLoggedIn, async function (req, res, next) {
    try {
      await User.remove(req.params.username);
      return res.json({ deleted: req.params.username });
    } catch (err) {
      return next(err);
    }
  });
  
  
  module.exports = router;