import React,{useState,useEffect,useContext} from "react";
import BookApi from "./api"
import { Redirect } from "react-router-dom";
import BookCard from "./BookCard"
import SearchForm from "./SearchForm";
import 'bootstrap/dist/css/bootstrap.css';
import CurrentUserContext from "./CurrentUserContext"

const BooksList=()=>{
    const [books,setBooks]=useState([]);
    const {currentUser,myBooks}=useContext(CurrentUserContext)
    useEffect(()=>{
        search()
    },[])
    async function search(query="war"){
        let books=await BookApi.getBooksFromApi(query);
        setBooks(books)
    }
    if(!books) return <h3>Loading...<i className="fas fa-4x fa-spinner fa-spin" /></h3>
    if (!currentUser) {
        return <Redirect to="/login"/>
    } else{
        return (
            <div className="col-md-8 offset-md-2">
                <h3>Books</h3>
                <SearchForm search={search}/>
                {books.map(book=>
                   <BookCard book={book} userBooks={myBooks} key={book.id}/>
                )}
            </div>
        )
    }
}
export default BooksList;