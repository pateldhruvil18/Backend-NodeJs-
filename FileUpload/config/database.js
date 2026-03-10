const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(console.log("DB connection successfully"))
    .catch( (error) => {
        console.log("DB connection Issues");
        console.error(error);
        process.exit(1);
    });
}