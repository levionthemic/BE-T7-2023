import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";

// [GET] /search/result
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;

  let newSongs = [];

  if (keyword) {
    const regex = new RegExp(keyword, "i");

    // Tạo ra slug không dấu có thêm dấu trừ ngăn cách
    const stringSlug = convertToSlug(keyword);
    const stringSlugRegex = new RegExp(stringSlug, "i");

    const songs = await Song.find({
      $or: [{ title: regex }, { slug: stringSlugRegex }],
      status: "active",
      deleted: false,
    });
    for (const song of songs) {
      const singer = await Singer.findOne({ _id: song.singerId });
      song["singer"] = singer;
    }
    newSongs = songs;
  }

  res.render("client/pages/search/result.pug", {
    pageTitle: `Kết quả tìm kiếm: ${keyword}`,
    keyword: keyword,
    songs: newSongs,
  });
};
