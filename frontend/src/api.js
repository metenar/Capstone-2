import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * 
 */

class BookApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${BookApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get book details by book id. */

  static async getBook(id) {
    let res = await this.request(`books/${id}`);
    console.log(res.book)
    return res.book;
  }
  static async addBook(data){
      let res=await this.request(`books/add`, data,"post")
      return res.book;
  }
  static async getBooksByStatus(status) {
    let res = await this.request(`mybooks/status/${status}`);
    return res.myBooks;
  }
  static async addBookToMyBook(data){
      let res=await this.request(`mybooks/add`,data,"post");
      return res.myBooks;
  }
  static async getMyBooks(username) {
    let res = await this.request(`mybooks/${username}`);
    return res.myBook;
  }

  static async updateMyBook(book_id,updateData){
    let res=await this.request(`mybooks/${book_id}`,updateData,"patch")
    return res.MyBook
  }

  static async signup(signupData){
    let res=await this.request("auth/register",signupData,"post")
    return res.token
  }

  static async login(loginData){
    let res=await this.request("auth/token",loginData,"post")
    return res.token
  }

  static async getCurrentUser(username){
    let res=await this.request(`users/${username}`);
    return res.user
  }

  static async update(username,updateData){
    let res=await this.request(`users/${username}`,updateData,"patch")
    return res.user
  }

//   static async applyJob(username,id){
//     await this.request(`users/${username}/jobs/${id}`,{},"post")
//   }
  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
export default BookApi;