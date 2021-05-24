import React,{useState, useEffect,useContext} from "react";
import BookApi from "./api"
import {useParams,Redirect} from "react-router-dom";
import DetailsCard from "./DetailsCard"
import CurrentUserContext from "./CurrentUserContext"

const BookDetails=()=>{
    const {id}=useParams();
    const [book,setBook]=useState(null)
    const {currentUser,myBooks}=useContext(CurrentUserContext)
    useEffect(()=>{
        async function getBook() {
            try {
                let book = await BookApi.getBook(id); 
                setBook(book);
            } catch (e) {
                if(e){
                    let book=await BookApi.getBooksFromApiById(id);
                    console.log(book)
                    let bookData={
                        id:book.id,
                        name:book.volumeInfo.title,
                        cover:book.volumeInfo.imageLinks.smallThumbnail,
                        author:book.volumeInfo.authors.toString(),
                        page_count:book.volumeInfo.pageCount,
                        publisher:book.volumeInfo.publisher,
                        published_date:book.volumeInfo.publishedDate,
                        description:book.volumeInfo.description,
                        categories:book.volumeInfo.categories.toString()
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
            <DetailsCard book={book} userBooks={myBooks}/>

        </div>
    )
    }
}
export default BookDetails;