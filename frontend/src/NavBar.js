import React,{useContext} from "react";
import "./NavBar.css";
import { NavLink,Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavItem } from "reactstrap";
import CurrentUserContext from "./CurrentUserContext"

function NavBar({logout}) {
  let {currentUser}=useContext(CurrentUserContext)
  if(currentUser){
    return (
      <div>
        <Navbar expand="md">
          <NavLink exact to="/" className="navbar-brand">
          Books API
          </NavLink>  
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/mybooks">My Books</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
              <Link to="/" onClick={logout}>Logout <img className="card-img rounded-circle user-img mt-2 ml-2 p-2" style={{width:'50px'}} src={currentUser.image} alt="user avatar"/>{currentUser.username}</Link>
            </NavItem>
          </Nav>
        </Navbar>
      </div>      
    )
  }
    return (
      <div>
        <Navbar expand="md">
          <NavLink exact to="/" className="navbar-brand">
            Book API
          </NavLink> 

        </Navbar>
      </div>
    );
  }
  
  export default NavBar;