const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.use(express.json());
//database connect
require("./config/database").connect();

//route and mount 
const user = require("./routes/user");
app.use("/api/v1", user);

//activate

app.listen(PORT, () => {
    console.log(`App is Listening at ${PORT}`);
})