import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.svg'
import cart from '../../assets/cart.svg'
import complain from '../../assets/complain.svg'
import iconlogout from '../../assets/logout.svg'
import user from '../../assets/user.svg'
import profile from '../../assets/blank-profile.png'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

function NavbarUser() {
      const [state, dispatch] = useContext(UserContext)

      let navigate = useNavigate()

      const logout = () => {
          console.log(state)
          dispatch({
              type: "LOGOUT"
          })
          navigate("/")
      } 
    return (
        <Navbar bg="transparent" expand="lg" >
            <Container>
                <Navbar.Brand as={Link} to="/user"><img src={logo} style={{ maxWidth: '8rem' }} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="align-items-center">
                        <Nav.Link as={Link} to="/user/cart">
                            <img
                                src={cart}
                                style={{ width: '2.8rem' }}
                            />
                        </Nav.Link>

                        <NavDropdown
                            title={<div>
                                <img className="rounded-circle"
                                    src={profile}
                                    alt="User Picture"
                                    style={{ width: '3rem' }}
                                />
                            </div>} id="navbarScrollingDropdown">
                            <NavDropdown.Item as={Link} to="/user/profile">
                                <img
                                    src={user}
                                    style={{ width: '2rem', marginRight: '1rem' }}
                                />Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/user/complain">
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

export default NavbarUser;