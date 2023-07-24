const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

let subscribedEmails = ['forbidden@gmail.com'];

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/community', (req, res) => {
    res.send({
        "description": "We're proud of our products, and we're really excited when we get feedback from our users.",
        "data": [
            {
                "name": "Larry",
                "photo": "",
                "resume": "Lorem ipsilum",
                "company": {
                    "name": "Facebook",
                    "role": "Manager"
                }
            },
            {
                "name": "Mathew",
                "photo": "",
                "resume": "Lorem ipsilum",
                "company": {
                    "name": "Apple",
                    "role": "Tester"
                }
            },
            {
                "name": "Camilo",
                "photo": "",
                "resume": "Lorem ipsilum",
                "company": {
                    "name": "Google",
                    "role": "Developer"
                }
            }
        ]
    })
});

app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    if (subscribedEmails.includes(email)) {
        res.status(422).json({ "error": "Email is already in use" });
    } else {
        subscribedEmails.push(email);
        res.send({ "message": "Thank you for subscribing!" });
    }
});

app.post('/unsubscribe', (req, res) => {
    const { email } = req.body;
    if (subscribedEmails.includes(email)) {
        const index = subscribedEmails.findIndex((item) => item === email);
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