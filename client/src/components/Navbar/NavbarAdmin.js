import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.svg'
import complain from '../../assets/complain-admin.svg'
import iconlogout from '../../assets/logout.svg'
import book from '../../assets/add-book.svg'
import profile from '../../assets/blank-profile.png'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

function NavbarAdmin() {
      const [state, dispatch] = useContext(UserContext)

      let navigate = useNavigate()

      const logout = () => {
          console.log(state)
          dispatch({
              type: "LOGOUT"
          })
          navigate("/auth")
      }
    return (
        <Navbar bg="transparent" expand="lg" >
            <Container>
                <Navbar.Brand as={Link} to="/admin"><img src={logo} style={{ maxWidth: '8rem' }} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="align-items-center">

                        <NavDropdown
                            title={<div>
                                <img className="rounded-circle"
                                    src={profile}
                                    alt="User Picture"
                                    style={{ width: '3rem' }}
                                />
                            </div>} id="navbarScrollingDropdown">
                            <NavDropdown.Item as={Link} to="/admin/book-list">
                                <img
                                    src={book}
                                    style={{ width: '2rem', marginRight: '1rem' }}
                                />Books
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/complain">
                                <img
                                    src={complain}
                                    style={{ width: '2rem', marginRight: '1rem' }}
                                />Complain
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>
                                <img
                                    src={iconlogout}
                                    style={{ width: '2rem', marginRight: '1rem' }}
                                />Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarAdmin;