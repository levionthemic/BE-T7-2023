import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

import { FileUploadWithPreview } from "https://unpkg.com/file-upload-with-preview/dist/index.js";

// file-upload-with-preview
const upload = new FileUploadWithPreview("upload-image", {
  multiple: true,
  maxFileCount: 6,
});
// End file-upload-with-preview

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = e.target.elements.content.value;

    const images = upload.cachedFileArray || [];

    if (content || images.length > 0) {
      // Gửi content hoặc ảnh
      socket.emit("CLIENT_SEND_MESSAGE", {
        content: content,
        images: images,
      });
      e.target.elements.content.value = "";
      upload.resetPreviewPanel();
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
  });
}

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const body = document.querySelector(".chat .inner-body");
  const div = document.createElement("div");
  const boxTyping = document.querySelector(".inner-list-typing");
  const myId = document.querySelector("[my-id]").getAttribute("my-id");

  let htmlFullName = "";
  let htmlContent = "";
  let htmlImages = "";

  // Hiển thị data realtime
  
  if (myId != data.user_id) {
    div.classList.add("inner-incoming");
    htmlFullName = `
      <div class="inner-name">${data.fullName}</div>
    `;
  } else {
    div.classList.add("inner-outgoing");
  }
  if (data.content) {
    htmlContent = `
    <div class="inner-content">${data.content}</div>
  `;
  }
  if (data.images) {
    htmlImages = `<div class="inner-images">`;
    for (const image of data.images) {
      htmlImages += `<img src="${image}">`;
    }
    htmlImages += "</div>";
  }
  div.innerHTML = `
    ${htmlFullName}
    ${htmlContent}
    ${htmlImages}
  `;
  body.insertBefore(div, boxTyping);
  body.scrollTop = body.scrollHeight;
});

// Scroll Chat to Bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}

// Show Typing
var timeOut;
const showTyping = () => {
  socket.emit("CLIENT_SEND_TYPING", "show");

  clearTimeout(timeOut);

  timeOut = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", "hidden");
  }, 3000);
};
// End Show Typing

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
var timeOut;
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const inputChat = document.querySelector(
    ".chat .inner-form input[name='content']"
  );
  emojiPicker.addEventListener("emoji-click", (e) => {
    const icon = e.detail.unicode;
    inputChat.value = inputChat.value + icon;

    const end = inputChat.value.length;
    inputChat.setSelectionRange(end, end);
    inputChat.focus();

    showTyping();
  });
}
// End Emoji-picker

// Typing
const inputChat = document.querySelector(
  ".chat .inner-form input[name='content']"
);

var timeOut;
inputChat.addEventListener("keyup", () => {
  showTyping();
});

const elementListTyping = document.querySelector(".chat .inner-list-typing");
if (elementListTyping) {
  socket.on("SERVER_RETURN_TYPING", (data) => {
    if (data.type == "show") {
      const existTyping = elementListTyping.querySelector(
        `[user-id="${data.user_id}"]`
      );
      if (!existTyping) {
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id", data.user_id);
        boxTyping.innerHTML = `
          <div class="inner-name">${data.fullName}</div>
          <div class="inner-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        `;
        elementListTyping.appendChild(boxTyping);

        bodyChat.scrollTop = bodyChat.scrollHeight;
      }
    } else {
      const boxTypingRemove = elementListTyping.querySelector(
        `[user-id="${data.user_id}"]`
      );
      if (boxTypingRemove) {
        elementListTyping.removeChild(boxTypingRemove);
      }
    }
  });
}

// End Typing
