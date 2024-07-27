"use client";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

type Props = {};

const ColorPicker = ({ col, colors, setColors }) => {
  const [color, setColor] = useState(col.code);
  const [colorName, setColorName] = useState(col.name);
  useEffect(() => {
    colors.forEach((colorr, ind) => {
      if (colorr.id === col.id) {
        setColors((prev) => {
          let tempColors = [...prev];
          tempColors[ind] = {
            ...tempColors[ind],
            code: color,
            name: colorName,
          };
          return tempColors;
        });
      }
    });
  }, [color, colorName]);
  return (
    <div className="color-box relative flex items-center gap-2">
      <input
        type="color"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          setColorName("");
        }}
      />
      <input
        type="text"
        value={colorName}
        onChange={(e) => setColorName(e.target.value)}
        className=" rounded px-4 py-2 outline-gray-400 border-gray-300 border border-solid"
      />
      <button
        onClick={() => {
          setColors((prev) => {
            return prev.filter((color) => color.code != col.code);
          });
        }}
        className="px-4 py-2 rounded outline-gray-400 border-gray-300 border border-solid font-bold"
      >
        <MdDeleteOutline />
      </button>
    </div>
  );
};

export default ColorPicker;
