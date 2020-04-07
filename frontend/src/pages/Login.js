import React, { useEffect, useState, useMemo } from 'react';

import api from '../services/api';

import './Login.css';

export default function Chat({ history }) {

    const [name, setName] = useState('');

    async function handleLogin(e) {
        e.preventDefault();
        const response = await api.post('/users', { name });
        history.push(`/chat/${response.data._id}`);
    }

    return (
        <div className="container">
            <form action="">
                <label htmlFor="">Name</label>
                <input type="text" name="name" id="name" onChange={e => setName(e.target.value)} />
                <button type="submit" onClick={handleLogin}>Enter</button>
            </form>
        </div>
    );

}