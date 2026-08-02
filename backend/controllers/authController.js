const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            campus,
            residenceHall,
        } = req.body;

        // Check required fields
        if (!name || !email || !password || !campus) {
            return res.status(400).json({
                message: "Please fill in all required fields.",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists.",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            campus,
            residenceHall,
        });

        res.status(201).json({
            message: "Account created successfully!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                campus: user.campus,
                residenceHall: user.residenceHall,
            },
        });

    } catch (error) {
        console.error("Register Error:", error.message);

        res.status(500).json({
            message: "Server error while creating account.",
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password.",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                campus: user.campus,
                residenceHall: user.residenceHall,
                avatar: user.avatar,
                verified: user.verified,
                rating: user.rating,
            },
        });
    } catch (error) {
        console.error("Login Error:", error.message);

        res.status(500).json({
            message: "Server error while logging in.",
        });
    }
};
const getMe = async (req, res) => {
    try {
        res.status(200).json({
            user: req.user,
        });
    } catch (error) {
        console.error("Get User Error:", error.message);

        res.status(500).json({
            message: "Server error while fetching user.",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
