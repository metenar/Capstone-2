import React,{useState, useEffect,useContext} from "react";
import BookApi from "./api"
import {useParams,Redirect} from "react-router-dom";
import DetailsCard from "./DetailsCard"
import CurrentUserContext from "./CurrentUserContext"
import GoogleBookApi from "./bookapi";

const BookDetails=()=>{
    const {id}=useParams();
    const [book,setBook]=useState(null)
    const {currentUser}=useContext(CurrentUserContext)
    useEffect(()=>{
        async function getBook() {
            try {
                let book = await BookApi.getBook(id); 
                setBook(book);
            } catch (e) {
                if(e){
                    let book=await GoogleBookApi.getBooksById(id);
                    let bookData={
                        id:book.id,
                        name:book.volumeInfo.title,
                        cover:book.volumeInfo.imageLinks.smallThumbnail,
                        author:book.volumeInfo.authors.toString(),
                        page_count:book.volumeInfo.pageCount
                    }
                    await BookApi.addBook(bookData)
                    let mbook=await BookApi.getBook(id)
                    setBook(mbook);
               } 
            }           
        }
        getBook()
      },[id])
      if (!book) return <h3>Loading...<i className="fas fa-4x fa-spinner fa-spin" /></h3>;
      if (!currentUser) {
        return <Redirect to="/login"/>
    } else{
    return (
        <div className="col-md-8 offset-md-2">
            <h3>Book details</h3>
            <DetailsCard book={book} userBooks={currentUser.library}/>

        </div>
    )
    }
}
export default BookDetails;