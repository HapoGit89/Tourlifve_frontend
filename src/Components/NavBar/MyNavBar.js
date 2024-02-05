import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./MyNavBar.css"
import 'bootstrap/dist/css/bootstrap.min.css';


function MyNavBar({user, logOut}) {

  // Navbar for App


  if(user.token){  return (
    <div>
      <Navbar expand="md">
        <NavLink to="/" className="NavbarBrand">
          Tourlifve 🚌
        </NavLink>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/tours">Tours</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={`user/${user.username}`}>Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/" onClick={logOut} reloadDocument>Log Out</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );}

  else {
    return ( 
      <div>
        <Navbar expand="md">
          <NavLink to="/" className="NavbarBrand">
            Tourlifve 🚌
          </NavLink>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup">Signup</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    )
  }



}

export default MyNavBar;