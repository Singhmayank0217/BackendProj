// middleware/doctorAuth.js

exports.isDoctor = (req, res, next) => {
    try {
        if (req.user.role !== "Doctor") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for doctors",
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
