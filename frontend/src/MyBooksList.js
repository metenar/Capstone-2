import React,{useState,useEffect,useContext} from "react";
import BookApi from "./api"
import { Redirect } from "react-router-dom";
import MyBookCard from "./MyBookCard"
// import SearchForm from "./SearchForm";
import 'bootstrap/dist/css/bootstrap.css';
import CurrentUserContext from "./CurrentUserContext"

const MyBooksList=()=>{
    const [books,setBooks]=useState([]);
    const {currentUser}=useContext(CurrentUserContext)
    useEffect(()=>{
        async function search(username=currentUser.username){
            let books=await BookApi.getMyBooks(username);
            setBooks(books)
        }
        search()
    },[currentUser.username])
    
    if(!books) return <h3>Loading...<i className="fas fa-4x fa-spinner fa-spin" /></h3>
    if (!currentUser) {
        return <Redirect to="/login"/>
    } else{
        return (
            <div className="col-md-8 offset-md-2">
                <h3>Books</h3>
                
                {books.map(book=>
                   <MyBookCard book={book} key={book.book_id}/>
                )}
            </div>
        )
    }
}
export default MyBooksList;