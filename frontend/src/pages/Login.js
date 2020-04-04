import React, { useEffect, useState, useMemo } from 'react';

import api from '../services/api';

import './Login.css';

export default function Chat() {

    const [input, setInput] = useState('');

    return (
        <div className="container">
            <form action="">
                <label htmlFor="">User</label>
                <input type="text" name="" id="" />
                <label htmlFor="">Password</label>
                <input type="password" name="" id="" />
            <button type="submit">Enter</button>    
            </form>
        </div>
    );

}