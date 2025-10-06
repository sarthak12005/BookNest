const cloudinary = require('../config/Cloudinary');

exports.uploadImage = async (file) => {
    try {
        if (!file) {
            console.log("No file");
            return;
        }

        const result = await cloudinary.uploader.upload(file, {
            folder: 'bookstore',
            resource_type: 'image'
        });

        if (!result) {
            console.log("Error in creating result");
        }

        return result.secure_url;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}