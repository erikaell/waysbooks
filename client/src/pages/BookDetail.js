import NavbarUser from "../components/Navbar/NavbarUser"
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { Row, Col, Button } from "react-bootstrap"
import { API } from '../config/api'
import { useShoppingCart } from "use-shopping-cart"
import cart from '../assets/cart-white.svg'
import convertRp from 'rupiah-format'

function BookDetail() {

    let navigate = useNavigate();
    let { id } = useParams();

    const { addItem }   = useShoppingCart();
  
    let { data: book } = useQuery('bookCache', async () => {
      const response = await API.get('/book/' + id);
      return response.data.data;
    });

    const handleCart = (e) => {
        
        e.preventDefault();
        addItem({
            id : book.id,
            author: book.author,
            name : book.title,
            currency : 'USD',
            price : book.price,
            image : book?.thumbnail
        });
        navigate('/user/cart')
        console.log('succes')
    }

    return (
        <>
            <div>
                    <div className="backgroundImageFull">
                        <NavbarUser />
                        <div style={{ paddingLeft:'50px', paddingRight:'50px' }}>
                    <Row className="align-items-center">
                        <Col sm={5}>
                            <div className="justify-content-end d-flex me-0">
                            <img src={book?.thumbnail} alt="" className="booksImageDetail" />
                            </div>
                        </Col>
                        <Col sm={6}>
                            <p className='bookTitleDetail' style={{ marginTop: '5px', marginBottom: '5px' }}>{book?.title}</p>
                            <p className='bookAuthorDetail text-muted'>{book?.author}</p>
                            <p className='detailTitle mb-1'>Publication Date</p>
                            <p className='detailSentence text-muted mb-2'>{book?.publicationdate}</p>
                            <p className='detailTitle mb-1'>Pages</p>
                            <p className='detailSentence text-muted mb-2'>{book?.pages}</p>
                            <p className='detailTitle mb-1 text-danger'>ISBN</p>
                            <p className='detailSentence text-muted mb-2'>{book?.isbn}</p>
                            <p className='detailTitle mb-1'>Price</p>
                            <p className='detailSentence text-success mb-2' style={{ fontWeight:'bold' }}>{convertRp.convert(book?.price)}</p>
                        </Col>
                    <Col sm={3}>
                    </Col>    
                    <Col sm={6}>
                    <h3 className="sentenceSection mt-4">About This Book</h3>
                    <p>{book?.description}</p>
                    <div className="justify-content-end d-flex">
                    <Button onClick={handleCart} variant="dark" style={{ borderRadius: 0, width:'20%', alignItems: 'center', marginBottom:'10px' }}> Add Cart <img src={cart} style={{marginBottom:'2px', marginLeft:'2px'}} alt="" /></Button>
                    </div>
                    </Col>
                    </Row>
                        </div>
                </div>
            </div>
        </>
    );
}

export default BookDetail;