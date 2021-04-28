const express=require('express');
const router = express.Router();
const User = require("../models/user");
const { BadRequestError } = require("../expressError");
const { createToken } = require("../helpers/tokens");
const userUpdateSchema = require("../schemas/userUpdate.json");
const db=require('../db');


/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, image }
 *
 * Authorization required: login
 **/

 router.get("/:username", async function (req, res, next) {
    try {
      const user = await User.get(req.params.username);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });

  /** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: 
 **/

router.delete("/:username", async function (req, res, next) {
    try {
      await User.remove(req.params.username);
      return res.json({ deleted: req.params.username });
    } catch (err) {
      return next(err);
    }
  });
  
  
  module.exports = router;