import { MenuItem } from "@mui/material";
import React from "react";

type Props = {};
const generateString = (length, char) =>
  Array.from({ length }, () => char).join("");

const CategoryOption = ({ cat, depth, setState }: any) => {
  return (
    <>
      <option
        data-cat={JSON.stringify(cat)}
        value={cat.name}
        className="inline-block pl-2 ml-2"
      >
        <span className="pl-2 ml-2 inline-block">
          {generateString(depth * 2, "-")}
          {cat.name}
        </span>
      </option>
      {cat?.childrens?.length &&
        cat.childrens.map((child: any) => (
          <CategoryOption key={child._id} cat={child} depth={depth + 1} />
        ))}
    </>
  );
};

export default CategoryOption;
