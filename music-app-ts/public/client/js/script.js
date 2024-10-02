// APlayer
const aplayer = document.getElementById("aplayer");
if (aplayer) {
  const song = JSON.parse(aplayer.getAttribute("data-song"));

  const singer = JSON.parse(aplayer.getAttribute("data-singer"));

  const ap = new APlayer({
    container: document.getElementById("aplayer"),
    audio: [
      {
        name: song.title,
        artist: singer.fullName,
        url: song.audio,
        cover: song.avatar
      },
    ],
    autoplay: true,
    volume: 0.8
  });

  const avatar = document.querySelector(".singer-detail .inner-avatar");

  ap.on("play", () => {
    avatar.style.animationPlayState = "running";
  });

  ap.on("pause", () => {
    avatar.style.animationPlayState = "paused";
  });
}
// End APlayer
