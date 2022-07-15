import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import dateFormat from 'dateformat'
import { API } from '../config/api'
import NavbarAdmin from "../components/Navbar/NavbarAdmin"
import { Row, Col, Button, Table } from "react-bootstrap"
import DeleteData from '../components/Modal/DeleteData'
import convertRp from 'rupiah-format'

function BookList() {
    let navigate = useNavigate();

    let { data: books, refetch } = useQuery('booksCache', async () => {
        const response = await API.get('/books');
        return response.data.data;
      });
    
      console.log(books);

      const addProduct = () => {
        navigate('/admin/add-book');
      };

  // Create variabel for id product and confirm delete data with useState here ...
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Create init useState & function for handle show-hide modal confirm here ...
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    // Create function handle get id product & show modal confirm delete data here ...
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };


  // Create function for handle delete product here ...
  // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/book/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  // Call function for handle close modal and execute delete data with useEffect here ...
  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

    return (
        <>
            <div>
                <div className="backgroundImageFull">
                    <NavbarAdmin />
                    <Row style={{ paddingLeft: "5rem", paddingRight: "5rem", margin: 0 }}>
                        <Col>
                            <h3 className="sentenceSection mb-4">List Books</h3>
                        </Col>
                        <Col className="text-end">
                            <Button
                                className="btn-dark"
                                style={{ width: '100px' }}
                                onClick={addProduct}
                            >
                                Add
                            </Button>
                        </Col>
                        <Col xs="12">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%' }}>No</th>
                                            <th style={{ width: '5%' }}>Image</th>
                                            <th style={{ width: '5%' }}>Title</th>
                                            <th style={{ width: '5%' }}>Publication Date</th>
                                            <th style={{ width: '5%' }}>Pages</th>
                                            <th style={{ width: '5%' }}>ISBN</th>
                                            <th style={{ width: '5%' }}>Price</th>
                                            <th style={{ width: '20%' }}>About</th>
                                            <th style={{ width: '5%' }}>Promo Book</th>
                                            <th style={{ width: '5%' }}>Book File</th>
                                            <th style={{ width: '15%' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><img src={item.thumbnail} style={{ width: '80px', height: '80px', objectFit: 'cover' }} alt={item.title} /></td>
                                                <td>{item.title}</td>
                                                <td>{dateFormat(item.publicationdate, 'dddd, d mmmm yyyy')}</td>
                                                <td>{item.pages}</td>
                                                <td>{item.isbn}</td>
                                                <td>{convertRp.convert(item.price)}</td>
                                                <td style={{ overflow:"auto" }}>{item.description}</td>
                                                <td>{item.promobook}</td>
                                                <td><a target="_blank" href={item.bookattachment} className="btnHere">Book-File.pdf</a></td>
                                                <td>
                                                {/* <Button variant="success" className="button-table">Edit</Button> */}
                                                <Button variant="danger" onClick={() => { handleDelete(item.id); }} className="ms-2 button-table">Delete</Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                        </Col>
                    <DeleteData
                        setConfirmDelete={setConfirmDelete}
                        show={show}
                        handleClose={handleClose}
                    />
            </Row>
        </div>
                </div>
        </>
    );
}

export default BookList;