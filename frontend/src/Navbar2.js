import React, { useState,useContext } from 'react';
import { NavLink,Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import "./NavBar.css";
import 'bootstrap/dist/css/bootstrap.css';
import CurrentUserContext from "./CurrentUserContext"

const NavBar2 = ({logout}) => {
    let {currentUser}=useContext(CurrentUserContext)
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  if(currentUser){
  return (
    <div>
      <Navbar color="black" dark >
        <NavbarBrand href="/" className="mr-auto">BookApi</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
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
        </Collapse>
      </Navbar>
    </div>
  );
}
return (
    <div>
      <Navbar color="black" dark>
        <NavbarBrand href="/" className="mr-auto">BookApi</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
        <Nav navbar>
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Signup">SignUp</NavLink>
            </NavItem>
        </Nav>
        </Collapse>
      </Navbar>
    </div>
 
)
}

export default NavBar2;
