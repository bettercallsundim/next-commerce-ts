"use client";
"use client";
import Breadcrumb from "@/app/components/Breadcrumb";
import { Button, Rating } from "@mui/material";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

type Props = {};
const sampleProduct = {
  _id: {
    $oid: "66216d8afc13ae5814a24174",
  },
  name: "Truffle Paste",
  description:
    "Truffle Paste is a is a delicious and healthy food is a delicious and healthy food is a delicious and healthy food  is a delicious and healthy food is a delicious and healthy food is a delicious and healthy food is a delicious and healthy food is a delicious and healthy food is a delicious and healthy food is a delicious and healthy food delicious and healthy food. ",
  price: 156,
  category: "Electronics",
  images: [
    {
      url: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      public_id: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
    },
    {
      url: "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg",
      public_id: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
    },
    {
      url: "https://cdn.dummyjson.com/product-images/8/thumbnail.jpg",
      public_id: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
    },
    {
      url: "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg",
      public_id: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
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
  ],
  sizes: ["M", "L", "XL"],
  stock: 100,
  sold: 50,
  rating: 5,
  reviews: [],
};
const Product = ({ product }) => {
  return (
    <div className="px-8 py-8">
      <Breadcrumb categories={product.categories} />
      <div className="productBox grid grid-cols-1 md:grid-cols-2">
        <div className="imageGallery sticky  rounded-md">
          <ImageGallery
            items={product.images.map((img) => ({
              original: img.url,
              thumbnail: img.url,
            }))}
            showNav={false}
            showFullscreenButton={false}
            showPlayButton={false}
            renderLeftNav={(onClick, disabled) => (
              <button
                className="image-gallery-icon image-gallery-left-nav text-5xl"
                disabled={disabled}
                onClick={onClick}
              >
                <FaArrowLeft />
              </button>
            )}
            renderRightNav={(onClick, disabled) => (
              <button
                className="image-gallery-icon image-gallery-right-nav text-5xl"
                disabled={disabled}
                onClick={onClick}
              >
                <FaArrowRight />
              </button>
            )}
          />
          ;
        </div>
        <div className="introduction">
          <h2 className="title">{product.name}</h2>
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
            Price : <b>${product.price}</b> <del>$ 200</del>
          </p>
          <p>
            <p>Color</p>
            <p className="flex items-center  gap-x-2 flex-wrap">
              {product.colors.map((col, ind) => (
                <span
                  key={col.code}
                  style={{
                    backgroundColor: col.code,
                  }}
                  className="rounded-full py-1 px-2 text-white"
                >
                  {col.name}
                </span>
              ))}
            </p>
          </p>
          <p>
            <p>Size</p>
            <p className="flex items-center gap-x-2 text-sm flex-wrap">
              {product.sizes.map((size, ind) => (
                <span key={size} className="rounded-full py-1 px-4 bg-gray-300">
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
            <span>{product.description}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
