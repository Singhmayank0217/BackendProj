// models/Doctor.js

const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
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
        default: "Doctor",
    },
    contactNumber: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Doctor", doctorSchema);
