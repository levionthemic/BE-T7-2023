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

// Button Like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const idSong = buttonLike.getAttribute("button-like");
    
    const isActive = buttonLike.classList.contains("active");

    const link = isActive 
      ? `/songs/like/no/${idSong}`
      : `/songs/like/yes/${idSong}`

    const option = {
      method: "PATCH"
    }

    fetch(link, option)
      .then(res => res.json())
      .then(data => {
        const span = buttonLike.querySelector("span");
        span.innerHTML = data.newLike + " thích";

        buttonLike.classList.toggle("active");
      })
  });
}
// End Button Like

// Button Favorite
const buttonFavorite = document.querySelector("[button-favorite]");
if (buttonFavorite) {
  buttonFavorite.addEventListener("click", () => {
    const idSong = buttonFavorite.getAttribute("button-favorite");
    
    const isActive = buttonFavorite.classList.contains("active");

    const link = isActive 
      ? `/songs/favorite/no/${idSong}`
      : `/songs/favorite/yes/${idSong}`

    const option = {
      method: "PATCH"
    }

    fetch(link, option)
      .then(res => res.json())
      .then(data => {
        buttonFavorite.classList.toggle("active");
      })
  });
}
// End Button Favorite

