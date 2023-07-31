const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');

const app = express();
const port = 4000;

let subscribedEmails = ['forbidden@gmail.com'];

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

const COMMUNITY_DATA = [
    {
        id: uuid(),
        name: "Larry",
        photo: "https://via.placeholder.com/150x150",
        resume: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis posuere odio, eget pellentesque ipsum.",
        company: {
            name: "Facebook",
            role: "Manager"
        }
    },
    {
        id: uuid(),
        name: "Mathew",
        photo: "https://via.placeholder.com/150x150",
        resume: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis posuere odio, eget pellentesque ipsum.",
        company: {
            name: "Apple",
            role: "Tester"
        }
    },
    {
        id: uuid(),
        name: "Camilo",
        photo: "https://via.placeholder.com/150x150",
        resume: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis posuere odio, eget pellentesque ipsum.",
        company: {
            name: "Google",
            role: "Developer"
        }
    }
];

app.get('/community', (req, res) => res.send(COMMUNITY_DATA));


app.get('/community/:id', (req, res) => {
    const { id } = req.params;
    const user = COMMUNITY_DATA.find((item) => item.id === id);
    if (!user) res.status(404).json({ "error": "User not found" });
    res.send(user);
});

app.post('/subscribe', (req, res) => {
    const { data } = req.body;
    if (!data) res.status(422).json({ "error": "Email is required" });
    
    if (subscribedEmails.includes(data)) {
        res.status(422).json({ "error": "Email is already in use" });
    } else {
        subscribedEmails.push(data);
        res.send({ "message": "Thank you for subscribing!" });
    }
});

app.post('/unsubscribe', (req, res) => {
    const { data } = req.body;
    if (!data) res.status(422).json({ "error": "Email is required" });
    if (subscribedEmails.includes(data)) {
        const index = subscribedEmails.findIndex((item) => item === data);
        if (index !== -1) {
            subscribedEmails.splice(index, 1);
        }
        res.send({ "message": "We will miss you!" });
    } else {
        res.status(422).json({ "error": "Email does not exist" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:4000`)
});