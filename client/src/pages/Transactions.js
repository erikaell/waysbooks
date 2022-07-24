import { useState } from "react"
import NavbarAdmin from "../components/Navbar/NavbarAdmin"
import { Row, Col, Button, Table } from "react-bootstrap"
import dataBooks from '../dummyData/books'
import { useQuery } from 'react-query'
import { API } from '../config/api'

function Transactions() {
    const [datas] = useState(dataBooks)

    let { data: transactions } = useQuery('transactionsCache', async () => {
        const response = await API.get('/transactionsadmin');
        return response.data.data;
      });

    return (
        <>
            <div>
                <div className="backgroundImageFull">
                    <NavbarAdmin />
                    <Row style={{ paddingLeft: "5rem", paddingRight: "5rem", margin: 0 }}>
                        <Col>
                            <h3 className="sentenceSection mb-4">Incoming Transactions</h3>
                        </Col>
                        <Col xs="12">
                            <Table striped bordered hover>
                                <thead>
                                    <tr className="text-danger">
                                        <th>No</th>
                                        <th>Users</th>
                                        <th>Transactions Number</th>
                                        <th>Total Payment</th>
                                        <th>Status Payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.buyer.name}</td>
                                            <td>{item.id}</td>
                                            <td>{item.totalpayment}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default Transactions;