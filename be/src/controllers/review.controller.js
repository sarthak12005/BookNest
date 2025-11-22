const Review = require('../models/Review');

exports.addReview = async (req, res) => {
    try {
        const {userId} = req.user.userId;
        const {id} = req.params
        const {comment, rating } = req.body

        if (!userId || !id || !comment || !rating) {
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const review = new Review({
            bookId: id,
            userId: userId,
            comment: comment,
            rating: rating || 1
        });

        if (!review) {
            return res.status(400).json({message:"Error in saving review! please try again after some time"});
        }

        await review.save();
        res.status(200).json({message: "Review added Successfully", review});
    } catch (error) {
        console.log("Error in Review Controller: ", error);
        res.status(500).json({message: "Internal server error", error});
    }
}

