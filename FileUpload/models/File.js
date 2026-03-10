const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fileSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    imageUrl : {
        type: String,
    },
    tags : {
        type: String,
    },
    email : {
        type: String,
    },
})

//post midlleware
fileSchema.post("save", async function(doc) {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        let info = await transporter.sendMail({
            from:'Dhruvil Patel',
            to: doc.email,
            subject: "new file uploaded cloudinary",
            html:`<h2>hello JE</h2> <p>File uploaded</p> View here <a href="${doc.imageUrl}></a>`
        })

        console.log(info)
    } catch (error) {
        console.log(error)
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;