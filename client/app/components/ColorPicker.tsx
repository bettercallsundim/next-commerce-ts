"use client";
import React, { useEffect, useState } from "react";

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
    <div className="color-box relative">
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <input
        type="text"
        value={colorName}
        onChange={(e) => setColorName(e.target.value)}
      />
      <button
        onClick={() => {
          setColors((prev) => {
            return prev.filter((color) => color.code != col.code);
          });
        }}
        className="absolute top-2 right-2"
      >
        x
      </button>
    </div>
  );
};

export default ColorPicker;
