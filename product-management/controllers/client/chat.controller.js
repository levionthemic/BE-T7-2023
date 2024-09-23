const uploadCloudinary = require("../../helpers/uploadCloudinary");
const Chat = require("../../model/chat.model");
const User = require("../../model/user.model");

const chatSocket = require("../../sockets/client/chat.socket");

// [GET] /chat
module.exports.index = async (req, res) => {
  // SocketIO
  await chatSocket(res);

  
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
