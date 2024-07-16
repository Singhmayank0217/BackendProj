const mongoose = require("mongoose");

require("dotenv").config();// to load the env file
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