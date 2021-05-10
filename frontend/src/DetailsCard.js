import React, { useContext } from "react";
import {useHistory} from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext"
import 'bootstrap/dist/css/bootstrap.css';
import "./ReadingCard.css"
import { Card } from "react-bootstrap";

const DetailsCard=({book})=>{
    const {addBookToMyBooks}=useContext(CurrentUserContext);
    const history = useHistory();
    async function handleStatus(status){
        addBookToMyBooks(book,status);
        history.push('/mybooks')
    }
    return (
      <section className="BookCard">
      <Card>
            <Card.Body>
              <Card.Title>
                {book.name}
                {book.cover && <img style={{width:'100px'}}src={book.cover}
                alt={book.name}
                className="float-left ml-5" />}
              </Card.Title>
              {book.author && <p><small>by {book.author}</small></p>}
              {book.rating && <p>Rating: {book.rating}</p>}
              <p>Total Page: {book.page_count}</p>
            </Card.Body>
            <Card.Footer>
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
              </Card.Footer>
          </Card>
          </section>
      );
}
export default DetailsCard;