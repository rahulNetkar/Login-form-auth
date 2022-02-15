import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8080/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();
        console.log(data);
    }

    const navigate = useNavigate();
    return (
        <div style={style.container} >
            <div style={style.form} >
                <h1>Login</h1>
                <form onSubmit={loginUser} >
                    <input value={username} type='text' onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    <br />
                    <input value={password} type='password' onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <br />
                    <button type='submit' > Submit </button>
                </form>
            </div>
            <div style={style.button} >
                <button style={{ padding: 5, marginLeft: '20px', borderRadius: '15px' }} onClick={() => navigate('/register')} type='button' >Register</button>
                <br />
            </div>
        </div>
    )
}

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
    },
    form: {
        margin: 20
    },
    button: {
        margin: 20,
        display: 'flex',
    }
}

export default Login