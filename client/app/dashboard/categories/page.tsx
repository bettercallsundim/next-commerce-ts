"use client";
import Category from "@/app/components/Category";
import CloudinaryUploadButton from "@/app/components/CloudinaryUploadButton";
import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

import React, { useEffect, useState } from "react";
type Props = {};

const Categories = (props: Props) => {
  const [category, setCategory] = useState<any>({
    name: "",
    description: "",
    icon: null,
    parent: "",
  });
  const [categories, setCategories] = useState<any>([]);

  const { data, loading, error } = useAxiosGet("/category/all");
  const { data: categoryTree } = useAxiosGet("/category/all/tree");
  const {
    data: postData,
    postAxios,
    error: postError,
  } = useAxiosPost("/category/create");
  const [ok, setOk] = useState<any>({});
  const signForm = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/cloudinary-auth`)
      .then((res) => {
        setOk(res.data);
      });
  };

  useEffect(() => {
    signForm();
  }, []);
  useEffect(() => {
    let tempCats = [];
    if (data?.data?.length > 0) {
      data?.data?.forEach((cat) => {
        tempCats.push(cat);
        cat.subcats.forEach((sub) => {
          tempCats.push(sub);
        });
      });
      setCategories([...tempCats]);
    }
  }, [data]);
  useEffect(() => {
    console.log("🚀 ~ Categories ~ categories:", categories);
    console.log("🚀 ~ Categories ~ tree:", categoryTree);
  }, [categories, categoryTree]);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <Box px={4}>
      <section>
        <h1>All Categories</h1>
        <div>
          {categoryTree?.categories?.length &&
            categoryTree.categories.map((cat: any) => (
              <Category key={cat._id} cat={cat} />
            ))}
        </div>
      </section>
      <section>
        <h1>Create Categories</h1>
        <div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category.parent}
            label="Parent"
            onChange={(e) => {
              setCategory({
                ...category,
                parent: e.target.value,
              });
            }}
          >
            {data?.data?.map((cat: any) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            id="outlined-controlled"
            name="name"
            value={category.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCategory({
                ...category,
                name: event.target.value,
              });
            }}
          />
          <TextField
            id="outlined-controlled"
            name="description"
            value={category.description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCategory({
                ...category,
                description: event.target.value,
              });
            }}
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            // startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              name="icon"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCategory({
                  ...category,
                  icon: event.target.files[0] as any,
                });
              }}
              type="file"
            />
          </Button>
          <CloudinaryUploadButton
            cb={(data) => {
              setCategory((prev: any) => {
                return {
                  ...prev,
                  icon: {
                    url: data.secure_url,
                    public_id: data.public_id,
                  },
                };
              });
            }}
          />
          <Button
            onClick={async () => {
              console.log(category);
              if (category.name && category.description && category.icon.url) {

                postAxios(category);
                setCategory({
                  name: "",
                  description: "",
                  icon: null,
                  parent: "",
                });
              }
            }}
          >
            Create Category
          </Button>
        </div>
      </section>
    </Box>
  );
};

export default Categories;
