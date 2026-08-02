const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

module.exports = {
    registerUser,
};