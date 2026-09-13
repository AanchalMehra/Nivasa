import User from "../model/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
            .select("-password")
            .populate("listing", "title description host image1 image2 image3 rent city landMark category isBooked ratings")
            .populate({
                path: "booking",
                populate: {
                    path: "listing",
                    select: "title description host image1 image2 image3 rent city landMark category isBooked ratings",
                },
            });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `getCurrentUser error: ${error}` });
    }
}
