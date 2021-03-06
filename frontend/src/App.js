import React,{useState, useEffect} from "react"
import { BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import BookApi from "./api";
import Home from "./Home";
import EditProfileForm from "./EditProfileForm"
import LoginForm from "./LoginForm"
import MyBooksList from "./MyBooksList"
import SignUpForm from "./SignUpForm";
import Navbar2 from "./Navbar2";
import jwt from "jsonwebtoken";
import useLocalStorageState from "./hooks/useLocalStorageState"
import CurrentUserContext from "./CurrentUserContext"
import StatusList from "./StatusList";
import BookDetails from "./BookDetails";
import UpdateMyBookForm from "./UpdateMyBookForm";


function App() {
  const [currentUser,setCurrentUser]=useState(null);
  const [isDataLoaded,setIsDataLoaded]=useState(false);
  const [myBooks,setMyBooks]=useState(null);
  const [token,setToken]=useLocalStorageState("token");
  useEffect(()=>{
    async function getCurrentUser(){
    if(token){
      try{
      let{username}=jwt.decode(token)
      BookApi.token=token
      let currentUser=await BookApi.getCurrentUser(username);
      let library=await BookApi.getMyBooks(username)
      setMyBooks(library)
      setCurrentUser(currentUser)
    } catch (e){
      console.error("error loading",e)
      setCurrentUser(null)
    }
  }
  setIsDataLoaded(true)
  }
  setIsDataLoaded(false)
  getCurrentUser()
  },[token]);
  
  /** Signing Up feature */
  async function signup(data){
    try{
      let token=await BookApi.signup(data);
      setToken(token)
      return {success:true}
      } catch (e){
        console.error("failed",e)
        return {success:false}
      }   
    }
  
  /** Login feature */
  async function login(data){
    try{
      let token=await BookApi.login(data)
      setToken(token)
      return {success:true}
    } catch (e){
      console.error("failed",e)
      return {success:false}
    }
  }

  /** Logout feature */

  function logout(){
    setCurrentUser(null)
    setToken(null)
  }
  /** Update user profile feature */

  async function save(username,data){
    let profileData={
      first_name:data.first_name,
      last_name:data.lastName,
      email:data.email,
      image:data.image
    }
    try{
      let user=await BookApi.update(username,profileData)
      setCurrentUser(user)
      return {success:true}
    } catch (e){
      console.error("failed",e)
      return {success:false}
    }
  }

  /** Adding Book to my_books table feature */
  async function addBookToMyBooks(data,status){
    
    //Checking is book in our database
    try {
      let book=await BookApi.getBook(data.id);
      let myoldBookData={
        username:currentUser.username,
        book_id:book.id,
        current_status:status
      }
      await BookApi.addBookToMyBook(myoldBookData);
      updateLibrary();
      return {success:true}
    } catch (e){
      console.error("failed",e)
      if (e){
        let bookData={
          id:data.id,
          name:data.volumeInfo.title,
          cover:data.volumeInfo.imageLinks.smallThumbnail,
          author:data.volumeInfo.authors.toString(),
          page_count:data.volumeInfo.pageCount,
          publisher:data.volumeInfo.publisher,
          published_date:data.volumeInfo.publishedDate,
          description:data.volumeInfo.description,
          categories:(data.volumeInfo.categories ? data.volumeInfo.categories.toString() : "Missing")
        }
        let myBookData={
          username:currentUser.username,
          book_id:data.id,
          current_status:status,
          rating:(data.volumeInfo.avarageRating ? data.volumeInfo.averageRating.toString() : "0" )
        }
        await BookApi.addBook(bookData);
        await BookApi.addBookToMyBook(myBookData);
        updateLibrary();
        console.error("failed",e)
        return {success:false}
      }
    }  
  }

  /** Updating my_books table feature */

  async function update(username,data){
    try {
      delete data.username;
      let book=await BookApi.getBook(data.book_id);
      if(data.current_status!=="Finished"){
        data.progress=(+data.progress/book.page_count*100).toFixed(2);
        data.progress= +data.progress;
      } else {
        data.progress=100;
      }
      await BookApi.updateMyBook(username,data);
      updateLibrary()
      return {success:true}
    } catch (e) {
      console.error("failed",e)
      return {success:false}
    }
  }
  /** Updating library helper function */

  async function updateLibrary(){
    const library=await BookApi.getMyBooks(currentUser.username);
    setMyBooks(library);
  }

  /** Removing book from my_books table feature */

  async function remove(book_id){
    try {
      await BookApi.deleteFromMybooks(book_id);
      updateLibrary();
      return {success:true}
    } catch (e) {
      console.error("failed",e)
      return {success:false}      
    }
  }

  if(!isDataLoaded) return <h3>Loading</h3>
    return (
      <div className="App">
      <BrowserRouter>
        <CurrentUserContext.Provider value={{currentUser,myBooks,addBookToMyBooks}}>
          <Navbar2 logout={logout}/>
          <main>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/signup'>
                <SignUpForm signup={signup}/>
              </Route>
              <Route exact path='/login'>
                <LoginForm login={login}/>
              </Route>
              <Route exact path='/profile'>
                <EditProfileForm save={save}/>
              </Route>
              <Route exact path='/mybooks'>
                <MyBooksList />
              </Route>
              <Route exact path='/mybooks/update/:book_id'>
                <UpdateMyBookForm update={update} />
              </Route>
              <Route exact path='/mybooks/:status'>
                <StatusList remove={remove}/>
              </Route>
              <Route exact path='/books/:id'>
                <BookDetails />
              </Route>
              <Route>
                <p>Hmmm. I can't seem to find what you want.</p>
              </Route>
            </Switch>
          </main>
        </CurrentUserContext.Provider>
      </BrowserRouter>
      </div>
    );
}

export default App;
