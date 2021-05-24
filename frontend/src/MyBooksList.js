import React,{useContext} from "react";
import { Redirect } from "react-router-dom";
import MyBookCard from "./MyBookCard"
// import SearchForm from "./SearchForm";
import 'bootstrap/dist/css/bootstrap.css';
import CurrentUserContext from "./CurrentUserContext"

const MyBooksList=()=>{
    const {currentUser,myBooks}=useContext(CurrentUserContext)        
    if (!currentUser) {
        return <Redirect to="/login"/>
    }
        return (
            <div className="col-md-8 offset-md-2">
                <h3>Books</h3>                
                {myBooks && myBooks.map(book=>
                   <MyBookCard book={book} key={book.book_id}/>
                )}
            </div>
        )
    
}
export default MyBooksList;