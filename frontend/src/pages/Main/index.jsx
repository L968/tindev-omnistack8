import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import api from '../../services/api';

import Logo from '../../assets/logo.svg';
import Like from '../../assets/like.svg';
import ItsAMatch from '../../assets/itsamatch.png';
import Dislike from '../../assets/dislike.svg';
import './style.css';

export default function Main() {
    const userId = localStorage.getItem('userId');

    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/dev', {
                headers: {
                    userid: userId
                }
            });

            setUsers(response.data);
        }

        loadUsers();
    }, [userId]);

    useEffect(() => {
        const socket = io('http://localhost:3000', { query: { userId } });

        socket.on('match', dev => {
            console.log(dev);
            setMatchDev(dev);
        });
    }, [userId]);

    async function handleLike(id) {
        const response = await api.post(`/dev/${id}/like`, null, {
            headers: {
                userId
            }
        });

        if (response.status === 200) {
            setUsers(users.filter(user => user._id !== id));
        }
    }

    async function handleDislike(id) {
        const response = await api.post(`/dev/${id}/dislike`, null, {
            headers: {
                userId
            }
        });

        if (response.status === 200) {
            setUsers(users.filter(user => user._id !== id));
        }
    }

    return (
        <div className='main-container'>
            <Link to='/'>
                <img src={Logo} alt="logo" />
            </Link>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />

                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>

                            <div className="buttons">
                                <button onClick={() => handleDislike(user._id)}>
                                    <img src={Dislike} alt="dislike" />
                                </button>
                                <button onClick={() => handleLike(user._id)}>
                                    <img src={Like} alt="like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                    <div className="empty">The end :(</div>
                )}

            {matchDev && (
                <div className="match-container">
                    <img src={ItsAMatch} alt="It's a Match" />
                    <img className="avatar" src={matchDev.avatar} alt="Match Avatar" />
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>
                    <button onClick={() => setMatchDev(false)}>Close</button>
                </div>
            )}
        </div>
    );

}