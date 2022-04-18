const http = require("http");
const { Server } = require("socket.io");

module.exports = function SocketServer(app) {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);

        socket.on("join_chat", (data) => {
            socket.join(data);
            console.log(`User with ID: ${socket.id} joined chat: ${data}`);
        });

        socket.on("send_chat_message", (data) => {
            socket.to(data.class_id).emit("receive_chat_message", data);
        });

        socket.on("disconnect", () => {
            console.log("User Disconnected", socket.id);
        });
    });

    return server;
}