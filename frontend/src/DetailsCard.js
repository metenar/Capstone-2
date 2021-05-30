import React, { useContext, useState } from "react";
import {useHistory} from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext"
import 'bootstrap/dist/css/bootstrap.css';
import "./ReadingCard.css"
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
      } from "reactstrap";
import { Card } from "react-bootstrap";

const DetailsCard=({book,userBooks})=>{
    const [visible,setVisible]= useState(false)
    const {addBookToMyBooks}=useContext(CurrentUserContext);
    const [dropdownOpen, setOpen] = useState(false);
    const history = useHistory();
    const toggle = () => setOpen(!dropdownOpen);
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    let publishedDate=new Date(book.published_date).toLocaleDateString("en-US", options);
    const res=userBooks.find(obj => {
        return obj.book_id === book.id
    })
    let hasIt=false
    if(res) hasIt=true;
    async function handleStatus(status){
        addBookToMyBooks(book,status);
        history.push('/mybooks')
    }
    const handleRead=()=>setVisible(!visible);
    return (
      <section className="BookCard">
      <Card>
            <Card.Body>
            {book.cover && <img style={{width:'100px'}}src={book.cover}
            alt={book.name}
            className="card-img ml-1" />}            
              <Card.Title>
                {book.name}
              </Card.Title>
              {book.author && <p><small>by {book.author}</small></p>}
              {book.rating && <p>Rating: {book.rating}</p>}
              <p className={visible ? "BookCard-description-visible" : "BookCard-description"}><small>{book.description.replace(/(<(\/?)[a-zA-Z]+>)/g,' ')}</small></p> 
              <button 
                onClick={handleRead}
                className="read-button">
                {visible ? "Read Less" : "Read More..."}</button>
              <p>Publisher: {book.publisher},  Published Date: {publishedDate}</p>
              <p>Total Page: {book.page_count}</p>
            </Card.Body>
            <Card.Footer>
            <span id="categories" className="float-left ml-5">Categories: {book.categories}</span>
            <ButtonDropdown 
              isOpen={dropdownOpen} 
              toggle={toggle}
              className={hasIt ? "disabled float-right" : "active float-right"}
              disabled={hasIt}>
              <DropdownToggle caret 
              color={hasIt ? "danger" : "success"}>
                Add Library
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Status</DropdownItem>
                <DropdownItem 
                  className="WantToRead"
                  onClick={()=>handleStatus("Want to Read")}
                >Want to Read</DropdownItem>
                <DropdownItem
                  onClick={()=>handleStatus("Finished")}
                  className="Finished"
                >Finished</DropdownItem>
                <DropdownItem
                  onClick={()=>handleStatus("Reading")}
                  className="Reading"
                >Reading</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>  
              </Card.Footer>
          </Card>
          </section>
      );
}
export default DetailsCard;