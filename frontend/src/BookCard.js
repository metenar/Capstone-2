import React, { useContext } from "react";
import {Link, useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./BookCard.css";
import CurrentUserContext from "./CurrentUserContext"
import { Card, CardBody, CardFooter, CardTitle} from "reactstrap";

const BookCard=({book})=>{
  const {addBookToMyBooks}=useContext(CurrentUserContext);
  const history = useHistory();
  async function handleStatus(status){
    addBookToMyBooks(book,status);
    history.push('/mybooks')
  }
    return (
      <section className="BookCard">
        <Card>
          <Link to={`books/${book.id}`}>
            <CardBody>
              <CardTitle>
                {book.volumeInfo.title}
                {book.volumeInfo.imageLinks && <img style={{width:'100px'}}src={book.volumeInfo.imageLinks.smallThumbnail}
                alt={book.volumeInfo.title}
                className="float-left ml-5" />}
              </CardTitle>
              {book.volumeInfo.authors && <p><small>by {book.volumeInfo.authors.map(author=>author)}</small></p>}
              </CardBody>
            </Link>
            <CardFooter>
            <button 
                className="btn btn-danger float-right" 
                onClick={()=>handleStatus("Want to Read")}
                >
                Want to Read
              </button>
              <button 
                className="btn btn-primary float-right" 
                onClick={()=>handleStatus("Finished")}
                >
                Finished
              </button>
              <button 
                className="btn btn-success float-right" 
                onClick={()=>handleStatus("Reading")}
                >
                Reading
              </button>
              </CardFooter>
            </Card>
          </section>
      );
}
export default BookCard;