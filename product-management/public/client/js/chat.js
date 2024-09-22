import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = e.target.elements.content.value;

    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.elements.content.value = "";
    }
  });
}

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const body = document.querySelector(".chat .inner-body");
  const div = document.createElement("div");
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  if (myId != data.user_id) {
    div.classList.add("inner-incoming");
    div.innerHTML = `
      <div class="inner-name">${data.fullName}</div>
      <div class="inner-content">${data.content}</div>
    `;
  } else {
    div.classList.add("inner-outgoing");
    div.innerHTML = `
      <div class="inner-content">${data.content}</div>
    `;
  }
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
});

// Scroll Chat to Bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}

// Emoji-picker
// Show Popup
const buttonIcon = document.querySelector(".button-icon");
if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip);
  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  };
}

// InsertIcon
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const inputChat = document.querySelector(
    ".chat .inner-form input[name='content']"
  );
  emojiPicker.addEventListener("emoji-click", (e) => {
    const icon = e.detail.unicode;
    inputChat.value = inputChat.value + icon;
  });
}
// End Emoji-picker
