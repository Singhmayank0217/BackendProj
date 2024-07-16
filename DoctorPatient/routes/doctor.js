// routes/doctor.js
const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { isDoctor } = require("../middleware/doctorAuth");
const { loginDoctor, signupDoctor } = require("../controllers/DoctorController");
const { getPatientById } = require("../controllers/DoctorController");
// Doctor routes
router.post("/doctors/signup", signupDoctor); // Adjusted route for doctor signup
router.post("/doctors/login", loginDoctor); // Adjusted route for doctor login
router.get("/doctors/dashboard", auth, isDoctor, (req, res) => {
    // Protected route for doctors
    res.json({ success: true, message: "Doctor dashboard" });
});

// Route to fetch patient data by ID
router.get("/patients/:patientId", auth, isDoctor, getPatientById); // Adjusted route to use patientId instead of id

module.exports = router;
