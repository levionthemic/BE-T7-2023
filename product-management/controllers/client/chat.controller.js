const Chat = require("../../model/chat.model");
const User = require("../../model/user.model");

// [GET] /chat
module.exports.index = async (req, res) => {
  const user_id = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  // SocketIO
  // _io.on() sẽ connect mới khi load lại trang => database lưu nhiều record của 1 message
  _io.once("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      // Lưu vào database
      const chat = new Chat({
        user_id: user_id,
        content: content,
      });
      await chat.save();

      // Trả data về client
      _io.emit("SERVER_RETURN_MESSAGE", {
        user_id: user_id,
        fullName: fullName,
        content: content
      });
    });
  });

  const chats = await Chat.find({ deleted: false });
  for (const chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.user_id,
    }).select("fullName");
    chat.infoUser = infoUser;
  }

  res.render("client/pages/chat/index.pug", {
    pageTitle: "Chat",
    chats: chats,
  });
};
