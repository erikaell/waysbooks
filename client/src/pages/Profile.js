import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import NavbarUser from "../components/Navbar/NavbarUser"
import { Row, Col, Button, Card } from "react-bootstrap"
import email from '../assets/email.svg'
import gender from '../assets/gender.svg'
import phone from '../assets/phone.svg'
import location from '../assets/location.svg'
import dataBooks from '../dummyData/books'
import EditProfile from "../components/Modal/EditProfile"
import { useQuery } from 'react-query'
import { API } from '../config/api'
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
    const [datas] = useState(dataBooks)
    const [editShow, setEditShow] = useState(false);

    const [state] = useContext(UserContext);
  
    let { data: profile, refetch } = useQuery('profileCache', async () => {
      const response = await API.get('/profile');
      return response.data.data;
    });

    let { data: transactions } = useQuery('transactionsCache', async () => {
        const response = await API.get('/transactions');
        return response.data.data;
    });


    return (
        <>
            <div>
                <div className="backgroundImageFull">
                    <NavbarUser />
                    <Row style={{ paddingLeft: "15rem", paddingRight: "15rem", margin: 0 }}>
                        <Col sm={12}>
                            <h3 className="sentenceSection mt-4">Profile</h3>
                        </Col>
                        <Col className="profileContainer" sm={12}>
                            <Row>
                                <Col sm={9}>
                                    <Row className="mb-3">
                                        <Col sm={1} className="d-flex justify-content-end align-items-center">
                                            <img src={email} style={{ width: "80%", margin: 0 }} alt="" />
                                        </Col>
                                        <Col sm={8}>
                                            <p style={{ margin: 0, color: "black", fontWeight: "bold" }}>{state.user.email}</p>
                                            <p style={{ margin: 0 }} className="text-muted">Email</p>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={1} className="d-flex justify-content-end align-items-center">
                                            <img src={gender} style={{ width: "80%", margin: 0 }} alt="" />
                                        </Col>
                                        <Col sm={8}>
                                            <p style={{ margin: 0, color: "black", fontWeight: "bold" }}>{profile?.gender ? profile?.gender : '-'}</p>
                                            <p style={{ margin: 0 }} className="text-muted">Gender</p>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col sm={1} className="d-flex justify-content-end align-items-center">
                                            <img src={phone} style={{ width: "80%", margin: 0 }} alt="" />
                                        </Col>
                                        <Col sm={8}>
                                            <p style={{ margin: 0, color: "black", fontWeight: "bold" }}>{profile?.phone ? profile?.phone : '-'}</p>
                                            <p style={{ margin: 0 }} className="text-muted">Mobile Number</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={1} className="d-flex justify-content-end align-items-center">
                                            <img src={location} style={{ width: "80%", margin: 0 }} alt="" />
                                        </Col>
                                        <Col sm={8}>
                                            <p style={{ margin: 0, color: "black", fontWeight: "bold" }}>{profile?.address ? profile?.address : '-'}</p>
                                            <p style={{ margin: 0 }} className="text-muted">Location</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={3}>
                                    <div className="d-flex justify-content-center">
                                        <img src={profile?.image} style={{ borderRadius: 5, width: "80%", margin: 0 }} alt="" />
                                    </div>
                                    <div className="d-flex justify-content-center mt-2">
                                        <Button variant="danger"  onClick={() => setEditShow(true)} style={{ borderRadius: 5, width: '80%', alignItems: 'center' }}> Edit Profile </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12}>
                            <h3 className="sentenceSection mt-4">My Books</h3>
                        </Col>
                        <Row>
                            {transactions?.map((item) => (
                                <Col sm="2" key={item.books.id}>
                                    <Card className="mb-3" style={{ backgroundColor: 'transparent', border: 'none' }}>
                                        <Card.Img variant="top" style={{ borderRadius: 1 }} src={process.env.REACT_APP_SERVER_URL_FILE + item?.books[0].thumbnail}/>
                                        <Card.Body style={{ padding: 0 }}>
                                            <p className='bookTitle' style={{ marginTop: '5px', marginBottom: '5px' }}>{item.books[0].title}</p>
                                            <p className='bookAuthor text-muted'>By. {item.books[0].author}</p>
                                            
                                            <Button variant="dark" style={{ borderRadius: 0, width: '100%', alignItems: 'center' }}> <a href={process.env.REACT_APP_SERVER_URL_FILE + item?.books[0].bookattachment} target="_blank" style={{textDecoration:"none", color:"white"}}> Download </a> </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}

                        </Row>
                    </Row>
                </div>
            </div>
            <EditProfile editShow={editShow} setEditShow={setEditShow} />
        </>
    );
}

export default Profile;