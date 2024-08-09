const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

const connectDB = async () => {
  console.log(`${process.env.MONGODB_URI}/${DB_NAME}`)
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    dbInstance = connectionInstance;
    console.log(
      `\n☘️  MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`
    );
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
