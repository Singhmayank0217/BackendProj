const express = require('express');
const app = express();

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//to pass json body 
app.use(express.json());

//now import the route file and then mount it
const blog = require('./route/blog');

// const { connect } = require('mongoose');
app.use("api/v1", blog);

const dbConnect = require('./config/database');
dbConnect();

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})

app.get("/", (req, res) => {
    res.send(`<h1>This is HomePage<h1>`);
});