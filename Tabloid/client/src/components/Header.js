import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  let userProfileId = 0;
  let userTypeId = 0;



  if (isLoggedIn === true) {
    userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    userTypeId = JSON.parse(sessionStorage.getItem("userProfile")).userTypeId;


  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Tabloid</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">Posts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/user/${userProfileId}`}>My Posts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/addpost">New Posts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/categories">Category</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/tags">Tag Management</NavLink>
                </NavItem>
                {(userTypeId === 1) ? <NavItem><NavLink tag={RRNavLink} to="/userprofiles">User Profiles</NavLink></NavItem> : ""}
              </>
            }
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
