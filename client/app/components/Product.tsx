"use client";
"use client";
import Breadcrumb from "@/app/components/Breadcrumb";
import { successToast } from "@/helpers/toaster";
import { useThrottle } from "@/hooks/debounce";
import useZustand from "@/hooks/useZustand";
import { Button, Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Product = ({ product }) => {
  console.log("🚀 ~ Product ~ product:", product);
  let prodCat = product?.categories[product.categories.length - 1].name;
  console.log("🚀 ~ Product ~ prodCat:", prodCat);
  const router = useRouter();
  const { cartItems, addToCart, decreaseFromCart } = useZustand();
  function handleAddToCart(product) {
    addToCart(product);
    successToast("Product Added to Cart");
  }
  function handleDecreaseFromCart(product) {
    decreaseFromCart(product);
    successToast("Product Removed from Cart");
  }
  const throttledAddToCart = useThrottle(handleAddToCart, 3000);
  const throttledDecreaseFromCart = useThrottle(handleDecreaseFromCart, 3000);

  return (
    <div className="container mx-auto px-8 py-8">
      <Breadcrumb categories={product.categories} />
      <div className="productBox grid grid-cols-1 md:grid-cols-2">
        <div className="imageGallery sticky  rounded-md ">
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
        <div className="introduction space-y-6 shadow-lg rounded-lg p-8">
          <h2 className="title">{product.name}</h2>
          <div className="rating">
            {" "}
            <Rating size="small" name="read-only" value={5} readOnly />
          </div>
          <div className="flex items-center gap-x-4">
            {" "}
            <span>
              <span className="font-semibold">Brand : </span>
              <span>Samsung</span>
            </span>
            <span>
              <span className="font-semibold">Category : </span>
              <span>{prodCat}</span>
            </span>
          </div>
          <p>
            <span className="font-semibold">Price :</span>{" "}
            <span>${product.price}</span> <del>$ 200</del>
          </p>
          <div>
            <p className="font-semibold">Colors</p>
            <p className="flex items-center  gap-x-2 flex-wrap">
              {product.colors.map((col, ind) => (
                <span
                  key={col.code}
                  style={{
                    backgroundColor: col.code,
                  }}
                  className="rounded-full py-1 px-4 text-white text-sm"
                >
                  {col.name}
                </span>
              ))}
            </p>
          </div>
          <div>
            <p className="font-semibold">Size</p>
            <p className="flex items-center gap-x-2 text-sm flex-wrap">
              {product.sizes.map((size, ind) => (
                <span key={size} className="rounded-full py-1 px-4 bg-gray-300">
                  {size}
                </span>
              ))}
            </p>
          </div>
          <p>
            <span className="font-semibold">Quantity :</span>
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
            <Button
              onClick={() => router.push("/buy-now?product=" + product._id)}
              variant="contained"
              color="primary"
            >
              Buy Now
            </Button>
            <Button
              onClick={() => {
                throttledAddToCart(product);
              }}
              variant="contained"
              color="primary"
            >
              Add To Cart
            </Button>
          </p>
          <p>
            <span className="font-semibold">Description : </span> <br />
            <span>{product.description}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
