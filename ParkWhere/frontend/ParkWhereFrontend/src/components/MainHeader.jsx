import './MainHeader.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from './AuthProvider';

import { useState, useEffect } from 'react';

function MainHeader() {
	const { user, getCurrentUser } = useAuth();

	return (
		<Navbar expand="lg" className="custom-bg-primary">
			<Container>
				<Navbar.Brand href="/">ParkWhere</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Nav.Link href="/favorites">Favorites</Nav.Link>
						<Nav.Link href="/blacklist">Blacklist</Nav.Link>
						<Nav.Link href="/help">Help</Nav.Link>
					</Nav>
					<Nav className="ms-auto me-5">
						<NavDropdown title={!user ? "Account" : user.username} id="basic-nav-dropdown">
							<NavDropdown.Item href="/profile"> User Profile </NavDropdown.Item>
							<NavDropdown.Item href="/account-settings"> Settings </NavDropdown.Item>
							{
								!user ? <NavDropdown.Item href="/login"> Login </NavDropdown.Item> 
								: <NavDropdown.Item href="/logout"> Logout </NavDropdown.Item>
							}	
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default MainHeader
