const Listing = require("../models/Listing");

const createListing = async (req, res) => {
    try {
        const {
            title,
            price,
            category,
            condition,
            description,
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

            // Automatically use the logged-in user's details
            campus: req.user.campus,
            residenceHall: req.user.residenceHall,

            image,
            isDonation,

            // Automatically identify the seller
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
const getListings = async (req, res) => {
    try {
        const listings = await Listing.find()
            .populate(
                "seller",
                "name campus residenceHall avatar verified rating"
            )
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: listings.length,
            listings,
        });

    } catch (error) {
        console.error("Get Listings Error:", error.message);

        res.status(500).json({
            message: "Server error while fetching listings.",
        });
    }
};
const getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)
            .populate(
                "seller",
                "name campus residenceHall avatar verified rating"
            );

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found.",
            });
        }

        res.status(200).json({
            listing,
        });

    } catch (error) {
        console.error("Get Listing Error:", error.message);

        res.status(500).json({
            message: "Server error while fetching listing.",
        });
    }
};
const getMyListings = async (req, res) => {
    try {
        const listings = await Listing.find({
            seller: req.user._id,
        })
            .populate(
                "seller",
                "name campus residenceHall avatar verified rating"
            )
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: listings.length,
            listings,
        });

    } catch (error) {
        console.error("Get My Listings Error:", error.message);

        res.status(500).json({
            message: "Server error while fetching your listings.",
        });
    }
};
const updateListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found.",
            });
        }

        // Check ownership
        if (listing.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You can only edit your own listings.",
            });
        }

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

        if (title !== undefined) listing.title = title;
        if (price !== undefined) listing.price = price;
        if (category !== undefined) listing.category = category;
        if (condition !== undefined) listing.condition = condition;
        if (description !== undefined) listing.description = description;
        if (residenceHall !== undefined) {
            listing.residenceHall = residenceHall;
        }
        if (image !== undefined) listing.image = image;
        if (isDonation !== undefined) {
            listing.isDonation = isDonation;
        }

        const updatedListing = await listing.save();

        await updatedListing.populate(
            "seller",
            "name campus residenceHall avatar verified rating"
        );

        res.status(200).json({
            message: "Listing updated successfully!",
            listing: updatedListing,
        });

    } catch (error) {
        console.error("Update Listing Error:", error.message);

        res.status(500).json({
            message: "Server error while updating listing.",
        });
    }
};
const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found.",
            });
        }

        // Only the owner can delete the listing
        if (listing.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You can only delete your own listings.",
            });
        }

        await listing.deleteOne();

        res.status(200).json({
            message: "Listing deleted successfully!",
        });

    } catch (error) {
        console.error("Delete Listing Error:", error.message);

        res.status(500).json({
            message: "Server error while deleting listing.",
        });
    }
};
module.exports = {
    createListing,
    getListings,
    getListingById,
    getMyListings,
    updateListing,
    deleteListing,
};