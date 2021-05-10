import React,{useState,useEffect,useContext} from "react";
import BooksApi from "./api"
import { Redirect, useParams } from "react-router-dom";
import ReadingCard from "./ReadingCard"
// import SearchForm from "./SearchForm";
import 'bootstrap/dist/css/bootstrap.css';
import CurrentUserContext from "./CurrentUserContext"

const StatusList=()=>{
    const {status}=useParams();
    let cnvrtedstatus='';
    if (status==="Finished"){
        cnvrtedstatus="finished";
    } else if (status==="Reading"){
        cnvrtedstatus="reading";
    } else {
        cnvrtedstatus="wanttoread"
    }
    const [books,setBooks]=useState([]);
    const {currentUser}=useContext(CurrentUserContext)
    useEffect(()=>{
        getBooks(cnvrtedstatus)
    },[cnvrtedstatus])
    async function getBooks(status){
        let books=await BooksApi.getBooksByStatus(status);
        setBooks(books)
    }
    if(!books) return <h3>Loading...<i className="fas fa-4x fa-spinner fa-spin" /></h3>
    if (!currentUser) {
        return <Redirect to="/login"/>
    } else{
        return (
            <div className="col-md-8 offset-md-2">
                <h3>{status} Books</h3>
                
                {books.map(book=>
                   <ReadingCard book={book} status={status} key={book.book_id}/>
                )}
            </div>
        )
    }
}
export default StatusList;