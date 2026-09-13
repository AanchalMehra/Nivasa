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

        const user =await User.findByIdAndUpdate(req.userId, { $push: { bookings:listing } }, { new: true });
        if(!user){
            return res.status(400).json({ error: "User not found" });
        }
        listing.guest=req.userId;
        lisitng.isBooked=true;
        await listing.save();
        return res.status(201).json({ message: "Booking created successfully", booking });


    }
    catch(error){
        return res.status(500).json({ message: `createBooking error: ${error}` });

    }
}