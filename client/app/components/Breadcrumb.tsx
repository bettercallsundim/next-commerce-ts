"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import Link from "next/link";
import * as React from "react";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Breadcrumb({ categories }) {
  return (
    <div className="py-4 mb-4" role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {categories?.map((cat) => (
          <Link key={cat._id} href={`/category/${cat._id}`}>
            <StyledBreadcrumb
              component="button"
              label={cat.name}
              icon={<HomeIcon fontSize="small" />}
            />
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
