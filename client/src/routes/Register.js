import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:8080/api/register",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            }
        )
        const data = await response.JSON()
        console.log(data)
    }

    const navigate = useNavigate();
    return (
        <div style={style.container} >
            <div style={style.form} >
                <h1>Register</h1>
                <form onSubmit={registerUser} >
                    <input value={username} type='text' onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    <br />
                    <input value={email} type='email' onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <br />
                    <input value={password} type='password' onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <br />
                    <button type='submit' value="Register" > Submit </button>
                </form>
            </div>
            <div style={style.button} >
                <button style={{ padding: 5, marginLeft: '20px', borderRadius: '15px' }} onClick={() => navigate('/login')} type='button' >Login</button>
                <br />
            </div>
        </div>
    )
}

const style = {
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
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

export default Register