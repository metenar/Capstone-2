import React, { useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./BookCard.css";
import CurrentUserContext from "./CurrentUserContext"
import { 
  Card, CardBody, CardFooter, CardTitle,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
  } from "reactstrap";

const BookCard=({book,userBooks})=>{
  const {addBookToMyBooks}=useContext(CurrentUserContext);
  const [dropdownOpen, setOpen] = useState(false);
  const [visible,setVisible]= useState(false)
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
  const handleRead=()=>setVisible(!visible);
    return (
      <section className="BookCard">
        <Card>
          <CardBody>
            <Link to={`books/${book.id}`}>
              <CardTitle>
                {book.volumeInfo.title}
                {book.volumeInfo.imageLinks && <img style={{width:'100px'}}src={book.volumeInfo.imageLinks.smallThumbnail}
                alt={book.volumeInfo.title}
                className="float-left ml-5" />}
              </CardTitle>
              {book.volumeInfo.authors && <p><small>by {book.volumeInfo.authors.map(author=>author)}</small></p>} 
            </Link> 
              <p className={visible ? "BookCard-description-visible" : "BookCard-description"}><small>{book.volumeInfo.description}</small></p> 
              <button 
                onClick={handleRead}
                className="read-button">
                {visible ? "Read Less" : "Read More..."}</button>          
              </CardBody>
            <CardFooter>
            <span className="float-left ml-5">Categories: {(book.volumeInfo.categories ? book.volumeInfo.categories : "Missing")}</span>
            <ButtonDropdown 
              isOpen={dropdownOpen} 
              toggle={toggle}
              className={hasIt ? "disabled float-right" : "active float-right"}
              disabled={hasIt}>
              <DropdownToggle caret color={hasIt ? "danger" : "success"}>
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
            </CardFooter>
            </Card>
          </section>
      );
}
export default BookCard;