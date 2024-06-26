const express = require('express');
const app = express();
var cors = require('cors');
const port = 3000;

app.use(cors());

var corsOptions = {
    origin: 'http://localhost:5173',
};

// fake api to get weather info
app.get('/weather', cors(corsOptions), (req, res) => {
    return res.json({
        temp: 82,
        humidity: 41,
        conditions: 'Partly Cloudy',
        wind: 3,
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
