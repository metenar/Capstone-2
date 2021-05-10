import React from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./ReadingCard.css"
import { Card } from "react-bootstrap";

const ReadingCard=({book,status})=>{
  let current_status='';
  if (status==="Reading"){
    current_status="Reading";
  } else if(status==="Finished"){
    current_status="Finished";
  } else {
    current_status="WantToRead"
  }

    return (
      <section className="BookCard">
      <Card>
        <Link to={`/books/${book.book_id}`}>
            <Card.Body>
              <Card.Title>
                {book.name}
                {book.cover && <img style={{width:'100px'}}src={book.cover}
                alt={book.name}
                className="float-left ml-5" />}
              </Card.Title>
              {book.author && <p><small>by {book.author}</small></p>}
              {book.rating && <p>Rating: {book.rating}</p>}
              {current_status==="Reading" && <p>Progress: {book.progress}</p>}
            </Card.Body>
        </Link>
            <Card.Footer className={current_status}>
            
            {current_status}
            
            {current_status==="Finished" && <p>Finished Date: {book.finished_date}</p>}
            <Link to={`update/${book.book_id}`}
                className="btn btn-primary float-right" 
                >
                Update
              </Link>
            </Card.Footer>
          </Card>
          </section>
      );
}
export default ReadingCard;