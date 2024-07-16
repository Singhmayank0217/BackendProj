// const express = require('express');
// const app = express();

// //load config from env file
// require('dotenv').config();
// const PORT = process.env.PORT || 4000;
// //to fetch data from body we use parse method
// app.use(express.json()); //middleware to parse json body of requests

// //imports routes for todo api
// const todosRoutes = require('./route/todos');
// //mount the api routes
// app.use('/api/v1', todoRoutes);
// // start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })
// //connect with database
// const dbConnect= require('./config/database');
// dbConnect();

// //default route
// app.get("/", (req, res) =>{
//     res.send(`<h1>This is HomePage<h1>`);
//     })
const express = require('express');
const app = express();
//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
const todoRoutes = require('./route/todos');

app.use('/api/v1', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const dbConnect = require('./config/database');
dbConnect();

app.get("/", (req, res) => {
    res.send(`<h1>This is HomePage<h1>`);
});
 