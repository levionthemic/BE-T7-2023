import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";
import FavoriteSong from "../../models/favorite-songs.model";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    slug: req.params.slugTopic,
    status: "active",
    deleted: false,
  });

  const songs = await Song.find({
    topicId: topic.id,
    status: "active",
    deleted: false,
  }).select("avatar title slug singerId like");

  for (const song of songs) {
    const singer = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false,
    });
    song["singer"] = singer;
  }

  res.render("client/pages/songs/list.pug", {
    pageTitle: topic.title,
    songs: songs,
  });
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slugSong: String = req.params.slugSong;

  const song = await Song.findOne({
    slug: slugSong,
    status: "active",
    deleted: false,
  });

  const singer = await Singer.findOne({
    _id: song.singerId,
    status: "active",
    deleted: false,
  }).select("fullName");

  const topic = await Topic.findOne({
    _id: song.topicId,
    status: "active",
    deleted: false,
  }).select("title");

  const favoriteSong = await FavoriteSong.findOne({ songId: song.id });
  song["isFavoriteSong"] = favoriteSong ? true : false;

  res.render("client/pages/songs/detail.pug", {
    pageTitle: "Chi tiết bài hát",
    song: song,
    topic: topic,
    singer: singer,
  });
};

// [PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  const idSong: String = req.params.idSong;
  const typeLike: String = req.params.typeLike;

  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false,
  });

  const newLike: Number = typeLike == "yes" ? song.like + 1 : song.like - 1;

  await Song.updateOne({ _id: idSong }, { like: newLike });

  res.json({
    code: 200,
    message: "Like thành công!",
    newLike: newLike,
  });
};

// [PATCH] /songs/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
  const idSong: String = req.params.idSong;
  const typeFavorite: String = req.params.typeFavorite;

  switch (typeFavorite) {
    case "yes":
      const existFavoriteSong = await FavoriteSong.findOne({ songId: idSong });
      if (!existFavoriteSong) {
        const record = new FavoriteSong({
          userId: "",
          songId: idSong,
        });
        await record.save();
      }
      break;
    case "no":
      await FavoriteSong.deleteOne({ songId: idSong });
      break;
    default:
      break;
  }

  res.json({
    code: 200,
    message: "Thành công",
  });
};
