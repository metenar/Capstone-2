import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./ReadingCard.css"
import { Card } from "react-bootstrap";

const ReadingCard=({book,status,remove})=>{
  const [visible,setVisible]= useState(false);
  const history = useHistory();
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
  async function handleDelete(id){
    await remove(id);
    history.push('/mybooks')
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
                onClick={()=>handleRead(book.book_id)}
                className="read-button">
                {visible ? "Read Less" : "Read More..."}</button>
            </Card.Body>
            <Card.Footer className={current_status==="Want To Read" ? "WantToRead" : current_status}>
            
            {current_status}
            
            {date && <p>Finished Date: {finDate}</p>}
            <span id="categories" className="float-left ml-5">Categories: {book.categories}</span>
            <Link to={`update/${book.book_id}`}
                className="btn btn-primary float-right update" 
                >
                Update Status
            </Link>
            <button 
                onClick={()=>handleDelete(book.book_id)}
                className="btn btn-danger float-right">
                Delete</button>
            </Card.Footer>
          </Card>
          </section>
      );
}
export default ReadingCard;