
/** Express app for books api */

const express=require('express');
const cors=require('cors');
const app=express();
const { NotFoundError }=require('./expressError');
const morgan=require('morgan');
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const booksRoutes = require('./routes/books')
const MyBooksRoutes = require('./routes/MyBooks');
const apiRoutes= require('./routes/api');
const { authenticateJWT } = require("./middleware/auth");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(authenticateJWT);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/books",booksRoutes);
app.use('/mybooks',MyBooksRoutes);
app.use('/api',apiRoutes);

/** Handle 404 errors -- this matches everything */

app.use(function (req, res, next) {
    return next(new NotFoundError());
  });

/** Generic error handler; anything unhandled goes here. */

app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });
  
  module.exports = app;  