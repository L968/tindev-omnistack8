import React, { useState } from 'react';
import api from '../../services/api';

import './style.css';
import Logo from '../../assets/logo.svg';

export default function Login({ history }) {

    const[username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/dev', { username });

        if (response.status !== 200) {
            console.log(response.data.message);
            return;
        }

        localStorage.setItem('userId', response.data._id);

        history.push('/main');
    }

    return(
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={Logo} alt="logo"/>
                <input
                    placeholder="Submit your Github username"
                    value={username}
                    onChange={ e => setUsername(e.target.value) }
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );

}