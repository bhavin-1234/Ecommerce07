const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MONGODB connected successfully... DB HOST: ${connect.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection failed ", error);
        process.exit(1);
    }
};

module.exports = { dbConnect };
