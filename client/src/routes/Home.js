import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();

    return (
        <div style={style.container} >
            <div style={style.btncontainer}>
                <button style={style.button} onClick={() => navigate('/login')} type='button' >Login</button>
                <button style={style.button} onClick={() => navigate('/register')} type='button' >Register</button>
            </div>
        </div>
    )
}

const style = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
    },
    button: {
        padding: 20,
        marginLeft: '20px',
        borderRadius: '15px'
    },
    btncontainer: {

    }
}

export default Home