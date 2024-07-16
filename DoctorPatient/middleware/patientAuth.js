// middleware/patientAuth.js

exports.isPatient = (req, res, next) => {
    try {
        if (req.user.role !== "Patient") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for patients",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching",
        });
    }
};
