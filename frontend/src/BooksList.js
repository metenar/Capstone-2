import React,{useState,useEffect,useContext} from "react";
import BookApi from "./api"
import { Redirect } from "react-router-dom";
import BookCard from "./BookCard"
import SearchForm from "./SearchForm";
import 'bootstrap/dist/css/bootstrap.css';
import CurrentUserContext from "./CurrentUserContext"
import "./BookList.css"
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const BooksList=()=>{
    const [books,setBooks]=useState([]);
    const [total,setTotal]=useState(0);
    const [query,setQuery]=useState('war');
    const [currentPage, setCurrentPage] = useState(0);
    const {currentUser,myBooks}=useContext(CurrentUserContext)
    useEffect(()=>{
        search(query)
    },[query])
    async function search(query,pagenum=0){
        let result=await BookApi.getBooksFromApi(query,pagenum);
        let books=result.res_Data
        let total=result.total
        setBooks(books);
        setTotal(total)
        setQuery(query)
    }
    const handleClick= (e,index)=>{
        search(query,index)
        setCurrentPage(index);
    }
    const handlePreviousClick= ()=>{
        setCurrentPage(currentPage-1);
        search(query,currentPage)
    }
    const handleNextClick= ()=>{
        setCurrentPage(currentPage+1);
        search(query,currentPage)
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
                <div className="pagination">
                <Pagination className="pagination-item" size="sm" aria-label="Page navigation">
                    <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink onClick={handlePreviousClick} previous href="#" />
                    </PaginationItem>
                    {[...Array(Math.ceil(total/20))].map((page, i) => {
                        if(i===0 || i===(Math.ceil(total/20))-1 || (i>=currentPage-2 && i<=currentPage+2)){
                            return (
                                <PaginationItem active={i===currentPage} key={i}>
                                    <PaginationLink onClick={e => handleClick(e, i)} href="#">
                                    {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        }
                        return "..."
                    
                    })}
                    <PaginationItem disabled={currentPage === Math.ceil(total/20)-1}>
                        <PaginationLink onClick={handleNextClick} next href="#" />
                    </PaginationItem>
                </Pagination>
                </div>
            </div>
        )
    }
}
export default BooksList;