import Breadcrumb from "@/app/components/Breadcrumb";
import { Rating, Button } from "@mui/material";
import React from "react";

type Props = {};
const sampleProduct = {
  _id: {
    $oid: "66216d8afc13ae5814a24174",
  },
  name: "Truffle Paste",
  description: "Artisanal handcrafted bread",
  price: 156,
  category: "661ee64d13f24656aac2aa42",
  images: [
    {
      url: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
    },
    {
      url: "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg",
    },
    {
      url: "https://cdn.dummyjson.com/product-images/8/thumbnail.jpg",
    },
    {
      url: "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg",
    },
  ],
  colors: [
    {
      name: "Red",
      code: "#FF0000",
    },
  ],
  sizes: ["M", "L", "XL"],
  stock: 100,
  sold: 50,
  rating: 5,
  reviews: [],
};
const product = (props: Props) => {
  return (
    <div className="px-8 py-8">
      <Breadcrumb />
      <div className="productBox grid grid-cols-2">
        <div className="imageGallery rounded-md">
          <img src={sampleProduct.images[0].url} alt="" />
        </div>
        <div className="introduction">
          <h2 className="title">{sampleProduct.name}</h2>
          <p className="rating">
            {" "}
            <Rating size="small" name="read-only" value={5} readOnly />
          </p>
          <p className="flex items-center gap-x-4">
            {" "}
            <span>
              <span>Brand : </span>
              <span>Samsung</span>
            </span>
            <span>
              <span>Category : </span>
              <span>Phone</span>
            </span>
          </p>
          <p>
            Price : ${sampleProduct.price} <del>$ 200</del>
          </p>
          <p>
            <p>Color</p>
            <p>
              {sampleProduct.colors.map((col, ind) => (
                <span
                  key={col.code}
                  style={{
                    backgroundColor: col.code,
                  }}
                  className="rounded-md p-2 text-white"
                >
                  {col.name}
                </span>
              ))}
            </p>
          </p>
          <p>
            <p>Size</p>
            <p className="flex items-center gap-x-4">
              {sampleProduct.sizes.map((size, ind) => (
                <span key={size} className="rounded-md p-2 bg-gray-300">
                  {size}
                </span>
              ))}
            </p>
          </p>
          <p>
            Quantity :{" "}
            <span className="flex items-center gap-x-4">
              <Button variant="text" color="primary">
                -
              </Button>
              <span>
                <input className="p-2 outline-none w-[50px]" type="number" />
              </span>
              <Button variant="text" color="primary">
                +
              </Button>
            </span>
          </p>
          <p className="flex items-center gap-x-4">
            <Button variant="contained" color="primary">
              Buy Now
            </Button>
            <Button variant="contained" color="primary">
              Add To Cart
            </Button>
          </p>
          <p>
            <span>Description : </span> <br />
            <span>{sampleProduct.description}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default product;
