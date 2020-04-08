import React, { useEffect, useState, useMemo } from 'react';

import api from '../services/api';

import './Contacts.css';

export default function Contacts() {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function loadContacts() {
            const response = await api.get('/users', { headers: { sender: localStorage.getItem('sender') } });
            setContacts(response.data);
        }
        loadContacts();
    }, []);

    async function handleRedirect(e) {
        e.preventDefault();

    }

    return (
        <div className="contacts-container">
            {contacts.map(contact => (
                <div className="contact-container">
                    <div className="avatar"></div>
                    <p>{contact.name}</p>
                </div>
            ))}
        </div>
    );

}