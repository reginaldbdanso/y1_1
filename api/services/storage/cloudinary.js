// import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require('cloudinary').v2;

const getCloudinaryUrl = async function(imagePath) {

    if (!imagePath) {
        throw new Error("Invalid image path provided.");
    }

    // Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
    
    // Upload an image
     const uploadResult = await cloudinary.uploader.upload( imagePath )
       .catch((error) => {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Cloudinary upload failed.");           
       });
    
    console.log(uploadResult.public_id);
    const url = cloudinary.url(uploadResult.public_id, {
        transformation: [
            {quality: 'auto'},
            {fetch_format: 'auto'}
        ]
    })

    return url;
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url('shoes', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    
    // console.log(optimizeUrl);
    
    // // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    
    // console.log(autoCropUrl);    
};

module.exports = getCloudinaryUrl;