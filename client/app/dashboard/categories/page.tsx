"use client";
import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";
import { Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

import React, { useEffect, useState } from "react";
type Props = {};

const Categories = (props: Props) => {
  const [category, setCategory] = useState<any>({
    name: "",
    description: "",
    icon: null,
  });
  const { data, loading, error } = useAxiosGet("/category/all");
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
    console.log(ok, "ok");
  }, [ok]);
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
  console.log(data);
  return (
    <Box px={4}>
      <section>
        <h1>All Categories</h1>
        <div>
          {data &&
            data.data.map((cat: any) => (
              <div
                key={cat._id}
                // display="flex"
                // justifyContent="space-between"
              >
                <p>
                  <img src={cat?.icon?.url} alt="" />
                </p>
                <p className="font-bold">{cat.name}</p>
                <p>{cat.description}</p>
              </div>
            ))}
        </div>
      </section>
      <section>
        <h1>Create Categories</h1>
        <div>
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
          <Button
            onClick={async () => {
              console.log(category);
              if (category.name && category.description && category.icon) {
                const formData = new FormData();
                formData.append("file", category.icon);
                formData.append("api_key", ok?.apiKey);
                console.log(ok?.apiKey, "ok?.apiKey");
                formData.append("timestamp", ok?.timestamp);
                formData.append("signature", ok?.signature);
                formData.append("folder", "signed_upload_demo_form");
                const url =
                  "https://api.cloudinary.com/v1_1/" +
                  ok?.cloudname +
                  "/auto/upload";
                const imgData = await axios.post(url, formData).then((res) => {
                  return res.data;
                });

                if (imgData?.secure_url && imgData?.public_id) {
                  const data = {
                    name: category.name,
                    description: category.description,
                    icon: {
                      url: imgData.secure_url,
                      public_id: imgData.public_id,
                    },
                  };
                  postAxios(data);
                }
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
