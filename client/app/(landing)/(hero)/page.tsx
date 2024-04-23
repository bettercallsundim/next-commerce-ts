"use client";
import Card2 from "@/app/components/Card2";
import Carousel from "@/app/components/Carousel";
import MultiSlider from "@/app/components/MultiSlider";
import { Divider } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCircleDot } from "react-icons/fa6";
const categories = [
  "Women's & Girls' Fashion",
  "Health & Beauty",
  "Watches, Bags, Jewellery",
  "Men's & Boys' Fashion",
  "Mother & Baby",
  "Electronics Device",
  "TV & Home Appliances",
  "Electronic Accessories",
  "Groceries",
  "Home & Lifestyle",
  "Sports & Outdoors",
  "Automotive & Motorbike",
];
export default function Home() {
  const OPTIONS = {};
  const SLIDE_COUNT = 4;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  console.log("rendering home");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setProducts(res.data.products));
  }, []);

  return (
    <>
      {/* <div className="bg-black text-white mt-4 px-8 py-8 text-[30px] uppercase text-center">
        Eid Offer ! Every Item Will Get 10% Discount ! Claim Now !
      </div> */}
      <div className="flex items-center gap-4 pt-6 pb-20 px-8 bg-sky-100 rounded-lg">
        <div className="category w-[50%] shadow-md py-4 px-6 rounded-lg bg-slate-200/45">
          <div className="category__title">
            <h3>Category</h3>
          </div>
          <Divider className="my-2" />

          <div className="category__items flex flex-col ">
            {categories.map((category) => (
              <Link
                key={category}
                href="/"
                className="category__item text-slate-800 my-2 text-sm flex items-center gap-x-2 hover:underline"
              >
                <span>
                  <FaCircleDot className="text-primary text-xs -mb-[2px]" />
                </span>
                <span className="category__item__title ">{category}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-lg">
          <Carousel slides={SLIDES} options={OPTIONS} />
          <div className=" h-[200px] w-full rounded-md ">
            <p>
              <img
                className="w-full"
                src="https://gcp-img.slatic.net/lazada/5272e284-6842-4192-b2cb-5cd9dc8dcb21_BD-1188-120.jpg?spm=a2a0e.tm800168029.0.0"
                alt=""
              />
            </p>
            <p>
              <img
                className="w-full"
                src="https://gcp-img.slatic.net/lazada/c926cb07-ad33-423d-9cff-fd618538f9bf_BD-1188-80.png?spm=a2a0e.tm800168029.0.0"
                alt=""
              />
            </p>
          </div>
        </div>
      </div>
      <h1 className="flash">Flash Sale</h1>
      <div className="bg-secondary px-8 py-12 flex items-center justify-around ">
        <MultiSlider>
          {products.map((product, ind) => (
            <Card2 key={ind} product={product} />
          ))}
        </MultiSlider>
      </div>
      <h1>Just For You</h1>
      <div className="bg-secondary px-8 py-12 grid  grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((product, ind) => (
          <Card2 key={ind} product={product} />
        ))}
      </div>
    </>
  );
}
