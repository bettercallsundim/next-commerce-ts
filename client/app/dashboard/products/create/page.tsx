"use client";
import CategoryOption from "@/app/components/CategoryOption";
import { IoMdAdd } from "react-icons/io";

import CloudinaryUploadButton from "@/app/components/CloudinaryUploadButton";
import ColorPicker from "@/app/components/ColorPicker";
import Container from "@/app/components/Container";
import { InputMUI } from "@/app/components/InputMUI";
import { useCreateProduct, useGetCategoriesTree } from "@/hooks/queries";
import { InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {};
const sizesSample = ["XS", "S", "M", "L", "XL", "XXL"];
const CreateProduct = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const { data: categoryTree, error: categoryError } = useGetCategoriesTree();

  const [sizes, setSizes] = useState({
    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState({});
  const [pictures, setPictures] = useState([]);
  const [colors, setColors] = useState([]);
  const { createProduct, error: createProductError } = useCreateProduct();

  const onSubmit = ({ name, description, price, stock, sold }, event) => {
    event.preventDefault();

    if (
      name &&
      description &&
      price &&
      selectedCategory?._id &&
      stock &&
      pictures.length
    ) {
      createProduct({
        name,
        description,
        price,
        category: selectedCategory?._id,
        stock,
        colors: colors.map((color) => ({ name: color.name, code: color.code })),
        sizes: Object.keys(sizes).filter((size) => sizes[size] != 0),
        pictures,
      });
      reset({ name: "", description: "", price: 0, stock: 0, sold: 0 });
      setColors([]);
      setPictures([]);
    } else {
      // console.log({
      //   name,
      //   description,
      //   price,
      //   stock,
      //   category: selectedCategory?._id,
      // });
    }
  };
  console.log(createProductError, "createProductError");

  return (
    <Container>
      <div className="w-[65%]">
        {" "}
        <div>
          <h1>Add Product</h1>
        </div>
        <div>
          <form
            className="flex flex-col gap-4 space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <input
              type="text"
              placeholder="name"
              {...register("name", { required: true })}
            /> */}
            <InputMUI name={"name"} control={control} label={"Name"} />
            {/* <textarea
              placeholder="description"
              {...register("description", {})}
            /> */}
            <InputMUI
              name={"description"}
              control={control}
              label={"Description"}
              rows={4}
            />

            {/* <input
              type="number"
              placeholder="price"
              {...register("price", { required: true })}
            /> */}
            <InputMUI
              name={"price"}
              control={control}
              label={"Price"}
              type="number"
            />

            <div>
              <label className="mb-4">Sizes :</label>
              <div className="flex items-center gap-2 mt-4">
                {sizesSample.map((size) => (
                  <button
                    onClick={() => {
                      setSizes((prev) => {
                        let temp = { ...prev };
                        temp[size] = !temp[size];
                        return temp;
                      });
                    }}
                    className={`cursor-pointer outline-none border-none rounded-md px-4 py-2 ${
                      sizes[size] ? "bg-sky-400" : "bg-slate-200"
                    }`}
                    key={size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label> Colors : </label>
              <div className="mt-4">
                <div className="space-y-4">
                  {colors?.map((col, ind) => (
                    <ColorPicker
                      key={ind}
                      col={col}
                      colors={colors}
                      setColors={setColors}
                    />
                  ))}
                </div>
                <div className=" mt-4">
                  <button
                    className="bg-slate-200 rounded-md px-4 py-2 cursor-pointer outline-none border-none"
                    onClick={() => {
                      setColors((prev) => {
                        return [
                          ...prev,
                          {
                            id: prev.length + 1,
                            name: "Black",
                            code: "#000",
                          },
                        ];
                      });
                    }}
                  >
                    <IoMdAdd />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label>Category : </label>
              <p>
                <select
                  value={selectedCategory?.name}
                  onChange={(e) => {
                    const selectedCatJson =
                      e.target.options[e.target.selectedIndex].getAttribute(
                        "data-cat"
                      );
                    setSelectedCategory(JSON.parse(selectedCatJson));
                  }}
                >
                  {categoryTree?.categories?.length &&
                    categoryTree.categories.map((cat: any) => (
                      <CategoryOption key={cat._id} cat={cat} depth={0} />
                    ))}
                </select>
              </p>
            </div>
            {/* <input
              type="number"
              placeholder="stock"
              {...register("stock", {})}
            /> */}
            <InputMUI
              name={"stock"}
              control={control}
              label={"Stock"}
              type="number"
            />
            {/* <input type="number" placeholder="sold" {...register("sold", {})} /> */}
            <InputMUI
              name={"sold"}
              control={control}
              label={"Sold"}
              type="number"
            />
            <div>
              <label className="">Pictures : </label>
              <div className="flex items-center gap-2 flex-wrap mt-4">
                {pictures.map((img) => (
                  <div className="relative" key={img.url}>
                    <img src={img.url} />
                    <button
                      onClick={() => {
                        setPictures((prev) => {
                          return prev.filter((pic) => pic.url != img.url);
                        });
                      }}
                      className="absolute top-2 right-2"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <CloudinaryUploadButton
                cb={(data) => {
                  setPictures((prev: any) => {
                    return [
                      ...prev,
                      {
                        url: data.secure_url,
                        public_id: data.public_id,
                      },
                    ];
                  });
                }}
              />
            </div>
            <input
              className="bg-violet-400 text-white rounded-md px-4 py-2 cursor-pointer outline-none border-none"
              type="submit"
            />
          </form>
        </div>
      </div>
      <div className="w-[35%]"></div>
    </Container>
  );
};

export default CreateProduct;
