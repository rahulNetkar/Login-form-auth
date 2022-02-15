import express from "express";
import cors from 'cors';
import Connection from "./component/db.js";
import User from "./models/User.js";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 8080;

Connection();

app.use(cors());
app.use(express.json())

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error);
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })
    if (user) {
        console.log(user)
        return res.json({ status: 'ok', user: true })
    }
    else {
        return res.json({ status: 'error', user: false })
    }

})


app.listen(PORT, () => {
    console.log('Express Server is running on port ' + PORT)
})