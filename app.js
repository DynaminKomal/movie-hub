const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const router = require('./router');
const { sendResponse } = require('./utility/response-utility');
const cookieParser = require('cookie-parser');

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

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


// All API Route
app.use('/api',router)

app.all("*", (req, res, next) => {
    sendResponse(res, 404, "fail", `Can't find ${req.originalUrl} on this server!`)
})


module.exports = app;