// controllers/DoctorController.js

const bcrypt = require("bcrypt");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signupDoctor = async (req, res) => {
    try {
        const { name, email, password, contactNumber } = req.body;
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({
                success: false,
                message: 'Doctor already exists',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const doctor = await Doctor.create({
            name,
            email,
            password: hashedPassword,
            role: "Doctor",
            contactNumber,
        });
        return res.status(200).json({
            success: true,
            message: 'Doctor registered successfully',
        });
    } catch (error) {
        console.error('Error in doctor signup:', error);
        res.status(500).json({
            success: false,
            message: 'Doctor registration failed',
        });
    }
};

exports.loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
        }
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(401).json({
                success: false,
                message: 'Doctor not found',
            });
        }
        if (await bcrypt.compare(password, doctor.password)) {
            const payload = {
                email: doctor.email,
                id: doctor._id,
                role: doctor.role,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            doctor.token = token;
            await doctor.save();
            doctor.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            const doctorWithToken = {
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                role: doctor.role,
                token: doctor.token,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                doctor: doctorWithToken,
                message: "Doctor logged in successfully"
            });
        } else {
            res.status(403).json({
                success: false,
                message: 'Incorrect password',
            });
        }
    } catch (error) {
        console.error('Error in doctor login:', error);
        res.status(500).json({
            success: false,
            message: 'Login failure',
        });
    }
};


// Fetch patient data by ID

exports.getPatientById = async (req, res) => {
    try {
        // Check if the user is authenticated and is a doctor
        if (req.user.role !== "Doctor") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Only doctors can access this endpoint.",
            });
        }

        // Extract patient ID from request parameters
        const { patientId } = req.params;

        // Fetch patient data from the database
        const patient = await Patient.findOne({ patientId });

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found.",
            });
        }

        // Return patient data
        return res.status(200).json({
            success: true,
            patient,
            message: "Patient data retrieved successfully.",
        });
    } catch (error) {
        console.error("Error fetching patient data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch patient data. Please try again later.",
        });
    }
};
