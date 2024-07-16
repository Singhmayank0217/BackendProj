const { log } = require("console");
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, re) => {
    try {
        //fetch the files 
        const file = req.files.file;
        console.log("files mila ->", file);

        //create path where files need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`; // server path

        //add path to the move function 
        file.mv(path, (err) => {
            console.log(err);
        });
        //__dirname represents the current directory 
        //here it represents controller

        //create response
        res.json({
            success: true,
            message: "local file uploaded successfully",
        });

    } catch (error) {
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type.toLowerCase());
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    if (quality) {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload to handler
exports.imageUpload = async (req, res) => {
    try {
        //fetch data from the request
        const { name, tags, email } = req.body;

        const file = req.files.imageFile;
        console.log("Received image:", file);

        //validation
        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            });
        }
        // file format supported then we will upload it on the cloudinary

        const response = await uploadFileToCloudinary(file, 'mayank');
        console.log("Uploaded to Cloudinary:", response);

        //save entry in db


        const newFile = new File({
            name,
            imageUrl: response.secure_url,
            tags,
            email
        });

        await newFile.save();


        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded"
        });
    } catch (error) {
        console.error("Error in imageUpload:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}


// video upload 

// async function uploadVideoToCloudinary(file, folder) {
//     const options = { folder };
//     // options.resource_type='auto';
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }

async function uploadVideoToCloudinary(file, folder) {
    const options = {
        folder,
        resource_type: 'auto',
        maxFileSize: 100 * 1024 * 1024, // 100MB in bytes
    };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


// Route handler for uploading video
exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files.videoFile;

        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            });
        }

        // Upload video to Cloudinary
        const cloudinaryResponse = await uploadVideoToCloudinary(file, 'mayank');
        console.log("Uploaded to Cloudinary:", cloudinaryResponse);

        // Save video information to database
        const newFile = new File({
            name,
            imageUrl: cloudinaryResponse.secure_url,
            tags,
            email
        });
        await newFile.save();

        res.json({
            success: true,
            message: "Video successfully uploaded"
        });
    } catch (error) {
        console.error("Error in videoUpload:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}


exports.imageSizeReducer = async (req, res) => {
    try {
        const { name, tags, email } = req.body;

        const file = req.files.imageFile;
        console.log("Received image:", file);

        //validation
        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            });
        }
        // file format supported then we will upload it on the cloudinary
        const response = await uploadFileToCloudinary(file, 'mayank',30);
        console.log("Uploaded to Cloudinary:", response);

        //save entry in db


        const newFile = new File({
            name,
            imageUrl: response.secure_url,
            tags,
            email
        });

        await newFile.save();


        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded"
        });
    } catch (error) {
        console.error("Error in videoUpload:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}