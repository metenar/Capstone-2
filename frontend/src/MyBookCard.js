import React from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./MyBookCard.css"
import { Card } from "react-bootstrap";

const MyBookCard=({book})=>{
  let status='';
  if (book.current_status==="Reading"){
    status="Reading";
  } else if(book.current_status==="Finished"){
    status="Finished";
  } else {
    status="WantToRead"
  }
    return (
      <section className="BookCard">
      <Card>
        <Link to={`books/${book.book_id}`}>
            <Card.Body>
              <Card.Title>
                {book.name}
                {book.cover && <img style={{width:'100px'}}src={book.cover}
                alt={book.name}
                className="float-left ml-5" />}
              </Card.Title>
              {book.author && <p><small>by {book.author}</small></p>}
              {book.rating && <p>Rating: {book.rating}</p>}
              {book.current_status==="Reading" && <p>Progress: %{book.progress}</p>}
            </Card.Body>
        </Link>
            <Card.Footer className={status}>
            <Link to={`mybooks/${book.current_status}`}>
            {book.current_status}
            </Link>
            {book.current_status==="Finished" && <p>Finished Date: {book.finished_date}</p>}
            </Card.Footer>
          </Card>
          </section>
      );
}
export default MyBookCard;