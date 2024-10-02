import { Request, Response } from "express";
import FavoriteSong from "../../models/favorite-songs.model";
import Singer from "../../models/singer.model";
import Song from "../../models/song.model";

// [GET] /favorite-songs
export const index = async (req: Request, res: Response) => {
  const favoriteSongs = await FavoriteSong.find({
    userId: "",
    deleted: false,
  });
  const songs = [];
  for (const favoriteSong of favoriteSongs) {
    const song = await Song.findOne({
      _id: favoriteSong.songId,
      status: "active",
      deleted: false,
    });
    const singer = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false,
    });
    song["singer"] = singer;
    songs.push(song);
  };
  
  res.render("client/pages/favorite-songs/index.pug", {
    pageTitle: "Bài hát yêu thích",
    songs: songs,
  });
};
