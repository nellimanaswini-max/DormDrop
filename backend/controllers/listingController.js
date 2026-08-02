const Listing = require("../models/Listing");

const createListing = async (req, res) => {
    try {
        const {
            title,
            price,
            category,
            condition,
            description,
            residenceHall,
            image,
            isDonation,
        } = req.body;

        if (
            !title ||
            price === undefined ||
            !category ||
            !condition ||
            !description
        ) {
            return res.status(400).json({
                message: "Please fill in all required fields.",
            });
        }

        const listing = await Listing.create({
            title,
            price,
            category,
            condition,
            description,
            residenceHall,
            image,
            isDonation,

            seller: req.user._id,
        });

        const populatedListing = await listing.populate(
            "seller",
            "name campus residenceHall avatar verified rating"
        );

        res.status(201).json({
            message: "Listing published successfully!",
            listing: populatedListing,
        });

    } catch (error) {
        console.error("Create Listing Error:", error.message);

        res.status(500).json({
            message: "Server error while creating listing.",
        });
    }
};

module.exports = {
    createListing,
};