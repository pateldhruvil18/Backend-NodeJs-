const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log("Databsee connected successfully"))
        .catch((error) => {
            console.error("Error occured", error.message)
            process.exit(1);
        });

}

module.exports = dbConnect