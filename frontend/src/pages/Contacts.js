import React, { useEffect, useState} from 'react';

import api from '../services/api';

import './Contacts.css';

export default function Contacts({ history, match }) {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function loadContacts() {
            const response = await api.get('/users', { headers: { sender: match.params.sender } });
            setContacts(response.data);
        }
        loadContacts();
    }, [match.params.sender]);

    async function handleRedirect(e) {
        history.push(`/chat/${match.params.sender}/${e.target.id}`);
    }

    return (
        <div className="contacts-container">
            {contacts.map(contact => (
                <div key={contact._id} className="contact-container" id={contact._id} onClick={handleRedirect}>
                    <div className="avatar"></div>
                    <p>{contact.name}</p>
                </div>
            ))}
        </div>
    );

}