import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});
const uploadCloudinary = async (localFilePath)=> {

    // Upload an image
    if(!localFilePath) return null
     await cloudinary.uploader
     .upload(localFilePath, {
        resource_type: "auto"
    }).then((response)=>{
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

       })
       .catch((error) => {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
       });

  
};
export {uploadCloudinary}