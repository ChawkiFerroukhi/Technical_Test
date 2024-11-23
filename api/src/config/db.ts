import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const databaseName: string = process.env.DBNAME || "defaultDbName";
const databaseURL: string = process.env.DBURL || "localhost";

mongoose.set("debug", true);
mongoose.Promise = global.Promise;

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(`mongodb://${databaseURL}/${databaseName}`);
    console.log("Connected to database");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default connectDb;
