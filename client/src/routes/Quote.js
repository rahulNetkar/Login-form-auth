import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();
    const [quote, setquote] = useState('')
    const [tempQuote, setTempquote] = useState('')

    const populateQuote = async () => {
        const req = await fetch('http://localhost:8080/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setquote(data.quote)
        } else {
            alert(data.error)
        }

    }

    const updateQuote = async (event) => {
        event.preventDefault()

        const req = await fetch('http://localhost:8080/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                quote: tempQuote
            })
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setquote(tempQuote)
            setTempquote('')
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                navigate('/login')
            }
            else {
                populateQuote()
            }
        }
    }, [])

    return (
        <div>
            <h1>Your Quote: {quote || "No quote found"}</h1>
            <form onSubmit={updateQuote} >
                <input type='text' placeholder='Quote' value={tempQuote} onChange={(e) => setTempquote(e.target.value)} />
                <button type='submit' value='Update Quote' >Update Quote</button>
            </form>
        </div>
    )
}

export default Dashboard;