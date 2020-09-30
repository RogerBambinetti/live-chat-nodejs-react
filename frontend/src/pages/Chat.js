import React, { useEffect, useState, useMemo } from 'react';
import { FiSend } from 'react-icons/fi';
import socketio from 'socket.io-client';


import './Chat.css';

export default function Chat({ match }) {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sender = match.params.sender;
    const receiver = match.params.receiver;

    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { sender }
    }), [sender]);

    useEffect(() => {
        socket.on('message', message => {
            if (message.sender === sender || message.sender === receiver) {
                setMessages(messages => [...messages, message]);
            }
        });

    }, [receiver, sender, socket]);

    function handleInput(e) {
        e.preventDefault();
        if (input) {
            const message = { sender, receiver, text: input };
            socket.emit('sendMessage', message);
            setInput('');
        }
    }

    return (
        <div className="chat-container">
            <div id="messages-container" className="messages-container">

                {messages.map((message, index) => (
                    message.sender === sender ? (
                        <div key={index} className="sended-message-container">
                            <div className="sended-message"><p>{message.text}</p></div>
                        </div>
                    ) : (
                            <div key={index} className="received-message-container">
                                <div className="received-message"><p>{message.text}</p></div>
                            </div>
                        )
                ))}

            </div>
            <div className="input-container">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={event => event.key === 'Enter' ? handleInput(event) : null} name="input" id="input" />
                <button type="submit" onClick={handleInput}>
                    <FiSend size={25} color="#F2F2F2" />
                </button>
            </div>
        </div>
    );

}