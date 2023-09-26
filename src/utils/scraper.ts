import Category from "../models/categoryModel.js";
import PlayList from "../models/playListModel.js";
import fs from "fs/promises";
export const savePlaylists = async (filePaths: string[]) => {
  const rawFiles = await Promise.all(filePaths.map((el) => fs.readFile(el)));
  const chill = rawFiles
    .map((el) => {
      const parsed = JSON.parse(el.toString());

      return parsed.playlists.items;
    })
    .flat(2);
  return PlayList.create(chill);
};

export const saveCategories = async (filePaths: string[]) => {
  const rawFiles = await Promise.all(filePaths.map((el) => fs.readFile(el)));

  const cats = await Promise.all(
    rawFiles.map(async (el) => {
      const category = JSON.parse(el.toString());

      const randomId = crypto.randomUUID().replace(/-/gi, "");
      return {
        name: category.message,
        id: randomId,

        playlists: await Promise.all(
          category.playlists.items.map(async (el) => {
            return (await PlayList.findOne({ id: el.id }))._id;
          }),
        ),
      };
    }),
  );
  console.log(cats);

  return Category.insertMany(cats);
};
