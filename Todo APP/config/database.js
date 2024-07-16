const mongoose = require('mongoose');

//every thing that is defined inside the enviroment will get load inside the process
require("dotenv").config();
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connection successful");
    })
    .catch((error) => {
        console.log("Received an error:", error);
        process.exit(1);
    });
}
module.exports = dbConnect;


// the main purpose is to ensure the connection between the database and the application

// const mongoose = require("mongoose");
// require("dotenv").config();

// const dbConnect = () => {
//     mongoose.connect(process.env.DATABASE_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log("Connection successful");
//     })
//     .catch((error) => {
//         console.log("Received an error:");
//         console.error(error);
//         process.exit(1);
//     });
// }
// module.exports = dbConnect;