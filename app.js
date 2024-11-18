const express = require('express');
const fs = require('fs');
const cors = require('cors');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const router = require('./router');
const { sendResponse } = require('./utility/response-utility');

const app = express();

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan('tiny'))
}

app.use(cors({
    origin: '*', // Allow this origin
}));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize())

const bannerData = JSON.parse(fs.readFileSync(`${__dirname}/Data/banner.json`, 'utf-8'));

// get all banner data
app.get('/api/banner', (req, res) => {
    res.status(200).json({
        status: 200,
        data: bannerData,
        message: "Data successfully fetched!"
    })
})


// All API Route
app.use('/api',router)

app.all("*", (req, res, next) => {
    sendResponse(res, 404, "fail", `Can't find ${req.originalUrl} on this server!`)
})


module.exports = app;