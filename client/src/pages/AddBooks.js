import { useState, useEffect } from "react"
import NavbarAdmin from "../components/Navbar/NavbarAdmin"
import { Row, Col, Button, Form } from "react-bootstrap"
import pin from '../assets/pin.svg'
import book from '../assets/add-book-.svg'
import { useNavigate } from 'react-router'
import { useMutation } from 'react-query'
import { API } from '../config/api'


function AddBooks() {

    let navigate = useNavigate();

    const [preview, setPreview] = useState(null); //For image preview
    const [file, setFile] = useState(null); //For image preview
    const [form, setForm] = useState({
        title: '',
        publicationdate: '',
        pages: '',
        isbn: '',
        author: '',
        price: '',
        description: '',
        promobook: '',
        bookattachment: '',
        thumbnail: '',
    }); //Store book data
    
    
    // Handle change data on form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value,
        });
    };
    
    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
    
            // Configuration
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };
    
            // Store data with FormData as object
            const formData = new FormData();
            formData.set('title', form.title);
            formData.set('publicationdate', form.publicationdate);
            formData.set('pages', form.pages);
            formData.set('isbn', form.isbn);
            formData.set('author', form.author);
            formData.set('price', form.price);
            formData.set('description', form.description);
            formData.set('promobook', form.promobook);
            formData.set('bookattachment', form.bookattachment[0], form.bookattachment[0].name);
            formData.set('thumbnail', form.thumbnail[0], form.thumbnail[0].name);
    
            console.log(form);
    
            // Insert product data
            const response = await API.post('/book', formData, config);
            console.log(response);
    
            navigate('/admin/book-list');
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <>
            <div>
                <div className="backgroundImageFull">
                    <NavbarAdmin />
                    <Row style={{ paddingLeft: "5rem", paddingRight: "5rem", margin: 0 }}>
                        <Col>
                            <h3 className="sentenceSection mb-4">Add Book</h3>
                        </Col>
                        <Col sm="12">
                            <Form onSubmit={(e) => handleSubmit.mutate(e)} className="form">
                                <Form.Group>
                                    <Form.Control type="text" onChange={handleChange} name="title" placeholder="Title" className='mt-3'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="date" onChange={handleChange} name="publicationdate" placeholder="Publication Date" className='mt-3'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="number" onChange={handleChange} name="pages" placeholder="Pages" className='mt-3'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="number" onChange={handleChange} name="isbn" placeholder="ISBN" className='mt-3'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="text" onChange={handleChange} name="author" placeholder="Author" className='mt-3'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="number" onChange={handleChange} name="price" placeholder="Price" className='mt-3'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control as="textarea" onChange={handleChange} name="description" rows={3} placeholder="Product Description" className='mt-3'></Form.Control>
                                </Form.Group>
                                <Form.Select aria-label="Default select example" onChange={handleChange} name="promobook" className="mt-3">
                                    <option>Is this book on promo?</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Select>
                                <Col>
                                    {/* {preview && (
                                        <div>
                                            <img
                                                src={preview}
                                                style={{
                                                    maxWidth: '150px',
                                                    maxHeight: '150px',
                                                    objectFit: 'cover',
                                                    marginTop: '15px'
                                                }}
                                                alt={preview}
                                            />
                                        </div>
                                    )} */}
                                    <input
                                        type="file"
                                        id="bookattachment"
                                        name="bookattachment"
                                        hidden
                                        onChange={handleChange}
                                    />
                                    <label for="bookattachment" className="label-file-add-book">
                                        Attach Book File <img src={pin} style={{ marginBottom: '2px', marginLeft: '2px', width: '10%' }} alt="" />
                                    </label>
                                </Col>
                                <Col>
                                {/* {preview && (
                                        <div>
                                            <a
                                                href={preview}
                                                target="_blank"
                                                className="btnHere"
                                                alt={preview}
                                                style={{
                                                    marginTop: '15px'
                                                }}
                                            />
                                        </div>
                                    )} */}
                                    <input
                                        type="file"
                                        id="thumbnail"
                                        name="thumbnail"
                                        hidden
                                        onChange={handleChange}
                                    />
                                    <label for="thumbnail" className="label-file-add-book">
                                        Attach Book Cover <img src={pin} style={{ marginBottom: '2px', marginLeft: '2px', width: '10%' }} alt="" />
                                    </label>
                                </Col>
                                <div className="justify-content-end d-flex">
                                    <Button variant="dark" type="submit" style={{ borderRadius: 0, width: '10%', alignItems: 'center', marginBottom: '10px' }}> Add Book <img src={book} style={{ marginBottom: '2px', marginLeft: '2px' }} alt="" /></Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default AddBooks;