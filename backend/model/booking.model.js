import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        guest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        listing: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Listing",
            required: true
        },

        totalRent: {
            type: Number,
            required: true
        },

        checkIn: {
            type: Date,
            required: true
        },

        checkOut: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["booked", "cancelled"],
            default: "booked"
        }
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;