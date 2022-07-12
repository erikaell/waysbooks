import { Modal, Alert } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { useMutation } from 'react-query'
import { API } from '../../config/api'

export default function Register({ registerHere, registerShow, setRegisterShow }) {

    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration Content-type
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            // Data body
            const body = JSON.stringify(form);

            // Insert data user to database
            const response = await API.post('/register', body, config);

            // Notification
            if (response.data.status === 'success...') {
                const alert = (
                    <Alert variant="success" className="py-1">
                        Success
                    </Alert>
                );
                setMessage(alert);
                setForm({
                    name: '',
                    email: '',
                    password: '',
                });
            } else {
                const alert = (
                    <Alert variant="danger" className="py-1">
                        Failed
                    </Alert>
                );
                setMessage(alert);
            }
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Failed
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    });

    return (
        <>
            <Modal show={registerShow} onHide={() => setRegisterShow(false)} centered>
                <Modal.Body className="text-dark">
                    <h3 className="sentenceHead" style={{ textAlign: "left", fontWeight: "bold" }}>
                        Register
                    </h3>
                    {message && message}
                    <div className="mt-2">
                        <form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <div className="mt-3 form">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    name="name"
                                    onChange={handleChange}
                                    className="px-3 py-2 mt-3"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    name="email"
                                    onChange={handleChange}
                                    className="px-3 py-2 mt-3"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    name="password"
                                    onChange={handleChange}
                                    className="px-3 py-2 mt-3"
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button className="btn btnLogin">Register</button>
                            </div>
                            <p className="mt-3">Already have an account? Click <a onClick={registerHere} className="btnHere" >here</a></p>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
