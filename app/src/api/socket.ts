import { io, Socket } from "socket.io-client";
import { SOCKET_BASE_URL } from "../utils/config";

const socket: Socket = io(SOCKET_BASE_URL, {
    transports: ["websocket"],
});

export default socket;