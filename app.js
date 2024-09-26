const express = require('express');
const fs = require('fs')

const port = 8005

const app = express();

app.use(express.json())

app.listen(port,()=>{
    console.log("App listening port", port)
})