import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import productModel from "../models/Product.model";

function generateProducts() {
  let productsData = [];
  for (let i = 0; i < 100; i++) {
    let product = {
      // _id: {
      //   $oid: faker.database.mongodbObjectId(),
      // },
      name: faker.commerce.productName(),
      description: new mongoose.Types.ObjectId("663f4832c0ee32fe0a18f0d0"),
      price: faker.number.int({ min: 100, max: 10000 }),
      category: faker.database.mongodbObjectId(),
      images: [
        {
          url: "https://source.unsplash.com/random?fruits",
          public_id: "https://source.unsplash.com/random?fruits",
        },
        {
          url: "https://source.unsplash.com/random?fruits",
          public_id: "https://source.unsplash.com/random?fruits",
        },
        {
          url: "https://source.unsplash.com/random?fruits",
          public_id: "https://source.unsplash.com/random?fruits",
        },
        {
          url: "https://source.unsplash.com/random?fruits",
          public_id: "https://source.unsplash.com/random?fruits",
        },
      ],
      colors: [
        {
          name: "Red",
          code: "#FF0000",
        },
        {
          name: "Blue",
          code: "skyblue",
        },
        {
          name: "Pink",
          code: "Pink",
        },
      ],
      sizes: ["M", "L", "XL"],
      stock: faker.number.int({ min: 1, max: 1000 }),
      sold: faker.number.int({ min: 11, max: 1000 }),
      rating: faker.number.int({ min: 0, max: 5 }),
      reviews: [],
    };
    productsData.push(product);
  }
  return productsData;
}

export let products: any = generateProducts();

export async function insertProducts() {
  await productModel.insertMany(products);
}
