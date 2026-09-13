import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import { addListing, getListing, searchListing, findListing,updateListing,deleteListing,ratingListing } from "../controllers/listing.controller.js";

const listingRouter = express.Router();

listingRouter.post(
    "/add",
    isAuth,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
    ]),
    addListing
);

listingRouter.get("/all", getListing);
listingRouter.get("/search", searchListing);
listingRouter.get("/findlistingbyid/:id",isAuth, findListing);

listingRouter.post("/ratings/:id",isAuth, ratingListing);
listingRouter.post(
    "/update/:id",
    isAuth,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
    ]),
    updateListing
);
listingRouter.delete("/delete/:id", isAuth, deleteListing);
export default listingRouter;
