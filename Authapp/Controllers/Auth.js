const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Signup route handler
exports.signup = async (req, res) => {
    try {
        //get data
        const { name, email, password, role } = req.body;
        //check if user already exist 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'user already Exists',
            });
        }
        let hashedPassword;
        let retryCount = 0;
        while (retryCount < 3) {
            try {
                hashedPassword = await bcrypt.hash(password, 10);
                break; // Break the loop if hashing is successful
            } catch (err) {
                // Increment retry count and log error
                retryCount++;
                console.error('Error in hashing Password:', err);
            }
        }

        if (retryCount === 3) {
            return res.status(500).json({
                success: false,
                message: 'Failed to hash password after 3 attempts',
            });
        }

        //create entry for user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        return res.status(200).json({
            success: true,
            message: 'User registered successfully',

        });
    }
    catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({
            success: false,
            message: 'User cannot be registered, please try again later',
        });
    }
}



//login
exports.login = async (req, res) => {
    try {
        //data fetch
        const { email, password } = req.body;
        //validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the data carefully',
            });
        }
        //check for registered user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered',
            });
        }
        //verify password and generate JWT token
        if (await bcrypt.compare(password, user.password)) {
            //password match
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role,
            };
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            // Update user's token and save it to the database
            user.token = token;
            await user.save();
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            // Include token in the user object
            const userWithToken = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: user.token,
            };

            //cookie(cookie name, data ,option)  
            res.cookie("name", token, options).status(200).json({
                success: true,
                token,
                user: userWithToken, // Send user object with token included
                message: "user logged in successfully"
            });
        } else {
            //password does not match
            res.status(403).json({
                success: false,
                message: 'Incorrect Password',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Login failure',
        });
    }
}
