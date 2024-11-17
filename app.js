const express = require('express');
const fs = require('fs');
const cors = require('cors');
const morgan = require('morgan')

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan('tiny'))
}

app.use(cors({
    origin: '*', // Allow this origin
}));

const bannerData = JSON.parse(fs.readFileSync(`${__dirname}/Data/banner.json`, 'utf-8'));

// get all banner data
app.get('/api/banner', (req, res) => {
    res.status(200).json({
        status: 200,
        data: bannerData,
        message: "Data successfully fetched!"
    })
})


module.exports = app;