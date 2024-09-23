const uploadCloudinary = require("../../helpers/uploadCloudinary");
const Chat = require("../../model/chat.model");

module.exports = async (res) => {
  const user_id = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  // SocketIO
  // _io.on() sẽ connect mới khi load lại trang => database lưu nhiều record của 1 message
  _io.once("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      let images = [];
      for (const imageBuffer of data.images) {
        const link = await uploadCloudinary(imageBuffer);
        images.push(link);
      }
      // Lưu vào database
      const chat = new Chat({
        user_id: user_id,
        content: data.content,
        images: images,
      });
      await chat.save();

      // Trả data về client
      _io.emit("SERVER_RETURN_MESSAGE", {
        user_id: user_id,
        fullName: fullName,
        content: data.content,
        images: images,
      });
    });

    socket.on("CLIENT_SEND_TYPING", (type) => {
      socket.broadcast.emit("SERVER_RETURN_TYPING", {
        user_id: user_id,
        fullName: fullName,
        type: type,
      });
    });
  });
};
