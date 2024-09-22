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
window.onload = () => {
  const body = document.querySelector(".chat .inner-body");
  body.scrollTop = body.scrollHeight;
}
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
