"use client";
import DottedButton from "./DottedButton";

const Card = () => {
  return (
    <div className="relative h-[23rem] w-72 rounded-xl bg-sky-100">
      <div className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg p-6">
        <div className="px-8 py-4">
          <img
            className="w-full h-full object-cover"
            src="https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08454578.png"
            alt=""
          />
        </div>
        <div>
          <p className="font-bold">HP Notebook E231</p>
          <p>Price : $231</p>
          <p>
            <DottedButton text="Buy Now" size="small" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
