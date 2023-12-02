const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology : true,
            useNewUrlParser: true,
        });

        console.log(`MongoDB connected ${connect.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

module.exports = connectDB;