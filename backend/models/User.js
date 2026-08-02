const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        campus: {
            type: String,
            required: true,
            trim: true,
        },

        residenceHall: {
            type: String,
            trim: true,
            default: "",
        },

        avatar: {
            type: String,
            default: "",
        },

        verified: {
            type: Boolean,
            default: false,
        },

        rating: {
            type: Number,
            default: 5,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;