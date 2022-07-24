// import hook
import React, { useState, useEffect, useContext } from 'react'

import { Container, Row, Col } from 'react-bootstrap'


// import here
import Chat from '../components/Complain/Chat'
import Contact from '../components/Complain/Contact'
import NavbarAdmin from '../components/Navbar/NavbarAdmin'

import { UserContext } from '../context/userContext'

// import socket.io-client 
import {io} from 'socket.io-client'

// initial variable outside socket
let socket
export default function ComplainAdmin() {
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    // code here
    const [messages, setMessages] = useState([])

    // code here
    const [state] = useContext(UserContext)

    useEffect(() =>{
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            }
        })

        // code here
        socket.on("new message", () => {
            socket.emit('load messages', contact?.id)
        })

        loadContacts()
        // code here
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages]) // code here

    const loadContacts = () => {
        socket.emit("load customer contacts")
        socket.on("customer contacts", (data) => {
            // filter just customers which have sent a message
            let dataContacts = data.map((item) => ({
                ...item,
                message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length - 1].message : 'Click here to start message'
            }))
            
            // manipulate customers to add message property with the newest message
            // code here
            setContacts(dataContacts)
        })
    }

    // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
        // code here
        socket.emit('load messages', data.id)
    }

    // code here
    const loadMessages = () => {
        socket.on('messages', async (data) => {
            if(data.length > 0){
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    message: item.message
                }))
                setMessages(dataMessages)

                loadContacts()
            }else{
                setMessages([])
                loadContacts()
            }
        })
    }

    const onSendMessage = (e) => {
        if(e.key == "Enter"){
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }

            socket.emit('send message', data)
            e.target.value = ''
        }
    }

    return (
        <>
                    <div>
                        <div className="backgroundImageFull">
                    <NavbarAdmin />
            <Container fluid style={{height: '89.5vh', paddingLeft:"100px", paddingRight:"100px" }}>
                <Row>
                    <Col md={3} style={{height: '89.5vh'}} className="px-3 overflow-auto">
                        <Contact style={{backgroundColor: "#dfdfdf", borderRadius: "5px"}}  dataContact={contacts} clickContact={onClickContact} contact={contact}/>
                    </Col>
                    <Col md={9} style={{height: '89.5vh', backgroundColor: "#dfdfdf", borderRadius: "5px" }} className="px-3 overflow-auto">
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage}  />
                    </Col>
                </Row>
            </Container>
            </div>
            </div>
        </>
    )
}
