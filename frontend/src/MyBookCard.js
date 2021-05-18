import React,{useState} from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./MyBookCard.css"
import { Card } from "react-bootstrap";

const MyBookCard=({book})=>{
  const [visible,setVisible]= useState(false)
  let status='';
  if (book.current_status==="Reading"){
    status="Reading";
  } else if(book.current_status==="Finished"){
    status="Finished";
  } else {
    status="WantToRead"
  }
  let finDate=""
  let date=false;
  if(book.current_status==="Finished" && book.finished_date) {
    date=true;
    finDate=new Date(book.finished_date).toLocaleDateString();
  }
  const handleRead=()=>setVisible(!visible);
    return (
      <section className="MyBookCard">
        <Card>
          <Card.Body>
            <Link to={`books/${book.book_id}`}>
              <Card.Title>
                {book.name}
                {book.cover && <img style={{width:'100px'}}src={book.cover}
                alt={book.name}
                className="float-left ml-5" />}
              </Card.Title>
              {book.author && <p><small>by {book.author}</small></p>}
              {book.rating && <p>Rating: {book.rating}</p>}
              {book.current_status==="Reading" && <p>Progress: %{book.progress}</p>}
            </Link>
              <p className={visible ? "MyBookCard-description-visible" : "MyBookCard-description"}><small>{book.description.replace(/<br>/g,' ')}</small></p> 
              <button 
                onClick={handleRead}
                className="read-button">
                {visible ? "Read Less" : "Read More..."}</button>
          </Card.Body>
          <Card.Footer className={status}>
          <Link to={`mybooks/${book.current_status}`}>
          {book.current_status}
          </Link>
            <span id="categories" className="float-left ml-5 text-muted">Categories: {book.categories}</span>
            {date && <p>Finished Date: {finDate}</p>}
          </Card.Footer>
        </Card>
      </section>
      );
}
export default MyBookCard;