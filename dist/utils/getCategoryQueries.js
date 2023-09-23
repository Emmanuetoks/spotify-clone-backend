import Category from "../models/categoryModel.js";
export const getCategoryQueries = (...searchQueries) => {
    return searchQueries.map((query) => Category.findOne({ id: query })
        .slice("playlists", [0, 7])
        .populate("playlists", { __v: 0, _id: 0 })
        .select("-__v -_id"));
};
//# sourceMappingURL=getCategoryQueries.js.map