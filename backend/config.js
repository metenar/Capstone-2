require("dotenv").config();

const SECRET_KEY=process.env.SECRET_KEY || 'secret-dev';
const PORT = +process.env.PORT || 3001;
const API_KEY= process.env.API_KEY

// Use dev database, testing database, or via env var, production database

function getDatabaseUri(){
    return (process.env.NODE_ENV === "test")
        ? "books_test"
        : process.env.DATABASE_URL || "books";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports={
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    API_KEY,
    getDatabaseUri,
};