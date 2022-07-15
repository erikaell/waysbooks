import { useState } from "react"
import { useQuery } from 'react-query'
import { API } from '../config/api'
import { Link } from 'react-router-dom'
import Slider from "react-slick"
import { Card, Row, Col, Button } from "react-bootstrap"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import convertRp from 'rupiah-format'

function Books() {

    let { data: promobooks } = useQuery('promobooksCache', async () => {
        const response = await API.get('/promobooks');
        return response.data.data;
    });

    console.log(promobooks);

    let { data: books } = useQuery('booksCache', async () => {
        const response = await API.get('/books');
        return response.data.data;
    });

    console.log(books);

    const settings = {
        dots: true,
        autoplay: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1
    }

    return (
        <div className="container">
            <h3 className="sentenceHead">With us, you can shop online & help</h3>
            <h3 className="sentenceHead">save your high street at the same time</h3>
            <div className="mb-5">
                <Slider {...settings}>
                    {promobooks?.map((item) => (
                        <div className="align-items-center">
                            <Card className='m-4 slideCard' key={item.id}>
                                <Row className="align-items-center">
                                    <Col sm={5}>
                                        <img src={item.thumbnail} alt="" className="booksImage" />
                                    </Col>
                                    <Col sm={6}>
                                        <Link style={{ textDecoration: 'none', color:'black' }} to={`/user/book-detail/${item.id}`}>
                                            <p className='bookTitle' style={{ marginTop: '5px', marginBottom: '5px' }}>{item.title}</p>
                                        </Link>
                                        <p className='bookAuthor text-muted'>By. {item.author}</p>
                                        <div className="text-truncate-container">
                                            <p>{item.description}</p>
                                        </div>
                                        <p className='bookPrice' style={{ marginTop: '5px' }}>{convertRp.convert(item.price)}</p>
                                        <Link style={{ textDecoration: 'none', color:'black' }} to={`/user/book-detail/${item.id}`}>
                                        <Button variant="dark" style={{ borderRadius: 0, width: '100%', marginBottom: '5px' }}>Add to Cart</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="bodyBooks">
                <h3 className="sentenceSection">List Book</h3>
                <Row>
                    {books?.map((item) => (
                        <Col sm="2" key={item.id}>
                            <Card className="mb-2" style={{ backgroundColor: 'transparent', border: 'none' }}>
                                <Card.Img variant="top" style={{ borderRadius: 1 }} className="booksImage" src={item.thumbnail} />
                                <Card.Body>
                                    <Link style={{ textDecoration: 'none', color:'black' }} to={`/user/book-detail/${item.id}`}>
                                        <p className='bookTitle' style={{ marginTop: '5px', marginBottom: '5px' }}>{item.title}</p>
                                    </Link>
                                    <p className='bookAuthor text-muted'>By. {item.author}</p>
                                    <p className='bookPrice' style={{ marginTop: '5px' }}>Rp. {convertRp.convert(item.price)}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}

                </Row>
            </div>
        </div>
    );
}
export default Books;