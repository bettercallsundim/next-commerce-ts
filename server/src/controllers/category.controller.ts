import { NextFunction, Request, Response } from "express";
import categoryModel from "../models/Category.model";
import { cloudinaryUpload, deleteCloudinaryUpload } from "../utils/cloudinary";
import OhError from "../utils/errorHandler";
export const createCategoryWithMulter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  try {
    const oldCat = await categoryModel.findOne({ name: req.body.name });
    if (oldCat) {
      throw new OhError(400, "Category already exists");
    }
    if (req.file && req.file.path) {
      await cloudinaryUpload(req?.file?.path, "category").then(async (resp) => {
        if (resp.secure_url) {
          const { name, description } = req.body;
          const newCat = new categoryModel({
            name,
            description,
            icon: {
              url: resp.secure_url,
              public_id: resp.public_id,
            },
          });
          await newCat.save();
          res.status(200).json({
            message: "Category created successfully",
            data: newCat,
          });
        } else {
          throw new OhError(400, "Category creation error");
        }
      });
    } else {
      throw new OhError(400, "Category creation error");
    }
  } catch (error) {
    next(error);
  }
};
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  try {
    const oldCat = await categoryModel.findOne({ name: req.body.name });
    if (oldCat) {
      throw new OhError(400, "Category already exists");
    }

    const { name, description, secure_url, public_id } = req.body;
    const newCat = new categoryModel({
      name,
      description,
      icon: {
        url: secure_url,
        public_id: public_id,
      },
    });
    await newCat.save();
    res.status(200).json({
      message: "Category created successfully",
      data: newCat,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  await categoryModel
    .find()
    .then((data) => {
      res.status(200).json({
        success: true,
        data,
      });
    })
    .catch((err) => next(err));
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const findCat = await categoryModel.findById(req.body._id);
    if (findCat && findCat.icon && findCat.icon.public_id) {
      await deleteCloudinaryUpload(findCat.icon.public_id).then(async () => {
        await categoryModel.findByIdAndDelete(req.body._id);
        return res.status(200).json({
          success: true,
          message: "Category removed",
        });
      });
    } else {
      throw new OhError(400, "Opps, Category delete error, Not found");
    }
  } catch (error) {
    next(error);
  }
};
