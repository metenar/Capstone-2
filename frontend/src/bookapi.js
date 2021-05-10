import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1/";
const API_KEY = "";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * 
 */

class GoogleBookApi {
  // the token for interactive with the API will be stored here.

  static async request(endpoint, method = "get") {
    console.debug("API Call:", endpoint, method);

    const url = `${BASE_URL}${endpoint}`;
    
    try {
        return (await axios({ url, method})).data;
    } catch (err) {
        console.error("API Error:", err.response);
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
    }
}

// Individual API routes

/** Get books by search. */

static async getBooksBySearch(query) {
    let books = await this.request(`volumes?q=${query}&orderBy=newest&key=${API_KEY}`);
    console.log(books)
    return books.items;
  }

  static async getBooksById(id) {
    let book = await this.request(`volumes/${id}?key=${API_KEY}`);
    return book;
  }

//   static async getBooksByStatus(status) {
//     let res = await this.request(`mybooks/status/${status}`);
//     return res.myBooks;
//   }

//   static async getMyBooks(username) {
//     let res = await this.request(`mybooks/${username}`);
//     return res.myBooks;
//   }

//   static async updateMyBook(book_id,updateData){
//     let res=await this.request(`mybooks/${book_id}`,updateData,"patch")
//     return res.MyBook
//   }

//   static async signup(signupData){
//     let res=await this.request("auth/register",signupData,"post")
//     return res.token
//   }

//   static async login(loginData){
//     let res=await this.request("auth/token",loginData,"post")
//     return res.token
//   }

//   static async getCurrentUser(username){
//     let res=await this.request(`users/${username}`);
//     return res.user
//   }

//   static async update(username,updateData){
//     let res=await this.request(`users/${username}`,updateData,"patch")
//     return res.user
//   }

//   static async applyJob(username,id){
//     await this.request(`users/${username}/jobs/${id}`,{},"post")
//   }
  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
export default GoogleBookApi;
