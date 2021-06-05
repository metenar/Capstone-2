const express=require('express');
const axios= require('axios');
const router = express.Router();
const { ensureLoggedIn} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const BASE_URL = "https://www.googleapis.com/books/v1/";

router.get("/search/:query/:page", ensureLoggedIn, async function (req, res, next) {
    try {
        const books=await axios(`${BASE_URL}volumes?q=${req.params.query}&orderBy=newest&maxResults=20&startIndex=${req.params.page}&key=${process.env.API_KEY}`);
        const res_Data = books.data.items
        const total=books.data.totalItems
        return res.json( {res_Data,total} );
    } catch (err) {
      return next(err);
    }
  });

  router.get("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const book=await axios(`${BASE_URL}volumes/${req.params.id}?key=${process.env.API_KEY}`);  
        const res_Data=book.data   
        return res.json( res_Data);
    } catch (err) {
      return next(err);
    }
  });

  module.exports = router;