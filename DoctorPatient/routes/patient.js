const express = require("express");
const router = express.Router();
const { loginPatient , signupPatient  } = require("../controllers/PatientController");

// Route for patient signup
router.post("/patients/signup", signupPatient);
// POST route for patient login
router.post("/patients/login", loginPatient);

module.exports = router;
