const express = require("express");
const app = express();
const cors = require("cors"); 
const cookieParser = require("cookie-parser");

app.use(cors()); 
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// making Database connection
require("./config/database").connect();

// Importing the doctor routes
const doctorRoutes = require("./routes/doctor");
app.use("/api/v1", doctorRoutes);

// Importing the patient routes
const patientRoutes = require("./routes/patient");
app.use("/api/v1", patientRoutes);

// Activating server
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});
