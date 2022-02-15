import express from "express";
import cors from 'cors';
import Connection from "./component/db.js";
import User from "./models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 8080;

Connection();

app.use(cors());
app.use(express.json())

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: newPassword,
        })
        res.json({ status: 'ok' })

    } catch (error) {
        console.log(error);
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
    })

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid login' })
    }

    isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if (isPasswordValid) {

        const token = jwt.sign({
            username: user.username,
            email: user.email,
        }, 'secretSecretSECRET123')

        return res.json({ status: 'ok', user: token })
    }
    else {
        return res.json({ status: 'error', user: false })
    }

})

app.get('/api/quote', async (req, res) => {

    const token = req.header['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secretSecretSECRET123')
        const username = decoded.username
        const user = await User.findOne({ username: username })

        return res.json({ status: 'ok', quote: user.quote })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }

})

app.post('/api/quote', async (req, res) => {

    const token = req.header['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secretSecretSECRET123')
        const username = decoded.username
        const user = await User.updateOne(
            { username: username },
            { $set: { quote: req.body.quote } }
        )

        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }

})


app.listen(PORT, () => {
    console.log('Express Server is running on port ' + PORT)
})