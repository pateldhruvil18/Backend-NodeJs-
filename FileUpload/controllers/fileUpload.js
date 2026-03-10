//modules
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileupload => handler function

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log("File Agayi hain", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-->", path)
        file.mv(path, (err) => {
            console.log(err)
        });

        res.json({
            success: true,
            message: 'Local File Uploaded Successfully'
        });
    } catch (error) {
        console.log(error)
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {
        folder,
        resource_type: "auto"
    };
    if(quality){
        options.quality = quality
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload handler

exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File formt not supported',
            })
        }

        //file format supported

        const response = await uploadFileToCloudinary(file, "Dhruvil")
        console.log(response)
        //db me entry save karna hain
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Successfully uploaded'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Error occured'
        })
    }
}

//video Upload handler
exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        //validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        //file format supported

        const response = await uploadFileToCloudinary(file, "Dhruvil")
        console.log(response)
        //db me entry save karna hain
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl: response.secure_url
        })

        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: 'video Successfully uploaded'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Error occured'
        })
    }
}


//image size reducer handler
exports.imageSizeReducer = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File formt not supported',
            })
        }

        //file format supported

        const response = await uploadFileToCloudinary(file, "Dhruvil", 90)
        console.log(response)
        //db me entry save karna hain
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Successfully uploaded'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Error occured'
        })
    }
}