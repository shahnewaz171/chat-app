/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { FaPaperPlane, FaSmile, FaPaperclip } from "react-icons/fa";
import { useLocation, useParams } from 'react-router-dom';
import { DataContext } from '../../App';
import ScrollToBottom from 'react-scroll-to-bottom';
import moment from 'moment';
import JoinRoomModal from '../JoinRoomModal/JoinRoomModal';
import './Chats.css';
import { ROOT_CSS } from '../Shared/CustomStyles';
import Footer from '../Shared/Footer/Footer';

const Chats = () => {
    const { socket } = useContext(DataContext);
    const { roomID } = useParams();
    const { pathname } = useLocation();
    const [openModal, setOpenModal] = useState(false);
    const [room, setRoom] = useState('');
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [currentSocketID, setCurrentSocketId] = useState('');

    useEffect(() => {
        if (roomID) {
            setMessages([]);
            socket.emit('join_room', roomID);
        }
        else if (pathname === '/') {
            socket.emit('join_room', pathname);
        }
    }, [roomID, pathname]);

    useEffect(() => {
        const handler = (item) => {
            console.log(item)
            setMessages((data) => [...data, item]);
            setCurrentSocketId(socket.id);
        }

        socket.on('received_message', handler);

        return () => socket.off('received_message', handler);
    }, [socket]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (currentMessage !== "") {
            const messageData = {
                room: roomID ? roomID : null,
                pathname: pathname === '/' ? pathname : null,
                socketId: socket.id,
                message: currentMessage,
                time: moment().format('LLL')
            }
            const result = await socket.emit('send_message', messageData);
            setMessages((data) => [...data, messageData]);
            if (result) {
                e.target.reset();
            }
        }
    }

    return (
        <section style={{ backgroundColor: '#eee', minHeight: '100vh' }}>
            <div className="container py-5">

                <div className="row d-flex justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-6">
                        <div className="card" id="chat2">
                            <div className="card-header p-3">
                                {pathname === `/room/${roomID}` ?
                                    <h2 style={{ textAlign: 'center' }}>Room: {roomID}</h2>
                                    :
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <h5 className="mb-0">Chat App</h5>
                                        <button onClick={() => setOpenModal(true)} type="button" className="btn btn-primary btn-sm" data-mdb-ripple-color="dark">Create Custom Room</button>
                                    </div>
                                }
                            </div>

                            <ScrollToBottom className={ROOT_CSS}>
                                <div className="card-body">
                                    {messages?.map((msg, index) => {
                                        if ((currentSocketID !== '' && msg.socketId !== currentSocketID)) {
                                            return (
                                                <div key={index} className="d-flex flex-row justify-content-start">
                                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                                                        alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                                                    <div>
                                                        <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: '#f5f6f7' }}>{msg.message}</p>
                                                        <p className="small ms-3 mb-3 rounded-3 text-muted">Others</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else if ((msg.socketId === currentSocketID || currentSocketID === '')) {
                                            return (
                                                <div key={index} className="d-flex flex-row justify-content-end mb-4">
                                                    <div>
                                                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{msg.message}</p>
                                                        <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">You</p>
                                                    </div>
                                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                                                </div>
                                            )
                                        }
                                    })}

                                    {/* <div className="divider d-flex align-items-center mb-4">
                                    <p className="text-center mx-3 mb-0" style={{ color: '#a2aab7' }}>Today</p>
                                </div> */}
                                </div>
                            </ScrollToBottom>

                            <form onSubmit={sendMessage} className="card-footer text-muted d-flex justify-content-start align-items-center p-3" style={{ background: '#ffffff' }}>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                    alt="avatar 3" style={{ width: '45px', height: '100%' }} />
                                <input type="text" onChange={(e) => setCurrentMessage(e.target.value)} className="form-control form-control-lg" id="exampleFormControlInput1" placeholder="Type message" style={{ fontSize: '16px' }} required />
                                {/* <span className="ms-2 text-muted" style={{ cursor: 'pointer' }}><FaPaperclip /></span>
                                <span className="ms-2 text-muted" style={{ cursor: 'pointer' }}><FaSmile /></span> */}
                                <button type='submit' className="ms-2 text-muted me-3" style={{ cursor: 'pointer', border: '0px', background: "#fff" }}><FaPaperPlane /></button>
                            </form>

                        </div>
                    </div>
                </div>

            </div>

            {
                <JoinRoomModal openModal={openModal} setOpenModal={setOpenModal} room={room} setRoom={setRoom} />
            }
            {
                <Footer />
            }
        </section>
    );
};

export default Chats;