import React, { useContext, useState } from "react";
import {useHistory} from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext"
import 'bootstrap/dist/css/bootstrap.css';
import "./ReadingCard.css"
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
      } from "reactstrap";
import { Card } from "react-bootstrap";

const DetailsCard=({book,userBooks})=>{
    const {addBookToMyBooks}=useContext(CurrentUserContext);
    const [dropdownOpen, setOpen] = useState(false);
    const history = useHistory();
    const toggle = () => setOpen(!dropdownOpen);
    const res=userBooks.find(obj => {
        return obj.book_id === book.id
    })
    let hasIt=false
    if(res) hasIt=true;
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
                  disabled={hasIt}
                  className="WantToRead"
                  onClick={()=>handleStatus("Want to Read")}
                >Want to Read</DropdownItem>
                <DropdownItem
                  onClick={()=>handleStatus("Finished")}
                  className="Finished"
                  disabled={hasIt}
                >Finished</DropdownItem>
                <DropdownItem
                  onClick={()=>handleStatus("Reading")}
                  className="Reading"
                  disabled={hasIt}
                >Reading</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>  
              </Card.Footer>
          </Card>
          </section>
      );
}
export default DetailsCard;