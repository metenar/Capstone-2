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
  static async getMyBooks() {
    let res = await this.request(`mybooks`);
    return res.myBook;
  }

  static async getMyBooksById(book_id) {
    let res = await this.request(`mybooks/${book_id}`);
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

  static async deleteFromMybooks(book_id){
    let res=await this.request(`mybooks/${book_id}`,{}, "delete")
    return res.deleted
  }

  static async getBooksFromApi(query){
    let res=await this.request(`api/search/${query}`);
    return res;
  }

  static async getBooksFromApiById(id){
    let res=await this.request(`api/${id}`);
    return res;
  }

}
export default BookApi;