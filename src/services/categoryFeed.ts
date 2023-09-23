import res from "express/lib/response.js";
import Category from "../models/categoryModel.js";

export const getCategoryQueries = (...searchQueries: string[]) => {
  return searchQueries.map((query) => {
    return Category.findOne({ id: query })
      .slice("playlists", [0, 6])
      .populate("playlists", { _id: 0, __v: 0 });
    // const real = { ...res, items: res.playlists };
    // delete real.playlists;

    // return real;
  });
};
