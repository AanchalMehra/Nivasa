import Listing from "../model/listing.model.js";
import Booking from "../model/booking.model.js";
import User from "../model/user.model.js";
export const createBooking = async (req, res) => {
    try{

        const {id}= req.params;
        const { checkIn, checkOut,totalRent } = req.body;

        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(400).json({ error: "Listing not found" });
        }

        if(new Date(checkIn) >= new Date(checkOut)){
            return res.status(400).json({ error: "Check-out date must be after check-in date" });
        }

        if(listing.isBooked){
            return res.status(400).json({ error: "Listing is already booked" });
        }
        const booking = await Booking.create({
            host: listing.host,
            guest: req.userId,
            listing: listing._id,
            checkIn,
            checkOut,
            totalRent
        });

        const user =await User.findByIdAndUpdate(req.userId, { $push: { booking:booking._id } }, { new: true });
        if(!user){
            return res.status(400).json({ error: "User not found" });
        }
        listing.isBooked=true;
        await listing.save();

        const populatedBooking = await Booking.findById(booking._id).populate("host", "name email");
        return res.status(201).json({ message: "Booking created successfully", booking: populatedBooking });


    }
    catch(error){
        return res.status(500).json({ message: `createBooking error: ${error}` });

    }
}

export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(400).json({ error: "Booking not found" });
        }

        if (booking.guest.toString() !== req.userId) {
            return res.status(403).json({ error: "You are not authorized to cancel this booking" });
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({ error: "Booking is already cancelled" });
        }

        booking.status = "cancelled";
        await booking.save();

        await Listing.findByIdAndUpdate(booking.listing, { isBooked: false });

        return res.status(200).json({ message: "Booking cancelled successfully", booking });
    } catch (error) {
        return res.status(500).json({ message: `cancelBooking error: ${error}` });
    }
}