import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";
import { uploadFilePath } from "../config/cloudinary.js";

export const addListing = async (req, res) => {
    try {
        const host= req.userId;
        const { title, description, rent, city, landMark, category } = req.body;

        const image1 = await uploadFilePath(req.files.image1[0].path);
        const image2 = await uploadFilePath(req.files.image2[0].path);
        const image3 = await uploadFilePath(req.files.image3[0].path);


        const listing = await Listing.create({
            title,
            description,
            host,
            image1,
            image2,
            image3,
            rent,
            city,
            landMark,
            category,
        });

        const user = await User.findByIdAndUpdate(
            host,
            { $push: { listing: listing._id } },
            { new: true }
        );
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        return res.status(201).json({ message: "Listing created successfully", listing });
    } catch (error) {
        console.error("Error creating listing:", error);
        return res.status(500).json({ message: `addListing error: ${error}` });
    }
};

export const getListing = async (req, res) => {
    try {
        const listings = await Listing.find().sort({ createdAt: -1 });
        return res.status(200).json(listings);
    } catch (error) {
        console.error("Error fetching listings:", error);
        return res.status(500).json({ message: `getListing error: ${error}` });
    }
};

export const searchListing = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query?.trim()) {
            const listings = await Listing.find().sort({ createdAt: -1 });
            return res.status(200).json(listings);
        }

        const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(escaped, "i");

        const listings = await Listing.find({
            $or: [{ title: regex }, { city: regex }, { landMark: regex }],
        }).sort({ createdAt: -1 });

        return res.status(200).json(listings);
    } catch (error) {
        console.error("Error searching listings:", error);
        return res.status(500).json({ message: `searchListing error: ${error}` });
    }
};

export const findListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(400).json({ error: "Listing not found" });
        }

        return res.status(200).json(listing);
    } catch (error) {
        console.error("Error finding listing:", error);
        return res.status(500).json({ message: `findListing error: ${error}` });
    }
};


export const updateListing = async (req, res) => {
    try {
        const {id}= req.params;
        const { title, description, rent, city, landMark, category } = req.body;

        const existingListing = await Listing.findById(id);
        if (!existingListing) {
            return res.status(400).json({ error: "Listing not found" });
        }

        const image1 = req.files?.image1 ? await uploadFilePath(req.files.image1[0].path) : existingListing.image1;
        const image2 = req.files?.image2 ? await uploadFilePath(req.files.image2[0].path) : existingListing.image2;
        const image3 = req.files?.image3 ? await uploadFilePath(req.files.image3[0].path) : existingListing.image3;

        const listing = await Listing.findByIdAndUpdate(
            id,
            {
                title,
                description,
                image1,
                image2,
            image3,
            rent,
            city,
            landMark,
            category,
        },{new:true});

        return res.status(200).json({ message: "Listing updated successfully", listing });
    } catch (error) {
        console.error("Error updating listing:", error);
        return res.status(500).json({ message: `UpdateListing error: ${error}` });
    }
};

export const deleteListing = async (req, res) => {
    try {
        const { id } = req.params;

        const listing = await Listing.findByIdAndDelete(id);
        if (!listing) {
            return res.status(400).json({ error: "Listing not found" });
        }

        await User.findByIdAndUpdate(listing.host, { $pull: { listing: listing._id } });

        return res.status(200).json({ message: "Listing deleted successfully", listing });
    } catch (error) {
        console.error("Error deleting listing:", error);
        return res.status(500).json({ message: `deleteListing error: ${error}` });
    }
};

export const ratingListing = async (req, res) => {
    try{
        const {id}= req.params;
        const { ratings } = req.body;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(400).json({ error: "Listing not found" });
        }
        listing.ratings=Number(ratings);
        await listing.save();
        return res.status(200).json({ ratings: listing.ratings });

    }
    catch(error){
        console.error("Error rating listing:", error);
        return res.status(500).json({ message: `ratingListing error: ${error}` });
    }
}