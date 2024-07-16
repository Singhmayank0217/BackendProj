// models/Patient.js

const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
        unique: true // Ensures the patient ID is unique
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Patient",
    },
    contactNumber: {
        type: String,
        required: true,
    },
    disease: {
        type: String,
    },
    bloodGroup: {
        type: String,
    }
});

module.exports = mongoose.model("Patient", patientSchema);