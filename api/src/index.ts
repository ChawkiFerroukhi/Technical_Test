import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { Server as SocketIOServer } from "socket.io";
import http from "http";
import connectDb from "./config/db";
import * as routers from "./routes";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const hostname: string = process.env.SERVERURL || "localhost";
const port: number = parseInt(process.env.SERVERPORT || "8090", 10);

// CORS configuration for the REST API
app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Object.values(routers).forEach((router) => {
  app.use("/api", router);
});

connectDb();

server.listen(port, hostname, () => {
  console.log(`Server running on ${hostname}:${port}`);
});

export { io };
