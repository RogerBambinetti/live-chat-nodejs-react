import React, { useEffect, useState, useMemo } from 'react';
import socketio from 'socket.io-client';

import api from '../services/api';

import './Chat.css';

export default function Chat() {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sender = 1;
    const receiver = 2;

    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { sender }
    }), [sender]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

    }, []);

    function handleInput(e) {
        e.preventDefault();
        if (input) {
            const message = { sender, receiver, text: input };
            socket.emit('sendMessage', message);
            setInput('');
        }
    }

    return (
        <>
            <div id="messages-container" className="messages-container">
                <div className="received-message-container">
                    <div className="received-message"><p>Olá</p></div>
                </div>

                {messages.map(message => (
                    message.sender === 1 ? (
                        <div className="sended-message-container">
                            <div className="sended-message"><p>{message.text}</p></div>
                        </div>
                    ) : (
                            <div className="received-message-container">
                                <div className="received-message"><p>{message.text}</p></div>
                            </div>
                        )
                ))}

            </div>
            <div className="input-container">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={event => event.key === 'Enter' ? handleInput(event) : null} name="input" id="input" />
                <button type="submit" onClick={handleInput}></button>
            </div>
        </>
    );

}