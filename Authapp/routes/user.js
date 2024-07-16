const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { login, signup } = require("../Controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middleware/auth");


router.post("/login", login);
router.post("/signup", signup);

//testing protected routes for single middleware
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for Tests.",
    });
});

//Protected Routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for Students.",
    });
});
router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for Admin.",
    });
});

router.get("/getEmail", auth, async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            user: user,
            message: "welcome to the Email route.",
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: "tried hard but can't retrieve it.",
        })
    }
});



module.exports = router;