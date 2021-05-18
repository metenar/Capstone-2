import React, {useState} from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./ReadingCard.css"
import { Card } from "react-bootstrap";

const ReadingCard=({book,status})=>{
  const [visible,setVisible]= useState(false)
  let current_status='';
  if (status==="Reading"){
    current_status="Reading";
  } else if(status==="Finished"){
    current_status="Finished";
  } else {
    current_status="Want To Read"
  }
  let finDate=""
  let date=false;
  if(current_status==="Finished" && book.finished_date) {
    date=true;
    finDate=new Date(book.finished_date).toLocaleDateString();
  }
  const handleRead=()=>setVisible(!visible);
    return (
      <section className="BookCard">
      <Card>
        <Card.Body>
          <Link to={`/books/${book.book_id}`}>
              <Card.Title>
                {book.name}
                {book.cover && <img style={{width:'100px'}}src={book.cover}
                alt={book.name}
                className="float-left ml-5" />}
              </Card.Title>
              {book.author && <p><small>by {book.author}</small></p>}
              {book.rating && <p>Rating: {book.rating}</p>}
              {current_status==="Reading" && <p>Progress: {book.progress}</p>}
            </Link>
              <p className={visible ? "BookCard-description-visible" : "BookCard-description"}><small>{book.description}</small></p> 
              <button 
                onClick={handleRead}
                className="read-button">
                {visible ? "Read Less" : "Read More..."}</button>
            </Card.Body>
            <Card.Footer className={current_status}>
            
            {current_status}
            
            {date && <p>Finished Date: {finDate}</p>}
            <span id="categories" className="float-left ml-5 text-muted">Categories: {book.categories}</span>
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