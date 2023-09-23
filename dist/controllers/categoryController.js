import Category from "../models/categoryModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
export const getCategory = catchAsync(async (req, res, next) => {
    const { categoryID } = req.params;
    const result = await Category.findOne({ id: categoryID }).populate('playlists');
    if (!result)
        return next(new AppError("Category does not exist", 400));
    res
        .status(200)
        .json(result);
});
//# sourceMappingURL=categoryController.js.map