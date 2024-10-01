import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";

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
