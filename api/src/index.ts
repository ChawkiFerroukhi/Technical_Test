import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDb from "./config/db";
import * as routers from "./routes";

const app = express();

// const corsOptions: cors.CorsOptions = {
//   origin: "http://localhost:3000",
// };

dotenv.config();

const hostname: string = process.env.SERVERURL || "localhost";
const port: number = parseInt(process.env.SERVERPORT || "5000", 10);

// app.use(morgan("dev"));

// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Object.values(routers).forEach((router) => {
  app.use("/api", router);
});

connectDb();

app.listen(port, hostname, () => {
  console.log(`Server running on ${hostname}:${port}`);
});
