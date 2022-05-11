import React, { useContext, useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { GiCancel } from 'react-icons/gi';
import { modalStyle } from '../Shared/CustomStyles';
import { DataContext } from '../../App';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import './JoinRoomModal.css';

const JoinRoomModal = ({ openModal, setOpenModal, room, setRoom }) => {
    const { socket } = useContext(DataContext);
    const navigate = useNavigate();

    const changeRoom = (e) => {
        setRoom(e.target.value);
    }

    const createRoom = (e) => {
        e.preventDefault();
        if (room !== '') {
            socket.emit("create_room", room);
            setOpenModal(false);
            e.target.reset();
            navigate(`/room/${room}`);
        }
    }

    return (
        <>
            <Modal
                isOpen={openModal}
                onRequestClose={() => setOpenModal(false)}
                contentLabel="Example Modal"
                className="createRoom-modal"
            >
                <div className='modal-details' style={modalStyle}>
                    <h2 style={{ marginTop: '15px' }}>Create Room</h2>
                    <p className='close-btn' onClick={() => setOpenModal(false)}>
                        <GiCancel />
                    </p>
                    <form onSubmit={createRoom}>
                        <div class="form-outline mb-4">
                            <input type="text" onChange={(e) => changeRoom(e)} on id="form3Example3" class="form-control form-control-lg" placeholder="Enter a room id" required />
                        </div>
                        <button type="submit" class="btn btn-primary btn-sm" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', fontWeight: 600, fontSize: '16px' }}>Submit</button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default JoinRoomModal;