// controllers/PatientController.js

const bcrypt = require("bcrypt");
const Patient = require("../models/Patient");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid'); // Import UUID module
require("dotenv").config();

exports.signupPatient = async (req, res) => {
    try {
        const { name, email, password, contactNumber, disease, bloodGroup } = req.body;
        
        // Generate a unique patient ID using UUID
        const patientId = uuidv4();
        
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({
                success: false,
                message: 'Patient already exists',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const patient = await Patient.create({
            patientId, // Assign the generated patient ID
            name,
            email,
            password: hashedPassword,
            role: "Patient",
            contactNumber,
            disease,
            bloodGroup
        });
        return res.status(200).json({
            success: true,
            message: 'Patient registered successfully',
        });
    } catch (error) {
        console.error('Error in patient signup:', error);
        res.status(500).json({
            success: false,
            message: 'Patient registration failed',
        });
    }
};

exports.loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
        }
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(401).json({
                success: false,
                message: 'Patient not found',
            });
        }
        if (await bcrypt.compare(password, patient.password)) {
            const payload = {
                email: patient.email,
                id: patient._id,
                role: patient.role,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            patient.token = token;
            await patient.save();
            patient.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            const patientWithToken = {
                _id: patient._id,
                name: patient.name,
                email: patient.email,
                role: patient.role,
                token: patient.token,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                patient: patientWithToken,
                message: "Patient logged in successfully"
            });
        } else {
            res.status(403).json({
                success: false,
                message: 'Incorrect password',
            });
        }
    } catch (error) {
        console.error('Error in patient login:', error);
        res.status(500).json({
            success: false,
            message: 'Login failure',
        });
    }
};
