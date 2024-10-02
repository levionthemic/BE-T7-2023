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
        cover: song.avatar,
      },
    ],
    autoplay: true,
    volume: 0.8,
  });

  const avatar = document.querySelector(".singer-detail .inner-avatar");

  ap.on("play", () => {
    avatar.style.animationPlayState = "running";
  });

  ap.on("pause", () => {
    avatar.style.animationPlayState = "paused";
  });

  ap.on("ended", () => {
    const link = `/songs/listen/${song._id}`;

    const option = {
      method: "PATCH",
    };

    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        const elementListenSpan = document.querySelector(
          ".singer-detail .inner-listen span"
        );
        elementListenSpan.innerHTML = `${data.listen} lượt nghe`;
      });
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
      : `/songs/like/yes/${idSong}`;

    const option = {
      method: "PATCH",
    };

    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        const span = buttonLike.querySelector("span");
        span.innerHTML = data.newLike + " thích";

        buttonLike.classList.toggle("active");
      });
  });
}
// End Button Like

// Button Favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if (listButtonFavorite && listButtonFavorite.length) {
  for (const buttonFavorite of listButtonFavorite) {
    buttonFavorite.addEventListener("click", () => {
      const idSong = buttonFavorite.getAttribute("button-favorite");

      const isActive = buttonFavorite.classList.contains("active");

      const link = isActive
        ? `/songs/favorite/no/${idSong}`
        : `/songs/favorite/yes/${idSong}`;

      const option = {
        method: "PATCH",
      };

      fetch(link, option)
        .then((res) => res.json())
        .then((data) => {
          buttonFavorite.classList.toggle("active");
        });
    });
  }
}
// End Button Favorite

// Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const boxSuggest = boxSearch.querySelector(".inner-suggest");

  input.addEventListener("keyup", () => {
    const keyword = input.value;

    const link = `/search/suggest?keyword=${keyword}`;

    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        const songs = data.songs;
        if (songs && songs.length) {
          boxSuggest.classList.add("show");

          const htmls = songs.map((song) => {
            return `
              <a class="inner-item" href="/songs/detail/${song.slug}">
                <div class="inner-image"> 
                  <img src="${song.avatar}">
                </div>
                <div class="inner-info"> 
                  <div class="inner-title">${song.title}</div>
                  <div class="inner-singer"> 
                    <i class="fa-solid fa-microphone-lines"></i> ${song.singer.fullName}
                  </div>
                </div>
              </a>
            `;
          });
          const boxList = boxSuggest.querySelector(".inner-list");
          boxList.innerHTML = htmls.join("");
        } else {
          boxSuggest.classList.remove("show");
        }
      });
  });
}
// End Search Suggest
