const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email,image}
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
          `SELECT username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  image
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email, image }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
      { username, password, first_name, last_name, email, image }) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
          `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            image)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email, image`,
        [
          username,
          hashedPassword,
          first_name,
          last_name,
          email,
          image,
        ],
    );

    const user = result.rows[0];

    return user;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, email, image,my_books}
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
          `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  image
           FROM users
           WHERE username = $1`,
        [username]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    // const userJobsRes=await db.query(
    //   `SELECT j.id,j.title,j.company_handle,c.name AS company_name 
    //   FROM jobs AS j JOIN companies AS c ON j.company_handle=c.handle
    //   JOIN applications AS a ON a.job_id=j.id 
    //   WHERE a.username=$1`,
    //   [username]
    // );
    // let jobIds=[];
    // const userJobs=userJobsRes.rows;
    // for (let i=0;i<userJobs.length;i++){
    //   jobIds.push(userJobs[i])
    // }
    // user.jobs=jobIds

    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email, isAdmin }
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          firstName: "first_name",
          lastName: "last_name",
          image: "image",
        });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                image`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

/** Job Aplication Feature 
* Given a username, and job id return applied the user to that job.
*
* Returns { applied:job_id }
*
* Throws NotFoundError if user not found, job is not found.
* Throws BedRequestError if the user applied before the given job_id 
*/
//   static async applyToJob(username,jobId){
//     // Checking the user and jobs are exist
//     const userCheck=await db.query(
//       `SELECT username FROM users
//       WHERE username=$1`,[username]);
//     const user=userCheck.rows[0];
//     if (!user) throw new NotFoundError(`No such user with username: ${username}`);
//     const jobCheck=await db.query(
//       `SELECT id FROM jobs
//       WHERE id=$1`,[jobId]);
//     const job=jobCheck.rows[0];
//     if (!job) throw new NotFoundError(`No such job with job_id: ${jobId}`);
//     const checkUserAppliedBefore=await db.query(`
//       SELECT username,job_id
//       FROM applications
//       WHERE username=$1 AND job_id=$2`,[username,jobId]);
//     // Checking if the user applied the job before
//     const dublicate=checkUserAppliedBefore.rows[0];
//     if(dublicate) {
//       throw new BadRequestError(`${username} has already applied to this job with id:${jobId}`);
//     }
//     // if everythings ok after checks write the date to table
//     let applied=await db.query(`
//     INSERT INTO applications (username, job_id)
//     VALUES ($1,$2) RETURNING job_id`,
//     [username,jobId]);
//     return {applied:applied.rows[0].job_id}
//   }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
          `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
        [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }
}


module.exports = User;