import './MainHeader.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MainHeader() {
  return (
      <Navbar expand="lg" className="custom-bg-primary">
        <Container>
          <Navbar.Brand href="/">ParkWhere</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
            <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile"> User Profile </NavDropdown.Item>
                <NavDropdown.Item href="/account-settings"> Settings </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/favorites">Favorites</Nav.Link>
              <Nav.Link href="/blacklist">Blacklist</Nav.Link>
              <Nav.Link href="/help">Help</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default MainHeader
